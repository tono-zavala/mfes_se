import './App.css';
import './utlts/Transitions.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import {StateProvider} from './utlts/Context';
import mainReducer from './utlts/store/store';
import PrivateRoute from './utlts/PrivateRoute';
import Splash from './cmps/public/Splash';
import { AnimatedSwitch } from 'react-router-transition';
import { pageTransitions as transition, mapGlideStyles as mapStyles } from './utlts/Transitions';


import Home from './cmps/public/Home';
import Login from './cmps/public/Login';

import ListProductos from './cmps/private/ListProductos';
import ListProductos2 from './cmps/private/ListProductos2';
import Signin from './cmps/public/Signin'

import NewProducto from './cmps/private/NewProducto';
import UnProducto from './cmps/private/UnProducto';
import NewDetalleBlusa from './cmps/private/NewDetalleBlusa';

import NotFound from './cmps/public/NotFound';

function App() {
  let appState = mainReducer();
  return (
    <StateProvider initialState={appState} reducer={mainReducer}>
      <div className="App">
        <Router>
          <Splash>
            <AnimatedSwitch
              {...transition}
              mapStyles={mapStyles}
              className="switch-wrapper"
            >
              <Route path="/" exact component={Home} />
              <Route path="/login"  component={Login} />
              <Route path="/signin"  component={Signin}/>

              <PrivateRoute path="/productos" exact  component={ListProductos}/>
              <PrivateRoute path="/productos2"  exact component={ListProductos2}/>
              <PrivateRoute path="/productos/new" exact component={NewProducto}/>
              <PrivateRoute path="/productos/one" exact component={UnProducto}/>
              <PrivateRoute path="/productos/one/blusas/add" exact component={NewDetalleBlusa}/>


              <Route path="*" component={NotFound} />
            </AnimatedSwitch>
          </Splash>
        </Router>
      </div>
    </StateProvider>
  );
}

export default App;