import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface StickyNoteProps {
  position: { top: string; left: string };
  text: string;
  isTask?: boolean;
}

export default function StickyNote({ position, text, isTask = false }: StickyNoteProps) {
  return (
    <div
      className="absolute flex flex-col w-60 h-60 p-4 bg-yellow-200 shadow-lg rounded-md transform -rotate-2"
      style={{ ...position, pointerEvents: 'auto' }}
      data-ai-hint="sticky note"
    >
      <textarea
        className="flex-1 bg-transparent border-none resize-none focus:outline-none font-medium text-lg text-yellow-900"
        defaultValue={text}
      />
      {isTask && (
        <div className="flex items-center space-x-2 mt-2 pt-2 border-t border-yellow-300">
          <Checkbox id={`task-${text.slice(0,5)}`} className="border-yellow-400 data-[state=checked]:bg-accent" />
          <Label htmlFor={`task-${text.slice(0,5)}`} className="text-sm font-medium text-yellow-800">
            Mark as done
          </Label>
        </div>
      )}
    </div>
  );
}
