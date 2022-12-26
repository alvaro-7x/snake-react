import { Acciones, MapeoMovimientos, Movimientos, ResolucionJuego } from '../../interfaces/constantes';
import { Boton, Cruceta, PuntoClick } from '../../interfaces/interfaces-juego';
import { MouseEvent, useEffect, useRef } from 'react';
import { JuegoService } from '../../services/juego.service';

interface PropsBotonItem
{
  juegoService: JuegoService;
  eventoTeclaPrecionada: (t: number) => void;
}

export const BotonItem = ({juegoService, eventoTeclaPrecionada}: PropsBotonItem) =>
{
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  const width: number = ResolucionJuego.width;
  const height = 118;
  const distancia = 38;

  const cruceta: Cruceta = {x: 3, y: 1, color: '#212529'};
  const botonA: Boton = {x: 11, y: 2, color: '#ac0e28', texto: 'A', accion: Acciones.BOTON_A};
  const botonB: Boton = {x: 9, y: 3, color: '#012e67', texto: 'B', accion: Acciones.BOTON_B};

  const botonStart: Boton = {x: 8, y: 1, color: '#212529', texto: 'Start/Pause', accion: Acciones.BOTON_START};
  const botonReset: Boton = {x: 6, y: 1, color: '#212529', texto: 'Reset', accion: Acciones.BOTON_RESET};

  const radioBotonAccion = distancia - 10;

  const keyEvent = (event: KeyboardEvent) =>
  {
    const buscar = getMovimientoAccion(event.keyCode);

    if (buscar)
    {
      manejarEventosBotones(buscar.movimientoAccion);
    }
  };

  const getMovimientoAccion = (keyCode: number) =>
  {
    const buscar = MapeoMovimientos.find((dato) =>
    {
      if (dato.tecla === keyCode)
      {
        return dato;
      }
      return;
    });

    return (buscar) || null;
  };

  const manejarEventosBotones = (movimientoAccion: number) =>
  {
    if (movimientoAccion < 0)
    {
      return;
    }

    let teclaPrecionada = -1;

    switch (movimientoAccion)
    {
      case Movimientos.LEFT:
        juegoService.redibujarCruceta(cruceta.x, cruceta.y, cruceta.color, Movimientos.LEFT);
        teclaPrecionada = Movimientos.LEFT;
        break;

      case Movimientos.UP:
        juegoService.redibujarCruceta(cruceta.x, cruceta.y, cruceta.color, Movimientos.UP);
        teclaPrecionada = Movimientos.UP;
        break;

      case Movimientos.RIGHT:
        juegoService.redibujarCruceta(cruceta.x, cruceta.y, cruceta.color, Movimientos.RIGHT);
        teclaPrecionada = Movimientos.RIGHT;
        break;

      case Movimientos.DOWN:
        juegoService.redibujarCruceta(cruceta.x, cruceta.y, cruceta.color, Movimientos.DOWN);
        teclaPrecionada = Movimientos.DOWN;
        break;

      case Acciones.BOTON_A:
        juegoService.redibujarBotonAccion(botonA.x, botonA.y, botonA.color, botonA.texto);
        teclaPrecionada = Acciones.BOTON_A;
        break;

      case Acciones.BOTON_B:
        juegoService.redibujarBotonAccion(botonB.x, botonB.y, botonB.color, botonB.texto);
        teclaPrecionada = Acciones.BOTON_B;
        break;

      case Acciones.BOTON_RESET:
        juegoService.redibujarBotonOpcion(botonReset.x, botonReset.y, botonReset.color, botonReset.texto);
        teclaPrecionada = Acciones.BOTON_RESET;
        break;

      case Acciones.BOTON_START:
        juegoService.redibujarBotonOpcion(botonStart.x, botonStart.y, botonStart.color, botonStart.texto);
        teclaPrecionada = Acciones.BOTON_START;
        break;
    }

    if (teclaPrecionada > 0)
    {
      eventoTeclaPrecionada(teclaPrecionada);
    }
  };

  const clickEnCanvas = (event: MouseEvent<HTMLCanvasElement>) =>
  {
    const puntoClick = {x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY };

    clickCruceta(puntoClick, cruceta, distancia);

    clickBotonOpcion(puntoClick, botonStart, distancia);
    clickBotonOpcion(puntoClick, botonReset, distancia);

    clickBotonAccion(puntoClick, botonA, distancia, radioBotonAccion);
    clickBotonAccion(puntoClick, botonB, distancia, radioBotonAccion);
  };

  const clickCruceta = (puntoClick: PuntoClick, cruceta: Cruceta, distancia: number) =>
  {
    const movimientoAccion = juegoService.verificarClickCruceta(puntoClick, cruceta, distancia);

    if (movimientoAccion > 0)
    {
      manejarEventosBotones(movimientoAccion);
    }
  };

  const clickBotonAccion = (puntoClick: PuntoClick, boton: Boton, distancia:number, radioBotonAccion: number) =>
  {
    const movimientoAccion = juegoService.verificarClickBotonAccion(puntoClick, boton, distancia, radioBotonAccion);

    if (movimientoAccion > 0)
    {
      manejarEventosBotones(movimientoAccion);
    }
  };

  const clickBotonOpcion = (puntoClick: PuntoClick, boton: Boton, distancia: number) =>
  {
    const movimientoAccion = juegoService.verificarClickBotonOpcion(puntoClick, boton, distancia);

    if (movimientoAccion > 0)
    {
      manejarEventosBotones(movimientoAccion);
    }
  };

  useEffect(() =>
  {
    if (!canvasRef.current)
    {
      return;
    }

    window.document.addEventListener('keydown', keyEvent);

    canvasCtxRef.current = canvasRef.current.getContext('2d');
    const ctx = canvasCtxRef.current;

    if (!ctx)
    {
      return;
    }

    juegoService.setCtxControlesJuego(ctx);

    juegoService.dibujarCruceta(cruceta.x, cruceta.y, cruceta.color); // cruceta normal
    juegoService.dibujarBotonAccion(botonA.x, botonA.y, botonA.color, botonA.texto, radioBotonAccion, true);
    juegoService.dibujarBotonAccion(botonB.x, botonB.y, botonB.color, botonB.texto, radioBotonAccion, true);

    juegoService.dibujarBotonOpcion(botonReset.x, botonReset.y, botonReset.color, botonReset.texto, null);
    juegoService.dibujarBotonOpcion(botonStart.x, botonStart.y, botonStart.color, botonStart.texto, null);

    return () =>
    {
      window.document.removeEventListener('keydown', keyEvent);
    };
  }
  , []);

  return (
    <canvas ref={canvasRef} onClick={clickEnCanvas} width={width} height={height}>
      Tu navegador no soporta canvas.
      Consigue un navegador <a href="https://www.mozilla.org/en-US/firefox/new/" target="_blank">aquí</a>
    </canvas>
  );
};
