'use client';
import { useRef, useEffect, useState, type PointerEvent } from 'react';
import type { Tool } from '@/lib/types';
import { convertToSmartShape } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface CanvasProps {
  activeTool: Tool;
  setActiveTool: (tool: Tool) => void;
}

export default function Canvas({ activeTool, setActiveTool }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const getCanvasContext = () => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    return canvas.getContext('2d');
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = getCanvasContext();
    if (!canvas || !ctx) return;

    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 4;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const startDrawing = (e: PointerEvent<HTMLCanvasElement>) => {
    if (activeTool !== 'draw' && activeTool !== 'smart-shape') return;
    const ctx = getCanvasContext();
    if (!ctx) return;
    
    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const draw = (e: PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || (activeTool !== 'draw' && activeTool !== 'smart-shape')) return;
    const ctx = getCanvasContext();
    if (!ctx) return;

    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDrawing = async () => {
    const ctx = getCanvasContext();
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    
    setIsDrawing(false);
    ctx.closePath();

    if (activeTool === 'smart-shape') {
      setIsProcessing(true);
      try {
        const dataUrl = canvas.toDataURL('image/png');
        
        const result = await convertToSmartShape({
          roughShapeDataUri: dataUrl,
          shapeType: 'auto',
        });
        
        if ('error' in result && result.error) {
           toast({
            variant: "destructive",
            title: "Smart Shape Failed",
            description: result.error,
          });
        } else if ('smartShapeDataUri' in result) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          const img = new Image();
          img.onload = () => {
            const aspectRatio = img.width / img.height;
            let drawWidth = canvas.width * 0.5;
            let drawHeight = drawWidth / aspectRatio;

            if (drawHeight > canvas.height * 0.8) {
                drawHeight = canvas.height * 0.8;
                drawWidth = drawHeight * aspectRatio;
            }
            
            const x = (canvas.width - drawWidth) / 2;
            const y = (canvas.height - drawHeight) / 2;
            
            ctx.drawImage(img, x, y, drawWidth, drawHeight);
          };
          img.src = result.smartShapeDataUri;
        }

      } catch (error) {
         toast({
          variant: "destructive",
          title: "An unexpected error occurred",
          description: "Please try again later.",
        });
        console.error(error);
      } finally {
        setIsProcessing(false);
        setActiveTool('select');
      }
    }
  };

  return (
    <div className="w-full h-full relative">
      <canvas
        ref={canvasRef}
        onPointerDown={startDrawing}
        onPointerMove={draw}
        onPointerUp={stopDrawing}
        onPointerLeave={stopDrawing}
        className="w-full h-full"
        style={{ touchAction: 'none', cursor: (activeTool === 'draw' || activeTool === 'smart-shape') ? 'crosshair' : 'default' }}
      />
      {isProcessing && (
        <div className="absolute inset-0 bg-background/50 flex flex-col items-center justify-center gap-4 backdrop-blur-sm">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg font-medium text-foreground">Creating Smart Shape...</p>
        </div>
      )}
    </div>
  );
}
