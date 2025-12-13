# AI Module - Real-Time Question Generator

This AI module provides real-time question generation using multiple AI providers: **Gemini**, **OpenAI**, and **Claude**.

## Features

- **Multi-Provider Support**: Switch between Gemini, OpenAI, and Claude
- **Real-Time Question Generation**: Generate educational content on any topic
- **Vision Support**: Analyze images for gesture recognition
- **Personalized Recommendations**: AI-powered learning suggestions
- **Automatic Fallback**: Graceful degradation if AI is unavailable

## Setup

### 1. Install Dependencies

```bash
cd src
npm install
```

This will install:
- `@google/generative-ai` - Google Gemini API
- `openai` - OpenAI API
- `@anthropic-ai/sdk` - Claude API
- `dotenv` - Environment variable management

### 2. Configure Environment Variables

Create a `.env.local` file in the `src` directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API keys:

```env
# Choose your preferred AI provider
AI_PROVIDER=gemini

# Gemini Configuration (Get key from: https://makersuite.google.com/app/apikey)
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-1.5-flash

# OpenAI Configuration (Get key from: https://platform.openai.com/api-keys)
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o-mini

# Claude Configuration (Get key from: https://console.anthropic.com/)
CLAUDE_API_KEY=your_claude_api_key_here
CLAUDE_MODEL=claude-3-5-sonnet-20241022
```

### 3. Get API Keys

#### Gemini (Recommended - Free tier available)
1. Visit https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key to your `.env.local`

#### OpenAI
1. Visit https://platform.openai.com/api-keys
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the key to your `.env.local`

#### Claude
1. Visit https://console.anthropic.com/
2. Sign in or create an account
3. Navigate to API Keys
4. Create a new key
5. Copy the key to your `.env.local`

## Usage

### Generate Educational Content

```typescript
import { generateEducationalContent } from '@/ai/flows/generate-educational-content';

const result = await generateEducationalContent({
  topic: 'Photosynthesis',
  questionCount: 5,
  types: ['mcq', 'tf', 'short'],
  difficulty: 'medium'
});

console.log(result.questions);
```

### Interpret User Gestures

```typescript
import { interpretUserGestures } from '@/ai/flows/interpret-user-gestures';

const result = await interpretUserGestures({
  photoDataUri: 'data:image/jpeg;base64,...'
});

console.log(result.gesture, result.confidence);
```

### Get Personalized Recommendations

```typescript
import { providePersonalizedRecommendations } from '@/ai/flows/provide-personalized-recommendations';

const result = await providePersonalizedRecommendations({
  studentId: 'student123',
  learningProgress: 'Completed 5 modules, struggling with advanced topics',
  preferences: 'Visual learning, short videos, interactive quizzes'
});

console.log(result.recommendations);
```

## Switching AI Providers

Change the `AI_PROVIDER` in your `.env.local`:

```env
AI_PROVIDER=gemini   # Use Google Gemini
AI_PROVIDER=openai   # Use OpenAI
AI_PROVIDER=claude   # Use Claude
```

You can also specify the provider programmatically:

```typescript
import { generateAIContent } from '@/ai/genkit';

const response = await generateAIContent('Your prompt here', 'openai');
```

## API Reference

### `generateAIContent(prompt: string, provider?: AIProvider): Promise<string>`

Generate text content using the specified AI provider.

### `analyzeImage(imageData: string, prompt: string, provider?: AIProvider): Promise<string>`

Analyze an image using AI vision capabilities.

### `generateEducationalContent(input: GenerateEducationalContentInput): Promise<GenerateEducationalContentOutput>`

Generate structured educational questions on a topic.

## Error Handling

All AI functions include automatic fallback mechanisms. If the AI provider fails, the system will:
1. Log the error
2. Return fallback content
3. Continue operation without crashing

## Cost Considerations

- **Gemini**: Free tier available (60 requests/minute)
- **OpenAI**: Pay-per-use (gpt-4o-mini is cost-effective)
- **Claude**: Pay-per-use (competitive pricing)

Start with Gemini for development and testing.

## Troubleshooting

### "API key not configured" error
- Ensure your `.env.local` file exists in the `src` directory
- Check that the API key is correctly set
- Restart your development server

### "Failed to extract JSON from AI response"
- The AI returned unexpected format
- Check your prompt formatting
- The fallback mechanism will provide basic content

### Rate limiting
- Implement request throttling
- Consider caching responses
- Use appropriate API tier for your usage

## Development

To test the AI module:

```bash
cd src
npm run dev
```

The AI flows are automatically loaded via `src/ai/dev.ts`.
