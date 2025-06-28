interface CircleProps {
  position: { top: string; left: string };
}

export default function Circle({ position }: CircleProps) {
  return (
    <div
      className="absolute w-32 h-32 border-2 border-accent rounded-full"
      style={{ ...position, pointerEvents: 'auto' }}
      data-ai-hint="circle shape"
    ></div>
  );
}
