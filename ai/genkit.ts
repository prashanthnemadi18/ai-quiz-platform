/**
 * AI Module with support for Gemini, OpenAI, and Claude
 * Provides real-time question generation using multiple AI providers
 */

import type { GoogleGenerativeAI } from '@google/generative-ai';
import type OpenAI from 'openai';
import type Anthropic from '@anthropic-ai/sdk';

// AI Provider Types
export type AIProvider = 'gemini' | 'openai' | 'claude';

// Load environment variables (lazy evaluation)
function getEnvVar(key: string, defaultValue: string = ''): string {
  // Check both process.env and Next.js env
  return process.env[key] || process.env[`NEXT_PUBLIC_${key}`] || defaultValue;
}

// Configuration (lazy getter to ensure env vars are loaded)
function getAIConfig() {
  return {
    provider: (getEnvVar('AI_PROVIDER', 'gemini')) as AIProvider,
    gemini: {
      apiKey: getEnvVar('GEMINI_API_KEY'),
      model: getEnvVar('GEMINI_MODEL', 'gemini-2.5-flash'),
    },
    openai: {
      apiKey: getEnvVar('OPENAI_API_KEY'),
      model: getEnvVar('OPENAI_MODEL', 'gpt-4o-mini'),
    },
    claude: {
      apiKey: getEnvVar('CLAUDE_API_KEY'),
      model: getEnvVar('CLAUDE_MODEL', 'claude-3-5-sonnet-20241022'),
    },
  };
}

// Backward compatibility
const AI_CONFIG = getAIConfig();

// Initialize AI clients
let geminiClient: GoogleGenerativeAI | null = null;
let openaiClient: OpenAI | null = null;
let claudeClient: Anthropic | null = null;

async function getGeminiClient() {
  const config = getAIConfig();
  if (!geminiClient && config.gemini.apiKey) {
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    geminiClient = new GoogleGenerativeAI(config.gemini.apiKey);
  }
  return geminiClient;
}

async function getOpenAIClient() {
  const config = getAIConfig();
  if (!openaiClient && config.openai.apiKey) {
    const OpenAI = (await import('openai')).default;
    openaiClient = new OpenAI({ apiKey: config.openai.apiKey });
  }
  return openaiClient;
}

async function getClaudeClient() {
  const config = getAIConfig();
  if (!claudeClient && config.claude.apiKey) {
    const Anthropic = (await import('@anthropic-ai/sdk')).default;
    claudeClient = new Anthropic({ apiKey: config.claude.apiKey });
  }
  return claudeClient;
}

// AI Generation Functions
async function generateWithGemini(prompt: string): Promise<string> {
  const config = getAIConfig();
  
  if (!config.gemini.apiKey) {
    throw new Error('Gemini API key not configured. Please set GEMINI_API_KEY in .env.local');
  }

  // Use v1beta API with correct model name format
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${config.gemini.model}:generateContent?key=${config.gemini.apiKey}`;
  
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: prompt
        }]
      }]
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Gemini API error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

async function generateWithOpenAI(prompt: string): Promise<string> {
  const config = getAIConfig();
  
  if (!config.openai.apiKey) {
    throw new Error('OpenAI API key not configured. Please set OPENAI_API_KEY in .env.local');
  }

  const client = await getOpenAIClient();
  if (!client) throw new Error('Failed to initialize OpenAI client');

  const completion = await client.chat.completions.create({
    model: config.openai.model,
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });

  return completion.choices[0]?.message?.content || '';
}

async function generateWithClaude(prompt: string): Promise<string> {
  const config = getAIConfig();
  
  if (!config.claude.apiKey) {
    throw new Error('Claude API key not configured. Please set CLAUDE_API_KEY in .env.local');
  }

  const client = await getClaudeClient();
  if (!client) throw new Error('Failed to initialize Claude client');

  const message = await client.messages.create({
    model: config.claude.model,
    max_tokens: 4096,
    messages: [{ role: 'user', content: prompt }],
  });

  const content = message.content[0];
  return content.type === 'text' ? content.text : '';
}

// Main AI generation function
export async function generateAIContent(prompt: string, provider?: AIProvider): Promise<string> {
  const config = getAIConfig();
  const selectedProvider = provider || config.provider;

  try {
    switch (selectedProvider) {
      case 'gemini':
        return await generateWithGemini(prompt);
      case 'openai':
        return await generateWithOpenAI(prompt);
      case 'claude':
        return await generateWithClaude(prompt);
      default:
        throw new Error(`Unknown AI provider: ${selectedProvider}`);
    }
  } catch (error) {
    console.error(`Error generating content with ${selectedProvider}:`, error);
    throw error;
  }
}

// Vision support for image analysis
export async function analyzeImage(imageData: string, prompt: string, provider?: AIProvider): Promise<string> {
  const config = getAIConfig();
  const selectedProvider = provider || config.provider;

  try {
    switch (selectedProvider) {
      case 'gemini': {
        const config = getAIConfig();
        if (!config.gemini.apiKey) throw new Error('Gemini API key not configured');
        
        // Extract base64 data and mime type
        const matches = imageData.match(/^data:([^;]+);base64,(.+)$/);
        if (!matches) throw new Error('Invalid image data URI format');
        
        const [, mimeType, base64Data] = matches;
        
        // Use v1beta API for vision
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${config.gemini.model}-vision:generateContent?key=${config.gemini.apiKey}`;
        
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [
                { text: prompt },
                {
                  inline_data: {
                    mime_type: mimeType,
                    data: base64Data
                  }
                }
              ]
            }]
          })
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      }

      case 'openai': {
        const client = await getOpenAIClient();
        if (!client) throw new Error('OpenAI API key not configured');

        const completion = await client.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'user',
              content: [
                { type: 'text', text: prompt },
                { type: 'image_url', image_url: { url: imageData } },
              ],
            },
          ],
        });

        return completion.choices[0]?.message?.content || '';
      }

      case 'claude': {
        const client = await getClaudeClient();
        if (!client) throw new Error('Claude API key not configured');

        // Extract base64 data and mime type
        const matches = imageData.match(/^data:([^;]+);base64,(.+)$/);
        if (!matches) throw new Error('Invalid image data URI format');
        
        const [, mimeType, base64Data] = matches;

        const message = await client.messages.create({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 4096,
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'image',
                  source: {
                    type: 'base64',
                    media_type: mimeType as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp',
                    data: base64Data,
                  },
                },
                {
                  type: 'text',
                  text: prompt,
                },
              ],
            },
          ],
        });

        const content = message.content[0];
        return content.type === 'text' ? content.text : '';
      }

      default:
        throw new Error(`Unknown AI provider: ${selectedProvider}`);
    }
  } catch (error) {
    console.error(`Error analyzing image with ${selectedProvider}:`, error);
    throw error;
  }
}

// Legacy compatibility layer
export const ai = {
  definePrompt: ({ name, input, output, prompt }: any) => {
    return async (values: any) => {
      try {
        // Build prompt from template
        let finalPrompt = prompt;
        for (const [key, value] of Object.entries(values)) {
          const regex = new RegExp(`\\{\\{\\{${key}\\}\\}\\}|\\{\\{${key}\\}\\}`, 'g');
          finalPrompt = finalPrompt.replace(regex, String(value));
        }

        // Generate content
        const result = await generateAIContent(finalPrompt);
        
        // Parse JSON response if possible
        try {
          const jsonMatch = result.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            return { output: parsed };
          }
        } catch (e) {
          // Not JSON, return as text
        }

        return { output: { result } };
      } catch (error) {
        console.error('Error in definePrompt:', error);
        throw error;
      }
    };
  },

  defineFlow: (_opts: any, fn: (input: any) => Promise<any>) => {
    return async (input: any) => {
      return fn(input);
    };
  },
};

export { AI_CONFIG };
