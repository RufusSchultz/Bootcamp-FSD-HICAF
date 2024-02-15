import "./Account.css";
import Button from "../../components/button/Button.jsx";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import favorites_img from "../../assets/favorites.png";
import settings_img from "../../assets/preferences.png";
import InputField from "../../components/inputField/InputField.jsx";
import passwordStrengthTest from "../../helpers/passwordStrengthTest.js";

function Account() {

    const contextContent = useContext(AuthContext);
    const [subpage, setSubpage] = useState("");
    const [editDetail, setEditDetail] = useState("");
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [samePassword, setSamePassword] = useState({password: "",});
    const [editError, setEditError] = useState("");

//--------------------Favorites-----------------------//

//--------------------Settings-----------------------//

    function changeUsername() {
        setEditDetail("new_username");
        setEditError("");
    }

    function submitNewUsername(e) {
        e.preventDefault();
        if (!formState.name) {
            setEditError("Please enter a new name")
        } else if (formState.name === contextContent.user.username){
            setEditError("This is already your current username.")
            console.log(formState.name);
            console.log(contextContent.user.username);
        } else {
            setEditDetail("new_username_succes");
            console.log(formState);
        }
    }

    function changeEmail() {
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
            setEditDetail("new_email_succes");
            console.log(formState);
        }

    }

    function changePassword() {
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
                console.log(formState);
                console.log(samePassword);
                setEditDetail("new_password_succes");
            }

        }

    }

    function handleChange(e) {
        setFormState({
            [e.target.name]: e.target.value,
        });
    }

    function handleChangeSamePassword(e) {
        setSamePassword({
            [e.target.name]: e.target.value,
        });
    }

//--------------------Navigation-----------------------//
    function goToFavoritesSubpage() {
        setSubpage("favorites");
    }

    function goToSettingsSubpage() {
        setSubpage("settings");
    }

    function handleLogOutClick() {
        contextContent.logOutHandler();
    }

//-------------------------------------------//

    return (
        <div className={"account_outer_container"}>
            {subpage && <div className={"logout_button_wrapper"}>
                <Button
                    className={"small_button"}
                    text={"Click to log out"}
                    onClick={handleLogOutClick}
                />
            </div>}

            {!subpage && <div className={"account_outer_container"}>
                <h1 id={"welcome_text"}>Welcome, {contextContent.user.username}!</h1>
                <div className={"content_outer_container"}>
                    <div className={"content_inner_container"}>
                        <img src={favorites_img} alt="Favorites"/>
                        <Button
                            className={"big_button"}
                            text={"Favorites"}
                            onClick={goToFavoritesSubpage}
                        />
                    </div>
                    <div className={"content_inner_container"}>
                        <img src={settings_img} alt="Settings"/>
                        <Button
                            className={"big_button"}
                            text={"Settings"}
                            onClick={goToSettingsSubpage}
                        />
                    </div>
                </div>
                <Button
                    label={"Want to log out?"}
                    className={"small_button"}
                    text={"Click me!"}
                    onClick={handleLogOutClick}
                />
            </div>}

            {subpage === "favorites" && <div>
                <h1>Favorites</h1>
                <img src={favorites_img} alt="favorites"/>
                <Button
                    className={"big_button"}
                    text={"Go to settings"}
                    onClick={goToSettingsSubpage}
                />
            </div>}

            {subpage === "settings" && <div className={"settings_subpage"}>
                <div className={"settings_sidebar"}>
                    <h1>Settings</h1>
                    <img src={settings_img} alt="settings"/>
                    <Button
                        className={"big_button"}
                        text={"Go to favorites"}
                        onClick={goToFavoritesSubpage}
                    />
                </div>
                <div className={"settings_content"}>
                    <div className={"personal_details_wrapper"}>
                        <h2>Your details:</h2>
                        <div className={"personal_details"}>
                            <div className={"personal_detail"}>
                                <p>Username: </p>
                                <p>{contextContent.user.username} </p>
                            </div>
                            <div className={"personal_detail"}>
                                <p>Email: </p>
                                <p> {contextContent.user.email}</p>
                            </div>
                        </div>
                        <div className={"personal_details_actions"}>
                            <Button
                                className={"small_button"}
                                text={"Change username"}
                                onClick={changeUsername}
                            />
                            <Button
                                className={"small_button"}
                                text={"Change email"}
                                onClick={changeEmail}
                            />
                            <Button
                                className={"small_button"}
                                text={"Change password"}
                                onClick={changePassword}
                            />
                        </div>
                        <div>
                            {editDetail === "new_username" &&
                                <form onSubmit={submitNewUsername} className={"edit_personal_detail_wrapper"}>
                                    <div className={"edit_personal_detail_field"}>
                                        <h3>New username:</h3>
                                        <InputField
                                            type={"text"}
                                            name={"name"}
                                            id={"name"}
                                            value={formState.name}
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
                            </div>}
                        </div>
                    </div>
                    <div>
                        <h2>Your searchfilters:</h2>
                        <p>filters bla bla</p>
                    </div>
                </div>

            </div>}


        </div>
    )
}

{/*<details>*/
}
{/*    <summary className={"edit_personal_details"}>Change username</summary>*/
}
{/*    <form onSubmit={changeUsername}>*/
}
{/*        <InputField*/
}

{/*        />*/
}
{/*        <Button*/
}
{/*            className={"small_button"}*/
}
{/*            text={"Submit"}*/
}
{/*            type={"submit"}*/
}
{/*        />*/
}
{/*    </form>*/
}
{/*</details>*/
}
{/*<details>*/
}
{/*    <summary className={"edit_personal_details"}>Change email</summary>*/
}
{/*    <form onSubmit={changeEmail}>*/
}
{/*        <InputField*/
}

{/*        />*/
}
{/*        <Button*/
}
{/*            className={"small_button"}*/
}
{/*            text={"Submit"}*/
}
{/*            type={"submit"}*/
}
{/*        />*/
}
{/*    </form>*/
}
{/*</details>*/
}
{/*<details>*/
}
{/*    <summary className={"edit_personal_details"}>Change password</summary>*/
}
{/*    <form onSubmit={changePassword}>*/
}
{/*        <InputField*/
}

{/*        />*/
}
{/*        <Button*/
}
{/*            className={"small_button"}*/
}
{/*            text={"Submit"}*/
}
{/*            type={"submit"}*/
}
{/*        />*/
}
{/*    </form>*/
}
{/*</details>*/
}
export default Account;