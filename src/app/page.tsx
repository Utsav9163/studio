'use client';
import { useState } from 'react';
import Header from '@/components/canvas3d/Header';
import Sidebar from '@/components/canvas3d/Sidebar';
import Canvas from '@/components/canvas3d/Canvas';
import LiveCursors from '@/components/canvas3d/LiveCursors';
import StickyNote from '@/components/canvas3d/StickyNote';
import { type Tool } from '@/lib/types';

export default function Home() {
  const [activeTool, setActiveTool] = useState<Tool>('draw');

  return (
    <div className="flex h-dvh w-full flex-col font-body text-foreground">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeTool={activeTool} setActiveTool={setActiveTool} />
        <main className="flex-1 relative bg-background overflow-hidden">
          <Canvas activeTool={activeTool} setActiveTool={setActiveTool} />
          <LiveCursors />
          <StickyNote
            position={{ top: '10%', left: '20%' }}
            text="Review Q3 marketing strategy."
          />
           <StickyNote
            position={{ top: '40%', left: '45%' }}
            text="Finalize onboarding flow designs."
            isTask={true}
          />
        </main>
      </div>
    </div>
  );
}
