import "./Login.css";
import inlogImage from "../../assets/logo_inlog.png"
import InputField from "../../components/inputField/InputField.jsx";
import Button from "../../components/button/Button.jsx";
import {useContext, useEffect, useState} from "react";
import passwordStrengthTest from "../../helpers/passwordStrengthTest.js";
import {AuthContext} from "../../context/AuthContext.jsx";
import axios from "axios";
import backendMessageStreamliner from "../../helpers/backendMessageStreamliner.js";

function Login() {

    const contextContent = useContext(AuthContext);
    const abortController = new AbortController();
    const [createAccountPage, toggleCreateAccountPage] = useState(false);
    const [formState, setFormState] = useState({
        username: "",
        password: "",
        email: "",
        signal: abortController.signal
    });
    const [repeatPassword, setRepeatPassword] = useState({password: "",});
    const [errorMessage, setErrorMessage] = useState(null);
    const [cleanupTrigger, toggleCleanupTrigger] = useState(false);

    // ----------Common functions-------------

    function handleChange(e) {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        })
    }

    useEffect(() => {
        return function cleanup() {
            abortController.abort();
        }
    }, [cleanupTrigger]);

    // ----------Login functions-------------

    async function userLogin() {
        const endpoint = "https://api.datavortex.nl/novibackendhicaf/users/authenticate";

        try {
            const response = await axios.post(endpoint, formState);
            void contextContent.logInHandler(formState.username, response.data.jwt);
        } catch (e) {
            console.error(e);
            if (e.response.data === "User not found" || e.response.data === "Invalid username/password") {
                setErrorMessage("Unknown username/password combination.")
            } else {
                setErrorMessage("Something went wrong. Please try again later.")
            }
        }
    }

    function handleLoginSubmit(e) {
        e.preventDefault();
        setErrorMessage("");
        void userLogin();
        toggleCleanupTrigger(!cleanupTrigger);
    }

    // ----------Create account functions-------------

    async function createAccount() {

        const endpoint = "https://api.datavortex.nl/novibackendhicaf/users";
        const apiKey = "novibackendhicaf:HxI8znYrdSresrrSUlRm";

        try {
            const response = await axios.post(endpoint, {
                username: formState.username,
                email: formState.email,
                password: formState.password,
                authorities: [
                    {authority: "USER"}
                ],
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': apiKey,
                },
                signal: abortController.signal,
            });
            console.log(response);
            if (response.data.username === formState.username && response.status === 200) {
                void userLogin();
            }
        } catch (e) {
            console.error(e)
            setErrorMessage(backendMessageStreamliner(e.response.data));
        }
    }

    function handleCreateAccountSubmit(e) {
        e.preventDefault();
        setErrorMessage(null);

        if (!formState.username || !formState.email || !formState.password) {
            setErrorMessage("Please fill in all fields")
        } else if (formState.username.length < 6) {
            setErrorMessage("Please enter a username of at least 6 characters long")
        } else {
            const passwordCheck = passwordStrengthTest(formState.password, formState.username);
            if (repeatPassword.password !== formState.password) {
                setErrorMessage("Please enter the same password twice.");
                console.log(repeatPassword);
                console.log(formState.password);
            } else if (passwordCheck !== formState.password) {
                setErrorMessage(passwordCheck);
            } else {
                void createAccount();
                toggleCleanupTrigger(!cleanupTrigger);
            }
        }
    }

    function handleChangeRepeatPassword(e) {
        setRepeatPassword({
            [e.target.name]: e.target.value,
        });
    }

// -------------------------UI------------------------

    function switchLoginCreateAccount() {
        toggleCreateAccountPage(!createAccountPage);
    }

    return (
        <>
            <div className={"login_page_wrapper"}>
                <div className={"login_page_content"}>
                    <img src={inlogImage} alt="Log in"/>

                    {!createAccountPage && <div className={"form_and_new_account_wrapper"}>

                        {errorMessage && <div className={"passwordError"}>
                            <h3>{errorMessage}</h3>
                        </div>}

                        <form onSubmit={handleLoginSubmit} className={"form"}>
                            <InputField
                                label={"Username:"}
                                type={"text"}
                                name={"username"}
                                value={formState.username}
                                onChange={handleChange}
                            />
                            <InputField
                                label={"Password:"}
                                type={"password"}
                                name={"password"}
                                value={formState.password}
                                onChange={handleChange}
                            />
                            <Button
                                type={"submit"}
                                text={"Log in"}
                                className={"small_button"}
                            />
                        </form>
                        <div className={"create_account_button_wrapper"}>
                            <h3>No account yet?</h3>
                            <Button
                                type={"button"}
                                text={"Create new account"}
                                className={"small_button"}
                                onClick={switchLoginCreateAccount}
                            />
                        </div>
                    </div>}

                    {createAccountPage && <div className={"form_and_new_account_wrapper"}>

                        {errorMessage && <div className={"passwordError"}>
                            <h3>{errorMessage}</h3>
                        </div>}

                        <form onSubmit={handleCreateAccountSubmit} className={"form"}>
                            <InputField
                                label={"Username:"}
                                type={"text"}
                                name={"username"}
                                value={formState.username}
                                onChange={handleChange}
                            />
                            <InputField
                                label={"Email:"}
                                type={"email"}
                                name={"email"}
                                value={formState.email}
                                onChange={handleChange}
                            />
                            <InputField
                                label={"Password:"}
                                type={"password"}
                                name={"password"}
                                value={formState.password}
                                onChange={handleChange}
                            />
                            <InputField
                                label={"Repeat password:"}
                                type={"password"}
                                name={"password"}
                                value={repeatPassword.password}
                                onChange={handleChangeRepeatPassword}
                            />
                            <Button
                                type={"submit"}
                                text={"Create account"}
                                className={"small_button"}
                            />
                        </form>
                        <div className={"create_account_button_wrapper"}>
                            <h3>Already have an account?</h3>
                            <Button
                                type={"button"}
                                text={"Go log in!"}
                                className={"small_button"}
                                onClick={switchLoginCreateAccount}
                            />
                        </div>
                    </div>}
                </div>
            </div>
        </>
    )
}

export default Login;