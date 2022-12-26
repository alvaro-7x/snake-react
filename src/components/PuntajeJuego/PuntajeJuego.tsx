import { useEffect, useRef } from 'react';
import { ResolucionJuego } from '../../interfaces/constantes';
import { JuegoService } from '../../services/juego.service';

interface PropsPuntajeJuego
{
  juegoService: JuegoService;
}

export const PuntajeJuego = ({juegoService}: PropsPuntajeJuego) =>
{
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  const width: number = ResolucionJuego.width;
  const height = 50;

  useEffect(() =>
  {
    if (!canvasRef.current)
    {
      return;
    }

    canvasCtxRef.current = canvasRef.current.getContext('2d');
    const ctx = canvasCtxRef.current;

    if (!ctx)
    {
      return;
    }

    juegoService.setCtxDetallesJuego(ctx);
  }
  , []);

  return (
    <canvas ref={canvasRef} width={width} height={height}>
      Tu navegador no soporta canvas.
      Consigue un navegador <a href="https://www.mozilla.org/en-US/firefox/new/" target="_blank">aquí</a>
    </canvas>
  );
};
