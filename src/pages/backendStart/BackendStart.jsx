import "./BackendStart.css";
import {useEffect, useState} from "react";
import axios from "axios";
import Button from "../../components/button/Button.jsx";

function BackendStart() {
    const abortController = new AbortController();
    const [cleanupTrigger, toggleCleanupTrigger] = useState(false);
    const [adminStatus, setAdminStatus] = useState(null);

    async function createAdmin() {

        const endpoint = "https://api.datavortex.nl/novibackendhicaf/users";
        const apiKey = "novibackendhicaf:HxI8znYrdSresrrSUlRm";

        try {
            const response = await axios.post(endpoint, {
                    username: "HICAFadmin",
                    email: "admin@hicaf.com",
                    password: "Vis12345",
                    info: "Adminnow",
                    authorities: [
                        {authority: "ADMIN"}
                    ],
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Api-Key': apiKey,
                    },
                    signal: abortController.signal,
                });
            console.log(response);
            setAdminStatus("Admin account successfully registered.");

        } catch (e) {
            console.error(e);
            if (e.response.data === "Username already exists in application novibackendhicaf") {
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

            <div className={"low_content_container"}>
                <h1>Admin account setup</h1>
                <h2>Click on the button below to create the Admin account.</h2>
                <Button
                    className={"big_button"}
                    text={"Create Admin"}
                    onClick={handleClick}
                    disabled={adminStatus}
                />
                <h3>Username: HICAFadmin</h3>
                <h3>Password: Vis12345</h3>

                {adminStatus && <div>
                    <h2 className={"error_text"}>{adminStatus}</h2>
                </div>}

            </div>


        </>

    )
}

export default BackendStart;