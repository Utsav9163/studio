'use client';
import { useState } from 'react';
import Sidebar from '@/components/canvas3d/Sidebar';
import Canvas from '@/components/canvas3d/Canvas';
import StickyNote from '@/components/canvas3d/StickyNote';
import { type Tool } from '@/lib/types';
import Rectangle from '@/components/canvas3d/Rectangle';
import Circle from '@/components/canvas3d/Circle';

interface Element {
  id: string;
  type: 'sticky-note' | 'rectangle' | 'circle';
  position: { top: string; left: string };
  text?: string;
  isTask?: boolean;
}

export default function Home() {
  const [activeTool, setActiveTool] = useState<Tool>('select');
  const [elements, setElements] = useState<Element[]>([]);

  const addElement = (tool: Tool, position: { x: number; y: number }) => {
    if (tool === 'sticky-note' || tool === 'rectangle' || tool === 'circle') {
      const newElement: Element = {
        id: new Date().toISOString(),
        type: tool,
        position: { top: `${position.y}px`, left: `${position.x}px` },
        ...(tool === 'sticky-note' && { text: "Editable note", isTask: false }),
      };
      setElements((prev) => [...prev, newElement]);
      setActiveTool('select');
    }
  };

  const renderElement = (element: Element) => {
    switch (element.type) {
      case 'sticky-note':
        return <StickyNote key={element.id} position={element.position} text={element.text!} isTask={element.isTask} />;
      case 'rectangle':
        return <Rectangle key={element.id} position={element.position} />;
      case 'circle':
        return <Circle key={element.id} position={element.position} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-dvh w-full flex-row font-body text-foreground">
      <Sidebar activeTool={activeTool} setActiveTool={setActiveTool} />
      <main className="flex-1 relative bg-background overflow-hidden">
        <Canvas
          activeTool={activeTool}
          setActiveTool={setActiveTool}
          addElement={addElement}
        />
        {elements.map(renderElement)}
      </main>
    </div>
  );
}
