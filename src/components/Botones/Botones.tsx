import styles from './Botones.module.scss';
import { BotonItem } from '../BotonItem/BotonItem';
import { JuegoService } from '../../services/juego.service';

interface PropsBotones
{
  juegoService: JuegoService;
  eventoTeclaPrecionada: (t: number) => void;
}

export const Botones = ({juegoService, eventoTeclaPrecionada}: PropsBotones) =>
{
  return (
    <div className={styles.container}>
      <BotonItem juegoService={juegoService} eventoTeclaPrecionada={eventoTeclaPrecionada}/>
    </div>
  );
};
