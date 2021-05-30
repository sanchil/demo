import React, { createContext} from 'react';
import {initstate, useContextStore} from './hookstore';



export const AppContext = createContext();


export const AppProvider = (props) => {
    const store = useContextStore(initstate);
    return (<AppContext.Provider value={{ ...store }}>{props.children}</AppContext.Provider>);
}

