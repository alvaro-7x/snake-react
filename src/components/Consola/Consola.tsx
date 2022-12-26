import styles from './Consola.module.scss';
import { Botones } from '../Botones/Botones';
import { PuntajeJuego } from '../PuntajeJuego/PuntajeJuego';
import { Pantalla } from '../Pantalla/Pantalla';
import { JuegoService } from '../../services/juego.service';
import { Acciones, Movimientos } from '../../interfaces/constantes';

export const Consola = () =>
{
  const juegoService = new JuegoService();

  const eventoTeclaPrecionada = (res: number) =>
  {
    if (res >= Movimientos.LEFT && res <= Movimientos.DOWN)
    {
      clickCruceta(res);
    }
    else if (res === Acciones.BOTON_A)
    {
      clickBtnA();
    }
    else if (res === Acciones.BOTON_B)
    {
      clickBtnB();
    }
    else if (res === Acciones.BOTON_START)
    {
      clickBtnStar();
    }
    else if (res === Acciones.BOTON_RESET)
    {
      clickBtnReset();
    }
  };

  const clickCruceta = (direccion: number) =>
  {
    juegoService.crucetaClick(direccion);
  };

  const clickBtnA = () =>
  {
    juegoService.btnAClick();
  };

  const clickBtnB = () =>
  {
    juegoService.btnBClick();
  };

  const clickBtnStar = () =>
  {
    juegoService.btnStarClick();
  };

  const clickBtnReset = () =>
  {
    juegoService.btnResetClick();
  };

  return (
    <div className={styles.consola}>
      <div className={styles.superiorTexto}>
        <PuntajeJuego juegoService={juegoService} />
      </div>

      <div className={styles.superior}>
        <Pantalla juegoService={juegoService} />
      </div>

      <div className={styles.inferior}>
        <Botones juegoService={juegoService} eventoTeclaPrecionada={eventoTeclaPrecionada} />
      </div>

      <div className={styles.inferiorDetalles}>
        <div className={styles.powered}>Powered by React</div>
      </div>
    </div>
  );
};
