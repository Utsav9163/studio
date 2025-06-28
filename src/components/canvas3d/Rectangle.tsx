interface RectangleProps {
  position: { top: string; left: string };
}

export default function Rectangle({ position }: RectangleProps) {
  return (
    <div
      className="absolute w-40 h-28 border-2 border-primary"
      style={{ ...position, pointerEvents: 'auto' }}
      data-ai-hint="rectangle shape"
    ></div>
  );
}
