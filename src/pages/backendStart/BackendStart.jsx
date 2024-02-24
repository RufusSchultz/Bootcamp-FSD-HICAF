import "./BackendStart.css";
import {useState} from "react";
import axios from "axios";
import Button from "../../components/button/Button.jsx";

///////////////////////////////////////////////////////////////////////////////////////
// This page would not exist in an actual release. It's purely for testing purposes. //
///////////////////////////////////////////////////////////////////////////////////////

function BackendStart() {
    const [adminStatus, setAdminStatus] = useState(null);
    const emptyInfo = JSON.stringify({favorites: [], filters: []});

    async function createAdmin() {

        const endpoint = "https://api.datavortex.nl/novibackendhicaf/users";
        const apiKey = "novibackendhicaf:HxI8znYrdSresrrSUlRm";

        try {
            const response = await axios.post(endpoint, {
                    username: "AdminAalDeRuyter",
                    email: "deruyter@hicaf.com",
                    password: "Vis12345",
                    info: emptyInfo,
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

    async function createTestUser() {

        const endpoint = "https://api.datavortex.nl/novibackendhicaf/users";
        const apiKey = "novibackendhicaf:HxI8znYrdSresrrSUlRm";

        try {
            const response = await axios.post(endpoint,
                {
                    username: "lokaas4",
                    email: "lok4@aas.com",
                    password: "Vis12345",
                    info: emptyInfo,
                    authorities: [
                        {authority: "USER"},
                    ],
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Api-Key': apiKey,
                    },
                });
            console.log(response);
        } catch (e) {
            console.error(e);
        }
    }

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
                <h3>Username: AdminAalDeRuyter</h3>
                <h3>Password: Vis12345</h3>

                {adminStatus && <div>
                    <h2 className={"error_text"}>{adminStatus}</h2>
                </div>}
            </div>
        </>
    )
}

export default BackendStart;