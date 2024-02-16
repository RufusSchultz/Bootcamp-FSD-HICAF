import "./BackendStart.css";
import {useEffect, useState} from "react";
import axios from "axios";
import Button from "../../components/button/Button.jsx";

///////////////////////////////////////////////////////////////////////////////////////
// This page would not exist in an actual release. It's purely for testing purposes. //
///////////////////////////////////////////////////////////////////////////////////////

function BackendStart() {
    const abortController = new AbortController();
    const [cleanupTrigger, toggleCleanupTrigger] = useState(false);
    const [adminStatus, setAdminStatus] = useState(null);


    async function createAdmin() {

        const endpoint = "https://api.datavortex.nl/novibackendhicaf/users";
        const apiKey = "novibackendhicaf:HxI8znYrdSresrrSUlRm";

        try {
            const response = await axios.post(endpoint, {
                    username: "Admin",
                    email: "adminnow@hicaf.com",
                    password: "Vis12345",
                    info: "",
                    authorities: [
                        {authority: "ADMIN"},
                        {authority: "USER"},
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
        toggleCleanupTrigger(!cleanupTrigger);
    }

    async function createTestUser() {
        const endpoint = "https://api.datavortex.nl/novibackendhicaf/users";
        const apiKey = "novibackendhicaf:HxI8znYrdSresrrSUlRm";

        try {
            const response = await axios.post(endpoint,
                {
                    username: "lokaas2",
                    email: "lok2@aas.com",
                    password: "Vis12345",
                    info: "fav:test fav:test filt:appel filt:peer",
                    authorities: [
                        {authority: "USER"},
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

        } catch (e) {
            console.error(e);
        }
        toggleCleanupTrigger(!cleanupTrigger);
    }

    useEffect(() => {
        return function cleanup() {
            abortController.abort();
        }
    }, [cleanupTrigger]);

    function handleClick() {
        void createAdmin();
        // void createTestUser();

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
                <h3>Username: Admin</h3>
                <h3>Password: Vis12345</h3>

                {adminStatus && <div>
                    <h2 className={"error_text"}>{adminStatus}</h2>
                </div>}

            </div>


        </>

    )
}

export default BackendStart;