import './App.css';
import { Consola } from './components/Consola/Consola';
import { Fragment } from 'react';

function App ()
{
  return (
    <Fragment>
      <div className="efecto">
        <div className="decoracion">
          <div className="detalle"></div>
        </div>
      </div>
      <Consola />
    </Fragment>
  );
}

export default App;
