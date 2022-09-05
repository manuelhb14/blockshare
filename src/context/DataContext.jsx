import React, { createContext, useState} from "react";

export const DataContext = createContext();

export const DataProvider = (props) => {
    const [address, setAddress] = useState("");
    const [isConnected, setIsConnected] = useState(false);

    return (
        <DataContext.Provider value={{address, setAddress, isConnected, setIsConnected}}>
            {props.children}
        </DataContext.Provider>
    );
}

