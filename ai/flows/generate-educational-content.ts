'use server';

/**
 * @fileOverview AI-powered educational content generation flow with real AI providers.
 *
 * This file defines a flow that generates educational questions using Gemini, OpenAI, or Claude.
 * It exports:
 *   - generateEducationalContent: The main function to trigger the content generation.
 *   - GenerateEducationalContentInput: The input type for the content generation.
 *   - GenerateEducationalContentOutput: The output type for the content generation.
 */

import { generateAIContent } from '@/ai/genkit';
import { z } from 'zod';

const GenerateEducationalContentInputSchema = z.object({
  topic: z.string().describe('The topic for which to generate educational questions.'),
  questionCount: z.number().default(5).describe('The number of questions to generate.'),
  types: z
    .array(z.enum(['mcq', 'tf', 'short']))
    .optional()
    .describe('Optional list of question types to include.'),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional().describe('Difficulty level of questions.'),
});
export type GenerateEducationalContentInput = z.infer<
  typeof GenerateEducationalContentInputSchema
>;

const QuestionSchema = z.object({
  type: z.enum(['mcq', 'tf', 'short']),
  question: z.string(),
  choices: z.array(z.string()).optional(),
  answer: z.string().optional(),
  explanation: z.string().optional(),
});

const GenerateEducationalContentOutputSchema = z.object({
  questions: z
    .array(QuestionSchema)
    .describe('An array of structured educational questions related to the specified topic.'),
});
export type GenerateEducationalContentOutput = z.infer<
  typeof GenerateEducationalContentOutputSchema
>;

export async function generateEducationalContent(
  input: GenerateEducationalContentInput
): Promise<GenerateEducationalContentOutput> {
  const topic = input.topic.trim();
  const count = Math.max(1, input.questionCount || 5);
  const types: Array<'mcq' | 'tf' | 'short'> = input.types && input.types.length > 0 ? input.types : ['mcq', 'tf', 'short'];
  const difficulty = input.difficulty || 'medium';

  // Build the AI prompt
  const prompt = `You are an expert educational content creator. Generate ${count} high-quality educational questions about "${topic}".

Requirements:
- Difficulty level: ${difficulty}
- Question types to include: ${types.join(', ')}
- Distribute questions evenly across the specified types
- For MCQ (multiple choice): provide 4 options with one correct answer
- For TF (true/false): provide a statement and the correct answer
- For Short Answer: provide an open-ended question

Return ONLY a valid JSON object in this exact format (no markdown, no code blocks):
{
  "questions": [
    {
      "type": "mcq",
      "question": "Question text here?",
      "choices": ["Option A", "Option B", "Option C", "Option D"],
      "answer": "Option A",
      "explanation": "Brief explanation of why this is correct"
    },
    {
      "type": "tf",
      "question": "Statement to evaluate",
      "choices": ["True", "False"],
      "answer": "True",
      "explanation": "Brief explanation"
    },
    {
      "type": "short",
      "question": "Open-ended question?",
      "explanation": "Sample answer or key points to include"
    }
  ]
}

Generate exactly ${count} questions now:`;

  try {
    // Generate content using AI
    const response = await generateAIContent(prompt);
    
    // Parse the JSON response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to extract JSON from AI response');
    }

    const parsed = JSON.parse(jsonMatch[0]);
    
    // Validate the response structure
    if (!parsed.questions || !Array.isArray(parsed.questions)) {
      throw new Error('Invalid response structure from AI');
    }

    // Ensure we have the right number of questions
    const questions = parsed.questions.slice(0, count);

    return { questions };
  } catch (error) {
    console.error('Error generating educational content:', error);
    
    // Fallback to basic questions if AI fails
    return generateFallbackQuestions(topic, count, types);
  }
}

// Fallback function for when AI is unavailable
function generateFallbackQuestions(
  topic: string,
  count: number,
  types: Array<'mcq' | 'tf' | 'short'>
): GenerateEducationalContentOutput {
  const questions: GenerateEducationalContentOutput['questions'] = [];

  for (let i = 0; i < count; i++) {
    const type = types[i % types.length];

    if (type === 'mcq') {
      questions.push({
        type: 'mcq',
        question: `Which of the following best describes ${topic}?`,
        choices: [
          `A fundamental concept in ${topic}`,
          `An unrelated concept`,
          `A common misconception`,
          `A historical reference`,
        ],
        answer: `A fundamental concept in ${topic}`,
        explanation: `This is a basic question about ${topic}.`,
      });
    } else if (type === 'tf') {
      questions.push({
        type: 'tf',
        question: `${topic} is an important concept in its field.`,
        choices: ['True', 'False'],
        answer: 'True',
        explanation: `${topic} is indeed significant in its domain.`,
      });
    } else {
      questions.push({
        type: 'short',
        question: `Explain ${topic} in your own words.`,
        explanation: `Students should demonstrate understanding of ${topic}.`,
      });
    }
  }

  return { questions };
}
