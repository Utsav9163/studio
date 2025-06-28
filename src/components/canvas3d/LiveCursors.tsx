'use client'
import { MousePointer2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const CURSORS = [
  { name: 'Anne', color: '#FF6B6B' },
  { name: 'Ben', color: '#4ECDC4' },
];

function Cursor({ name, color, position }: { name: string; color: string; position: { x: number; y: number } }) {
  return (
    <div
      className="absolute flex items-center gap-1 transition-all duration-300 ease-in-out"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
        color: color,
        pointerEvents: 'none',
      }}
    >
      <MousePointer2 className="h-6 w-6" style={{ transform: 'rotate(-15deg)' }} />
      <span className="rounded-full bg-card px-2 py-1 text-sm font-medium shadow">{name}</span>
    </div>
  );
}

export default function LiveCursors() {
  const [positions, setPositions] = useState(CURSORS.map(() => ({ x: 50, y: 50 })));

  useEffect(() => {
    const interval = setInterval(() => {
      setPositions(
        positions.map(() => ({
          x: Math.random() * 80 + 10, // 10% to 90%
          y: Math.random() * 80 + 10,
        }))
      );
    }, 3000);
    
    // Initial random position
    setPositions(
        positions.map(() => ({
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10,
        }))
      );

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {CURSORS.map((cursor, index) => (
        <Cursor key={cursor.name} {...cursor} position={positions[index]} />
      ))}
    </>
  );
}
