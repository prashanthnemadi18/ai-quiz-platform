import { providePersonalizedRecommendations } from '@/ai/flows/provide-personalized-recommendations';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, BookCopy } from 'lucide-react';

// Mock user data as a real implementation would fetch this
const MOCK_USER_DATA = {
  studentId: 'user-123',
  learningProgress:
    'Completed introductory algebra, struggling with quadratic equations.',
  preferences:
    'Prefers video tutorials and interactive examples over long texts.',
};

export async function Recommendations() {
  let recommendations: string[] = [];
  let error: string | null = null;

  try {
    const result = await providePersonalizedRecommendations(MOCK_USER_DATA);
    if (result && result.recommendations) {
      recommendations = result.recommendations;
    } else {
      throw new Error('Failed to get a valid response from AI.');
    }
  } catch (e) {
    console.error('Failed to fetch recommendations:', e);
    error =
      'Could not load recommendations at this time. Please try again later.';
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <Lightbulb className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (recommendations.length === 0) {
    return (
      <Alert>
        <Lightbulb className="h-4 w-4" />
        <AlertTitle>No Recommendations Yet</AlertTitle>
        <AlertDescription>
          We're still gathering data to provide you with the best
          recommendations. Keep learning!
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg bg-primary/10 p-4">
        <h4 className="font-semibold text-primary">Based on your profile:</h4>
        <p className="text-sm text-primary/80">
          <span className="font-medium">Progress:</span>{' '}
          {MOCK_USER_DATA.learningProgress} <br />
          <span className="font-medium">Preferences:</span>{' '}
          {MOCK_USER_DATA.preferences}
        </p>
      </div>
      <ul className="space-y-3">
        {recommendations.map((rec, index) => (
          <li
            key={index}
            className="flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50"
          >
            <div className="mt-1 rounded-full bg-accent/20 p-2">
              <BookCopy className="h-5 w-5 text-accent" />
            </div>
            <p className="flex-1 text-foreground">{rec}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
