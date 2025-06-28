import { Layers, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-4 md:px-6 shrink-0">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 font-semibold">
          <Layers className="h-6 w-6 text-primary" />
          <span className="text-lg">Canvas3D</span>
        </div>
        <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Untitled Board</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </div>
    </header>
  );
}
