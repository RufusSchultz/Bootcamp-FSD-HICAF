import "./BackendStart.css";
import {useEffect, useState} from "react";
import axios from "axios";
import Button from "../../components/button/Button.jsx";

function BackendStart() {
    const abortController = new AbortController();
    const [backendStatus, setBackendStatus] = useState(null);
    const [cleanupTrigger, toggleCleanupTrigger] = useState(false);
    const [adminStatus, setAdminStatus] = useState(null);

    useEffect(() => {

        const endpoint = "https://frontend-educational-backend.herokuapp.com/api/test/all";

        async function checkBackend() {
            try {
                const response = await axios.get(endpoint, {signal: abortController.signal});
                setBackendStatus(response.data);
            } catch (e) {
                console.error(e)
            }
        }

        void checkBackend();

        return function cleanup() {
            abortController.abort();
        }

    }, []);

    async function createAdmin() {

        const endpoint = "https://frontend-educational-backend.herokuapp.com/api/auth/signup"
        const form = {
            username: "HICAFadmin",
            email: "admin@hicaf.com",
            password: "Vis123",
            role: ["user", "admin"],
            signal: abortController.signal,
        }

        try {
            const response = await axios.post(endpoint, form);
            console.log(response);
            setAdminStatus(response.data.message);
        } catch(e) {
            console.error(e);
            if (e.response.data.message === "This username is already in use") {
                setAdminStatus("Admin account is already successfully registered.")
            }
        }
    }

    useEffect(() => {
        return function cleanup() {
            abortController.abort();
        }
    }, [cleanupTrigger]);

    function handleClick() {
        void createAdmin();
        toggleCleanupTrigger(!cleanupTrigger);
    }

    return (
        <>
            {!backendStatus && <div className={"low_content_container"}>
                <h1>The backend is not (yet) responding.</h1>
                <h2>Please refresh the page in about 30 seconds.</h2>
                </div>}

            {backendStatus && <div className={"low_content_container"}>
                <h1>{backendStatus}</h1>
                <h2>Click on the button below to create the Admin account.</h2>
                <Button
                    className={"big_button"}
                    text={"Create Admin"}
                    onClick={handleClick}
                    disabled={adminStatus}
                />
                <h3>Username: HICAFadmin</h3>
                <h3>Password: Vis123</h3>

                {adminStatus && <div>
                    <h2 className={"error_text"}>{adminStatus}</h2>
                </div>}

            </div>}


        </>

    )
}

export default BackendStart;