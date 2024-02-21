import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter as Router} from 'react-router-dom';
import AuthContextProvider from "./context/AuthContext.jsx";
import ColorContextProvider from "./context/ColorContext.jsx";
import UserContextProvider from "./context/UserContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
        <Router>
            <AuthContextProvider>
                <UserContextProvider>
                    <ColorContextProvider>
                        <App/>
                    </ColorContextProvider>
                </UserContextProvider>
            </AuthContextProvider>
        </Router>
    // </React.StrictMode>,
)
