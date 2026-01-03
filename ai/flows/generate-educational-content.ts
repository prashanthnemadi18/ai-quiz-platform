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
  const count = Math.max(1, Math.min(100, input.questionCount || 5)); // Cap at 100
  const types: Array<'mcq' | 'tf' | 'short'> = input.types && input.types.length > 0 ? input.types : ['mcq', 'tf', 'short'];
  const difficulty = input.difficulty || 'medium';

  // For large question counts, generate in batches
  if (count > 20) {
    return generateInBatches(topic, count, types, difficulty);
  }

  return generateBatch(topic, count, types, difficulty);
}

// Generate questions in batches for large counts
async function generateInBatches(
  topic: string,
  totalCount: number,
  types: Array<'mcq' | 'tf' | 'short'>,
  difficulty: string
): Promise<GenerateEducationalContentOutput> {
  const batchSize = 20;
  const batches = Math.ceil(totalCount / batchSize);
  const allQuestions: any[] = [];
  const seenQuestions = new Set<string>(); // Track unique questions

  for (let i = 0; i < batches; i++) {
    const questionsNeeded = Math.min(batchSize, totalCount - allQuestions.length);
    
    try {
      const batch = await generateBatch(topic, questionsNeeded, types, difficulty);
      
      // Deduplicate questions
      for (const question of batch.questions) {
        const questionKey = question.question.toLowerCase().trim();
        if (!seenQuestions.has(questionKey)) {
          seenQuestions.add(questionKey);
          allQuestions.push(question);
        }
      }
      
      // If we have enough unique questions, stop
      if (allQuestions.length >= totalCount) {
        break;
      }
    } catch (error) {
      console.error(`Error generating batch ${i + 1}:`, error);
    }
  }

  // If we still don't have enough, use fallback
  if (allQuestions.length < totalCount) {
    const remaining = totalCount - allQuestions.length;
    const fallback = generateFallbackQuestions(topic, remaining, types);
    allQuestions.push(...fallback.questions);
  }

  return { questions: allQuestions.slice(0, totalCount) };
}

// Generate a single batch of questions
async function generateBatch(
  topic: string,
  count: number,
  types: Array<'mcq' | 'tf' | 'short'>,
  difficulty: string
): Promise<GenerateEducationalContentOutput> {
  // Build the AI prompt with strict type enforcement
  let typeInstructions = '';
  let exampleFormat = '';
  
  if (types.length === 1) {
    // Only one type selected - be VERY explicit
    const type = types[0];
    if (type === 'mcq') {
      typeInstructions = `Generate ONLY multiple choice questions. EVERY SINGLE question must have:
- type: "mcq"
- 4 different options
- One correct answer
NO true/false questions. NO short answer questions. ONLY multiple choice.`;
      exampleFormat = `{
      "type": "mcq",
      "question": "What is...?",
      "choices": ["Option A", "Option B", "Option C", "Option D"],
      "answer": "Option A",
      "explanation": "Explanation here"
    }`;
    } else if (type === 'tf') {
      typeInstructions = `Generate ONLY true/false questions. EVERY SINGLE question must have:
- type: "tf"
- 2 options: True and False
- Correct answer (True or False)
NO multiple choice questions. NO short answer questions. ONLY true/false.`;
      exampleFormat = `{
      "type": "tf",
      "question": "Statement to evaluate",
      "choices": ["True", "False"],
      "answer": "True",
      "explanation": "Explanation here"
    }`;
    } else {
      typeInstructions = `Generate ONLY short answer questions. EVERY SINGLE question must have:
- type: "short"
- Open-ended question
- Sample answer in explanation
NO multiple choice questions. NO true/false questions. ONLY short answer.`;
      exampleFormat = `{
      "type": "short",
      "question": "Explain...",
      "explanation": "Sample answer here"
    }`;
    }
  } else {
    typeInstructions = `Distribute questions evenly across these types: ${types.join(', ')}`;
    exampleFormat = `Mix of ${types.join(', ')} questions`;
  }

  const prompt = `You are an expert educational content creator. Generate ${count} UNIQUE, NON-REPETITIVE educational questions about "${topic}".

CRITICAL REQUIREMENTS:
1. Difficulty level: ${difficulty}
2. ${typeInstructions}
3. Each question MUST be UNIQUE - no repeated questions
4. Each question MUST be DIFFERENT from others
5. Cover DIFFERENT aspects of the topic

${types.length === 1 ? `STRICT TYPE REQUIREMENT: ALL ${count} questions MUST have type="${types[0]}"` : ''}

Question Format:
${exampleFormat}

Return ONLY a valid JSON object (no markdown, no code blocks, no extra text):
{
  "questions": [
    // ${count} unique questions here
  ]
}

Generate exactly ${count} UNIQUE questions now:`;

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

    // STRICT type filtering - only keep questions of requested types
    let questions = parsed.questions.filter((q: any) => {
      // Must have the correct type
      if (!types.includes(q.type)) {
        console.warn(`Filtered out question with wrong type: ${q.type}, expected: ${types.join(', ')}`);
        return false;
      }
      
      // Additional validation based on type
      if (q.type === 'mcq') {
        // MCQ must have at least 2 choices
        if (!q.choices || q.choices.length < 2) {
          console.warn('Filtered out MCQ with insufficient choices');
          return false;
        }
      } else if (q.type === 'tf') {
        // TF must have exactly 2 choices
        if (!q.choices || q.choices.length !== 2) {
          console.warn('Filtered out TF with wrong number of choices');
          return false;
        }
      }
      
      return true;
    });
    
    // If we don't have enough questions of the right type, use fallback
    if (questions.length < count) {
      console.warn(`AI generated only ${questions.length} valid questions of requested types, expected ${count}. Using fallback for remaining.`);
      const remaining = count - questions.length;
      const fallback = generateFallbackQuestions(topic, remaining, types);
      questions = [...questions, ...fallback.questions];
    }

    // Ensure we have exactly the right number of questions
    questions = questions.slice(0, count);

    // Validate and fix each question
    questions = questions.map((q: any, index: number) => {
      // Ensure correct type
      if (!types.includes(q.type)) {
        q.type = types[0]; // Force to first requested type
      }
      
      // Fix choices based on type
      if (q.type === 'mcq') {
        if (!q.choices || q.choices.length < 4) {
          q.choices = [
            q.choices?.[0] || 'Option A',
            q.choices?.[1] || 'Option B', 
            q.choices?.[2] || 'Option C',
            q.choices?.[3] || 'Option D'
          ];
        }
      } else if (q.type === 'tf') {
        q.choices = ['True', 'False'];
      } else if (q.type === 'short') {
        q.choices = undefined; // Short answer has no choices
      }
      
      // Ensure answer exists
      if (!q.answer && q.choices && q.choices.length > 0) {
        q.answer = q.choices[0];
      }
      
      // Ensure question text exists
      if (!q.question || q.question.trim() === '') {
        q.question = `Question ${index + 1} about ${topic}`;
      }
      
      return q;
    });

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
  
  // Generate unique questions by varying the content
  const aspects = [
    'fundamental concepts',
    'practical applications',
    'historical context',
    'key principles',
    'common misconceptions',
    'advanced topics',
    'real-world examples',
    'theoretical foundations'
  ];

  for (let i = 0; i < count; i++) {
    const type = types[i % types.length];
    const aspect = aspects[i % aspects.length];

    if (type === 'mcq') {
      questions.push({
        type: 'mcq',
        question: `Which of the following best describes the ${aspect} of ${topic}?`,
        choices: [
          `A key aspect of ${topic}`,
          `An unrelated concept`,
          `A common misconception about ${topic}`,
          `A historical reference only`,
        ],
        answer: `A key aspect of ${topic}`,
        explanation: `This question tests understanding of ${aspect} in ${topic}.`,
      });
    } else if (type === 'tf') {
      const statements = [
        `${topic} is an important concept in its field.`,
        `Understanding ${topic} requires knowledge of ${aspect}.`,
        `${topic} has practical applications in real-world scenarios.`,
        `The ${aspect} of ${topic} are well-established.`,
      ];
      questions.push({
        type: 'tf',
        question: statements[i % statements.length],
        choices: ['True', 'False'],
        answer: 'True',
        explanation: `This statement about ${topic} is correct.`,
      });
    } else {
      const prompts = [
        `Explain the ${aspect} of ${topic}.`,
        `Describe how ${topic} relates to ${aspect}.`,
        `What are the key points about ${topic} regarding ${aspect}?`,
        `Discuss the importance of ${aspect} in ${topic}.`,
      ];
      questions.push({
        type: 'short',
        question: prompts[i % prompts.length],
        explanation: `Students should demonstrate understanding of ${aspect} in ${topic}.`,
      });
    }
  }

  return { questions };
}
