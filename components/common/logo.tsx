import { BookOpenCheck } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-[#00b37e] to-[#00875f]">
        <BookOpenCheck className="h-5 w-5 text-white" />
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-lg font-bold">AI Exam Studio</span>
        <span className="text-xs text-muted-foreground">Adaptive assessment platform</span>
      </div>
    </div>
  );
}
