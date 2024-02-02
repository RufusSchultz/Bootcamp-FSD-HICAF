import "./Login.css";
import inlogImage from "../../assets/logo_inlog.png"
import InputField from "../../components/inputField/InputField.jsx";
import Button from "../../components/button/Button.jsx";
import {useState} from "react";
import passwordStrengthTest from "../../helpers/passwordStrengthTest.js";

function Login() {

    const [createAccount, toggleCreateAccount] = useState(false);
    const [formState, setFormState] = useState({
        name: "",
        password: "",
        email: "",
    });
    const [passwordError, setPasswordError] = useState(null);

    function handleChange(e) {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        })
    }

    function handleLogin(e) {
        e.preventDefault()
        console.log(formState);
    }

    function handleCreateAccount(e) {
        e.preventDefault();
        setPasswordError(null);
        if (!formState.name || !formState.email || !formState.password) {
            setPasswordError("Please fill in all fields.")
        } else {
            const passwordCheck = passwordStrengthTest(formState.password, formState.name);
            if (passwordCheck !== formState.password) {
                setPasswordError(passwordCheck);
            } else {
                console.log(formState);
            }
        }


    }

    function handleCreateNewAccountClick() {
        toggleCreateAccount(true);
    }

    return (
        <>
            <div className={"login_page_wrapper"}>
                <div className={"login_page_content"}>
                    <img src={inlogImage} alt="Log in"/>

                    {!createAccount && <div className={"form_and_new_account_wrapper"}>
                        <form onSubmit={handleLogin} className={"form"}>
                            <InputField
                                label={"Username:"}
                                type={"text"}
                                name={"name"}
                                value={formState.name}
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
                                onClick={handleCreateNewAccountClick}
                            />
                        </div>
                    </div>}

                    {createAccount && <div className={"form_and_new_account_wrapper"}>

                        {passwordError && <div className={"passwordError"}>
                            <h3>{passwordError}</h3>
                        </div>}

                        <form onSubmit={handleCreateAccount} className={"form"}>
                            <InputField
                                label={"Username:"}
                                type={"text"}
                                name={"name"}
                                value={formState.name}
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
                            <Button
                                type={"submit"}
                                text={"Create account"}
                                className={"small_button"}
                            />
                        </form>
                    </div>}
                </div>


            </div>
        </>

    )
}

export default Login;