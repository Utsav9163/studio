import { Layers, Users, Share2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

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
        <div className="flex -space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar className="border-2 border-card">
                    <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Anne</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar className="border-2 border-card">
                    <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704e" />
                    <AvatarFallback>B</AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Ben</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar className="border-2 border-card bg-primary text-primary-foreground">
                    <AvatarFallback>+2</AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  <p>2 others</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
        </div>
        <Button variant="outline" size="sm">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </div>
    </header>
  );
}
