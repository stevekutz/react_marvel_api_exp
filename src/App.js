// import logo from './logo.svg';
import './App.css';
// import React, {useState, useEffect, useRef} from 'react';
// // import {css} from "@emotion/react";
// import SyncLoader from "react-spinners/SyncLoader";
// // import ClipLoader from "react-spinners/ClipLoader";
// import marvelIntro from './img/marvel_intro.gif';


// import useFetch from './comp/useFetch';
import {Route, Switch, } from 'react-router-dom';

import Nav from './comp/Nav';
import Home from './comp/Home';
import Characters from './comp/Characters';
import Character from './comp/Character';
import Comics from './comp/Comics';
import Creators from './comp/Creators';
import Events from './comp/Events';
import Items from './comp/Items';
import About from './comp/About';



function App() {

  return (
    <div>
        <Nav />
        
        <div>
            <Switch>
                <Route exact path = '/'> <Home />  </Route>
                <Route exact path = '/characters'> <Characters />  </Route>
                <Route exact path = '/characters/:ID' > <Character /> </Route>
                <Route path = '/comics' > <Comics /> </Route>
                <Route path = '/creators'> <Creators />  </Route>
                <Route path = '/events'> <Events />  </Route>
                <Route path = '/items'> <Items/>  </Route>
                <Route path = '/about'> <About /> </Route>
            
            </Switch>
        </div>
        


    </div>



  );
}

export default App;
