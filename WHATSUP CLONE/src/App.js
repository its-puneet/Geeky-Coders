import './App.css';
import {Provider, useDispatch, useSelector} from "react-redux";
import {store} from "./app/store";
import {Fragment, useState} from "react";
import {Wrapper} from "./components/Wrapper";


function App() {
  return (
     <Fragment>
         <Provider store={store}>
            <Wrapper/>
         </Provider>
     </Fragment>
  );
}

export default App;
