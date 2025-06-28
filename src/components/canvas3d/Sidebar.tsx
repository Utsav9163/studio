'use client';
import type { Tool } from '@/lib/types';
import {
  MousePointer,
  Pen,
  RectangleHorizontal,
  Circle,
  Upload,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface SidebarProps {
  activeTool: Tool;
  setActiveTool: (tool: Tool) => void;
}

const tools: { name: Tool; icon: React.ElementType; tooltip: string }[] = [
  { name: 'select', icon: MousePointer, tooltip: 'Select' },
  { name: 'draw', icon: Pen, tooltip: 'Draw' },
  { name: 'smart-shape', icon: Sparkles, tooltip: 'Smart Shape (AI)' },
  { name: 'rectangle', icon: RectangleHorizontal, tooltip: 'Rectangle' },
  { name: 'circle', icon: Circle, tooltip: 'Circle' },
  { name: 'image', icon: Upload, tooltip: 'Upload Image' },
];

export default function Sidebar({ activeTool, setActiveTool }: SidebarProps) {
  return (
    <aside className="flex flex-col items-center gap-y-4 border-r bg-card p-2">
      <TooltipProvider delayDuration={0}>
        {tools.map(({ name, icon: Icon, tooltip }) => (
          <Tooltip key={name}>
            <TooltipTrigger asChild>
              <Button
                variant={activeTool === name ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => setActiveTool(name)}
                aria-label={tooltip}
              >
                <Icon className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </aside>
  );
}
