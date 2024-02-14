import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import validTokenChecker from "../helpers/validTokenChecker.js";
import axios from "axios";

export const AuthContext = React.createContext({});


function AuthContextProvider({ children }) {

    const navigate = useNavigate();
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: "pending",
    });

    useEffect(() => {
        console.log("It's refreshed, exciting!");
        const token = localStorage.getItem("token");
        const username= localStorage.getItem("username")
        if (token && validTokenChecker(token)) {
            void logIn(username, token);
        } else {
            setAuth({
                isAuth: false,
                user: null,
                status: "done",
            })
        }
    }, []);

    async function logIn(username, token) {

        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        const endpoint = `https://api.datavortex.nl/novibackendhicaf/users/${username}`;

        try {
            const response = await axios.get(endpoint, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            })
            setAuth({
                isAuth: true,
                user: {
                    username: response.data.username,
                    email: response.data.email,
                    favorites: response.data.info,
                    authority: response.data.authorities,
                },
                status: "done",
            });
            console.log("User is hooked!");
            navigate("/account");
        } catch (e) {
            console.error(e);
            logOut();
        }
    }

    function logOut() {

        localStorage.removeItem("token");
        setAuth({
            isAuth: false,
            user: null,
            status: "done",
        });
        console.log("User was caught and is released!");
        navigate("/")
    }

    const data = {
        isAuth: auth.isAuth,
        user: auth.user,
        logInHandler: logIn,
        logOutHandler: logOut,
    }

    return (
        <AuthContext.Provider value={data}>
            {auth.status === "done" ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    )

}

export default AuthContextProvider;