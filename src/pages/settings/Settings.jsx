import "./Settings.css"
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import axios from "axios";
import passwordStrengthTest from "../../helpers/passwordStrengthTest.js";
import settings_img from "../../assets/preferences.png";
import Button from "../../components/button/Button.jsx";
import InputField from "../../components/inputField/InputField.jsx";

function Settings() {
    const contextContent = useContext(AuthContext);
    const abortController = new AbortController();
    const token = localStorage.getItem("token");
    const endpoint = `https://api.datavortex.nl/novibackendhicaf/users/${contextContent.user.username}`;
    const [cleanupTrigger, toggleCleanupTrigger] = useState(false);
    const [editDetail, setEditDetail] = useState("");
    const [formState, setFormState] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [samePassword, setSamePassword] = useState({password: "",});
    const [editError, setEditError] = useState("");

    //--------------------Edit username-----------------------//

    function toggleChangeUsername() {
        setEditDetail("new_username");
        setEditError("");
    }

    function submitNewUsername(e) {
        e.preventDefault();
        if (!formState.username) {
            setEditError("Please enter a new name")
        } else if (formState.username === contextContent.user.username){
            setEditError("This is already your current username.")
        } else {
            void putNewUsername();
            toggleCleanupTrigger(!cleanupTrigger);
        }
    }

    async function putNewUsername(){
        try {
            const response = await axios.put(endpoint, {username: formState.username}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                signal: abortController.signal,
            });
            if (response.status === 204) {
                setEditDetail("new_username_succes")
            }
            console.log(response);
        } catch(e) {
            console.error(e);
            setEditDetail("error")
        }
    }

    //--------------------Edit email-----------------------//

    function toggleChangeEmail() {
        setEditDetail("new_email");
        setEditError("");
    }

    function submitNewEmail(e) {
        e.preventDefault();
        if (!formState.email) {
            setEditError("Please enter a new email");
        } else if (formState.email === contextContent.user.email){
            setEditError("This is already your current email.")
        } else {
            void putNewEmail();
            console.log(formState);
            toggleCleanupTrigger(!cleanupTrigger);
        }

    }

    async function putNewEmail(){
        try {
            const response = await axios.put(endpoint, {email: formState.email}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                signal: abortController.signal,
            });
            if (response.status === 204) {
                setEditDetail("new_email_succes")
            }
            console.log(response);
        } catch(e) {
            console.error(e);
            setEditDetail("error")
        }
    }

    //--------------------Edit password-----------------------//

    function toggleChangePassword() {
        setEditDetail("new_password");
        setEditError("");
    }

    function submitNewPassword(e) {
        e.preventDefault();
        setEditError("");
        if (!samePassword.password || !formState.password) {
            setEditError("Please fill in all fields");
        } else if (samePassword.password !== formState.password) {
            setEditError("Please enter the same password twice.");
        } else {
            const passwordCheck = passwordStrengthTest(formState.password, contextContent.user.username);
            if (passwordCheck !== formState.password) {
                setEditError(passwordCheck);
            } else {
                void putNewPassword();
                toggleCleanupTrigger(!cleanupTrigger);
            }
        }
    }

    async function putNewPassword(){
        try {
            const response = await axios.put(endpoint, {password: formState.password}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                signal: abortController.signal,
            });
            if (response.status === 204) {
                setEditDetail("new_password_succes")
            }
            console.log(response);
        } catch(e) {
            console.error(e);
            setEditDetail("error")
        }
    }

    function handleChangeSamePassword(e) {
        setSamePassword({
            [e.target.name]: e.target.value,
        });
    }

    //--------------------Common functions-----------------------//

    function handleChange(e) {
        setFormState({
            [e.target.name]: e.target.value,
        });
    }

    useEffect(() => {
        return function cleanup() {
            abortController.abort();
        }
    }, [cleanupTrigger]);

    function handleLogOutClick() {
        contextContent.logOutHandler();
    }

    //--------------------UI-----------------------//

    return (
        <div className={"settings_outer_container"}>
            <div className={"logout_button_wrapper"}>
                <Button
                    className={"small_button"}
                    text={"Click to log out"}
                    onClick={handleLogOutClick}
                />
            </div>
            <div className={"settings_inner_container"}>
                <div className={"settings_sidebar"}>
                    <h1>Settings</h1>
                    <img src={settings_img} alt="settings"/>
                    <Button
                        className={"big_button"}
                        text={"Go to favorites"}
                        destination={"/account/favorites"}
                    />
                </div>
                <div className={"settings_content"}>
                    <div className={"personal_details_wrapper"}>
                        <h2>Your details:</h2>
                        <div className={"personal_details"}>
                            <div className={"personal_detail"}>
                                <p className={"personal_detail_category"}>Username: </p>
                                <p className={"personal_detail_detail"}>{contextContent.user.username} </p>
                            </div>
                            <div className={"personal_detail"}>
                                <p className={"personal_detail_category"}>Email: </p>
                                <p className={"personal_detail_detail"}> {contextContent.user.email}</p>
                            </div>
                        </div>
                        <div className={"personal_details_actions"}>
                            <Button
                                className={"small_button"}
                                text={"Change username"}
                                onClick={toggleChangeUsername}
                            />
                            <Button
                                className={"small_button"}
                                text={"Change email"}
                                onClick={toggleChangeEmail}
                            />
                            <Button
                                className={"small_button"}
                                text={"Change password"}
                                onClick={toggleChangePassword}
                            />
                        </div>
                        <div>
                            {editDetail === "new_username" &&
                                <form onSubmit={submitNewUsername} className={"edit_personal_detail_wrapper"}>
                                    <div className={"edit_personal_detail_field"}>
                                        <h3>New username:</h3>
                                        <InputField
                                            type={"text"}
                                            name={"username"}
                                            id={"username"}
                                            value={formState.username}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className={"edit_personal_detail_field"}>
                                        {editError && <div className={"error_text"}><p>{editError}</p></div>}
                                        <Button
                                            className={"small_button"}
                                            text={"Submit"}
                                            type={"submit"}
                                        />
                                    </div>
                                </form>}
                            {editDetail === "new_username_succes" && <div className={"edit_success_message"}>
                                <h2>Username changed successfully!</h2>
                                <p>Changes will take effect at your next login.</p>
                            </div>}

                            {editDetail === "new_email" &&
                                <form onSubmit={submitNewEmail} className={"edit_personal_detail_wrapper"}>
                                    <div className={"edit_personal_detail_field"}>
                                        <h3>New email:</h3>
                                        <InputField
                                            type={"email"}
                                            name={"email"}
                                            id={"email"}
                                            value={formState.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className={"edit_personal_detail_field"}>
                                        {editError && <div className={"error_text"}><p>{editError}</p></div>}
                                        <Button
                                            className={"small_button"}
                                            text={"Submit"}
                                            type={"submit"}
                                        />
                                    </div>
                                </form>}
                            {editDetail === "new_email_succes" &&<div className={"edit_success_message"}>
                                <h2>Email changed successfully!</h2>
                                <p>Changes will take effect at your next login.</p>
                            </div>}

                            {editDetail === "new_password" &&
                                <form onSubmit={submitNewPassword} className={"edit_personal_detail_wrapper"}>
                                    <div className={"edit_personal_detail_field"}>
                                        <h3>New password:</h3>
                                        <InputField
                                            type={"password"}
                                            name={"password"}
                                            id={"password"}
                                            value={formState.password}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className={"edit_personal_detail_field"}>
                                        <h3>New password again:</h3>
                                        <InputField
                                            type={"password"}
                                            name={"password"}
                                            id={"password_check"}
                                            value={samePassword.password}
                                            onChange={handleChangeSamePassword}
                                        />
                                    </div>
                                    <div className={"edit_personal_detail_field"}>
                                        {editError && <div className={"error_text"}><p id={"edit_error_text"}>{editError}</p></div>}
                                        <Button
                                            className={"small_button"}
                                            text={"Submit"}
                                            type={"submit"}
                                        />
                                    </div>
                                </form>}
                            {editDetail === "new_password_succes" && <div className={"edit_success_message"}>
                                <h2>Password changed successfully!</h2>
                                <p>Changes will take effect at your next login.</p>
                            </div>}

                            {editDetail === "error" &&<div className={"edit_success_message"}>
                                <h2 className={"error_text"}>Something went wrong!</h2>
                                <p>Please try again later.</p>
                                <p>Or if you already changed one of your details, </p>
                                <p>please log out an log in. </p>
                            </div>}
                        </div>
                    </div>
                    <div>
                        <h2>Your searchfilters:</h2>
                        <p>filters bla bla</p>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Settings;