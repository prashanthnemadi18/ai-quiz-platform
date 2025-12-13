'use client';

import { generateEducationalContent } from '@/ai/flows/generate-educational-content';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles } from 'lucide-react';
import { useState } from 'react';

export function QuestionGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [topic, setTopic] = useState('The Solar System');
  const [count, setCount] = useState(5);
  const MIN_Q = 5;
  const MAX_Q = 25;
  const [types, setTypes] = useState<Array<'mcq' | 'tf' | 'short'>>(['mcq', 'tf', 'short']);
  const [questions, setQuestions] = useState<any[]>([]);

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [results, setResults] = useState<{
    correct: number;
    incorrect: number;
    ungraded: number;
    totalAuto: number;
    percent: number;
  } | null>(null);

  async function handleGenerate(e?: any) {
    e?.preventDefault();
    setIsLoading(true);
    setQuestions([]);
    setResults(null);
    try {
      const clamped = Math.max(MIN_Q, Math.min(MAX_Q, Number(count || MIN_Q)));

      // helper to create a canonical key for deduplication
      const canonical = (s = '') =>
        String(s)
          .trim()
          .replace(/^\s+|\s+$/g, '')
          // remove leading numbering like "Q1:" or "1)"
          .replace(/^q?\s*\d+[:.)\-\s]+/i, '')
          // remove remaining punctuation, keep letters/numbers/spaces
          .replace(/["'`~!@#\$%\^&*_=+\[\]{};:,<>?/\\|]/g, '')
          .replace(/\s+/g, ' ')
          .toLowerCase();

      const uniq: any[] = [];
      const seenKeys: string[] = [];
      const debugAttempts: number[] = [];

      // compute trigram Jaccard similarity between two strings (0..1)
      function trigramSimilarity(a: string, b: string) {
        const grams = (s: string) => {
          const g: Set<string> = new Set();
          const t = `  ${s} `; // pad
          for (let i = 0; i < t.length - 2; i++) g.add(t.slice(i, i + 3));
          return g;
        };
        const A = grams(a);
        const B = grams(b);
        let inter = 0;
        for (const x of A) if (B.has(x)) inter++;
        const union = A.size + B.size - inter;
        return union === 0 ? 0 : inter / union;
      }

      // attempt to collect up to `clamped` unique questions by repeating small regenerations
  let attempts = 0;
  const maxAttempts = 8; // try more times to collect unique questions
      while (uniq.length < clamped && attempts < maxAttempts) {
        const remaining = clamped - uniq.length;
        // request smaller batches to increase variety and reduce API work
        const batch = Math.min(5, remaining);
        const res = await generateEducationalContent({ topic, questionCount: batch, types });
  const raw = (res.questions || []) as any[];
  // record how many items came back from this attempt
  debugAttempts.push(raw.length);
        let addedThisRound = 0;
        for (const q of raw) {
          const rawText = String(q.question || '');
          const key = canonical(rawText);
          if (!key) continue;
          // consider near-duplicates: accept if similarity to all seenKeys is below threshold
          const THRESH = 0.78; // 0..1, lower allows more variance
          let isDuplicate = false;
          for (const s of seenKeys) {
            const sim = trigramSimilarity(s, key);
            if (sim >= THRESH) {
              isDuplicate = true;
              break;
            }
          }
          if (!isDuplicate && uniq.length < clamped) {
            seenKeys.push(key);
            // shuffle choices for MCQ
            if (q.type === 'mcq' && Array.isArray(q.choices)) q.choices = shuffleArray([...q.choices]);
            uniq.push(q);
            addedThisRound++;
          }
        }
        // if nothing new added, still continue a few attempts with different batching
        attempts++;
        if (addedThisRound === 0 && attempts >= maxAttempts) break;
      }

      // final fallback: if still not enough unique questions, synthesize deterministic fillers
      if (uniq.length < clamped) {
        const need = clamped - uniq.length;
        for (let k = 0; k < need; k++) {
          const idx = uniq.length + 1;
          const fq = {
            type: types[(idx - 1) % types.length],
            question: `Fallback: ${idx}. ${topic} - additional practice question.`,
            choices:
              (types[(idx - 1) % types.length] === 'mcq'
                ? [
                    `A concise description of ${topic}.`,
                    `An unrelated concept not about ${topic}.`,
                    `A common misconception about ${topic}.`,
                    `A practical example that is not ${topic}.`,
                  ]
                : undefined) as any,
            answer: undefined,
            _fallback: true,
          } as any;
          if (fq.type === 'mcq' && Array.isArray(fq.choices)) fq.choices = shuffleArray(fq.choices);
          uniq.push(fq);
        }
      }
  // attach debug info to questions state for visibility in UI when needed
  (uniq as any)._debug = { attempts: debugAttempts.slice(), requested: clamped };
      setQuestions(uniq);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  function handleAnswerChange(i: number, v: string) {
    setAnswers((s) => ({ ...s, [i]: v }));
  }

  function gradeAnswers() {
    let correct = 0,
      incorrect = 0,
      ungraded = 0,
      totalAuto = 0;

    const topicWords = (topic || '')
      .toLowerCase()
      .replace(/[.?,]/g, '')
      .split(/\s+/)
      .filter(Boolean);

    questions.forEach((q: any, i: number) => {
      const user = (answers[i] || '').trim();
      if (q.type === 'mcq' || q.type === 'tf') {
        totalAuto++;
        if (!user) incorrect++;
        else if (String(q.answer) === user) correct++;
        else incorrect++;
      } else {
        if (!user) ungraded++;
        else {
          const low = user.toLowerCase();
          const match = topicWords.some((w) => low.includes(w));
          if (match) correct++;
          else ungraded++;
        }
      }
    });

    const percent = totalAuto > 0 ? Math.round((correct / totalAuto) * 100) : 0;
    setResults({ correct, incorrect, ungraded, totalAuto, percent });
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-4">
      <div className="flex items-center justify-between bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-6 shadow-lg">
        <div>
          <h2 className="text-2xl font-semibold">AI Content Generator</h2>
          <p className="text-sm opacity-90">Generate practice questions (MCQ, True/False, Short) — unique, shuffled, and ready for students.</p>
        </div>
        <div className="text-sm text-right">
          <div className="font-medium">Count</div>
          <div className="mt-1 font-mono">min: {MIN_Q} • max: {MAX_Q}</div>
        </div>
      </div>

      <div className="rounded-lg bg-white shadow p-6">
        <form className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:items-end" onSubmit={handleGenerate}>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-1">Topic</label>
            <input value={topic} onChange={(e) => setTopic(e.target.value)} className="w-full rounded-md border p-2" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Count</label>
            <input type="number" value={count} min={MIN_Q} max={MAX_Q} onChange={(e) => setCount(Number(e.target.value))} className="w-full rounded-md border p-2" />
          </div>

          <div className="sm:col-span-3">
            <div className="flex flex-wrap gap-4 items-center">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={types.includes('mcq')} onChange={(e) => setTypes((t) => e.target.checked ? Array.from(new Set([...t, 'mcq'])) : t.filter(x => x !== 'mcq'))} />
                <span>MCQ</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={types.includes('tf')} onChange={(e) => setTypes((t) => e.target.checked ? Array.from(new Set([...t, 'tf'])) : t.filter(x => x !== 'tf'))} />
                <span>True/False</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={types.includes('short')} onChange={(e) => setTypes((t) => e.target.checked ? Array.from(new Set([...t, 'short'])) : t.filter(x => x !== 'short'))} />
                <span>Short answer</span>
              </label>
              <div className="ml-auto">
                <Button type="submit" disabled={isLoading} className="bg-indigo-600">
                  {isLoading ? <Loader2 className="animate-spin mr-2" /> : <Sparkles className="mr-2" />} Generate
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {isLoading && (
        <div className="rounded-lg bg-white p-6 shadow text-center">
          <Loader2 className="mx-auto h-6 w-6 animate-spin text-indigo-600" />
          <p className="mt-2 text-sm text-muted-foreground">AI is generating unique questions...</p>
        </div>
      )}

      {questions.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Generated Questions</h3>
          <div className="grid gap-4">
            {questions.map((q: any, i: number) => (
              <div key={i} className="rounded-md border p-4 bg-white shadow-sm">
                <div className="mb-2 font-medium">Q{i + 1}: {q.question}</div>
                {q.type === 'mcq' && q.choices && (
                  <div className="grid gap-2">
                    {q.choices.map((c: string, ci: number) => (
                      <label key={ci} className="flex items-center gap-3">
                        <input type="radio" name={`q-${i}`} value={c} checked={answers[i] === c} onChange={(e) => handleAnswerChange(i, e.target.value)} />
                        <span>{c}</span>
                      </label>
                    ))}
                  </div>
                )}
                {q.type === 'tf' && (
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2"><input type="radio" name={`q-${i}`} value="True" checked={answers[i] === 'True'} onChange={(e) => handleAnswerChange(i, e.target.value)} /> True</label>
                    <label className="flex items-center gap-2"><input type="radio" name={`q-${i}`} value="False" checked={answers[i] === 'False'} onChange={(e) => handleAnswerChange(i, e.target.value)} /> False</label>
                  </div>
                )}
                {q.type === 'short' && (
                  <textarea className="mt-2 w-full rounded-md border p-2" rows={3} value={answers[i] ?? ''} onChange={(e) => handleAnswerChange(i, e.target.value)} />
                )}
              </div>
            ))}

            <div className="flex items-center gap-4">
              <Button type="button" onClick={gradeAnswers}>Submit Answers</Button>
              <Button type="button" variant="ghost" onClick={() => { setAnswers({}); setResults(null); }}>Reset</Button>
            </div>

            {results && (
              <div className="rounded-lg bg-white p-4 shadow">
                <h4 className="mb-2 font-medium">Results</h4>
                <div className="text-sm">
                  <div>Auto-graded questions: {results.totalAuto}</div>
                  <div>Correct: {results.correct}</div>
                  <div>Incorrect: {results.incorrect}</div>
                  <div>Ungraded (short answers): {results.ungraded}</div>
                  <div className="mt-2 font-semibold">Score: {results.percent}%</div>
                </div>
              </div>
            )}
            {/* debug panel: show attempt sizes (only visible in dev) */}
            {(questions as any)?._debug && (
              <div className="mt-4 rounded border p-3 bg-yellow-50 text-sm">
                <div className="font-medium">Debug</div>
                <div>Requested: {(questions as any)._debug.requested}</div>
                <div>Attempts returned counts: {(questions as any)._debug.attempts.join(', ')}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// small helper to shuffle arrays
function shuffleArray<T>(arr: T[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
