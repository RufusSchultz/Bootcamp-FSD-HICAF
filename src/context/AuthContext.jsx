import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import validTokenChecker from "../helpers/validTokenChecker.js";
import {jwtDecode} from "jwt-decode";
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
        const token = localStorage.getItem('token');
        if (token && validTokenChecker(token)) {
            void logIn(token);
        } else {
            setAuth({
                isAuth: false,
                user: null,
                status: "done",
            })
        }
    }, []);

    async function logIn(token) {

        localStorage.setItem("token", token);
        const decoded = jwtDecode(token);
        const endpoint = `https://frontend-educational-backend.herokuapp.com/api/user`

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
                    id: response.data.id,
                    roles: response.data.roles,
                },
                status: "done",
            });
            console.log("Gebruiker is ingelogd!");
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
        console.log("Gebruiker is uitgelogd!");
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
            {auth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    )

}

export default AuthContextProvider;