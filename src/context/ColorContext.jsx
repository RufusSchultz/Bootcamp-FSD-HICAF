import React, {useState} from "react";


export const ColorContext = React.createContext({});

function ColorContextProvider({children}) {

    const [theme, setTheme] = useState({
        continentColorClass: "",
    })

    function setContinentColor(continent) {
        if (continent) {
            setTheme({
                ...theme,
                continentColorClass: continent,
            });
        } else {
            setTheme({
                ...theme,
                continentColorClass: "no_continent",
            });
        }
    }

    const data = {
        continentColorClass: theme.continentColorClass,
        continentColorSetter: setContinentColor,
    }

    return (
        <ColorContext.Provider value={data}>
            {children}
        </ColorContext.Provider>
    )

}

export default ColorContextProvider;