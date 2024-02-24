import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "./AuthContext.jsx";
import axios from "axios";

export const UserContext = React.createContext({});

function UserContextProvider({children}) {

    const contextContent = useContext(AuthContext);
    const [userData, setUserData] = useState({});
    const [triggerGetData, toggleTriggerGetData] = useState(false);
    const abortController = new AbortController();

    useEffect(() => {

        async function getUserData() {
            const token = localStorage.getItem("token");
            const username = localStorage.getItem("username");
            const endpoint = `https://api.datavortex.nl/novibackendhicaf/users/${username}/info`;

            try {
                const response = await axios.get(endpoint, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                })
                setUserData(response.data);
                console.log("User is refreshed!");
            } catch (e) {
                console.error(e);
            }
        }

        if (contextContent.isAuth) {
            void getUserData();
        }

        return () => {
            abortController.abort();
        }

    }, [triggerGetData]);

    function squeezeTrigger() {
        toggleTriggerGetData(!triggerGetData);
    }

    const data = {
        data: userData,
        getUserData: squeezeTrigger,
    };

    return (
        <UserContext.Provider value={data}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;