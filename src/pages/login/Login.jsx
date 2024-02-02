import "./Login.css";
import inlogImage from "../../assets/logo_inlog.png"
import InputField from "../../components/inputField/InputField.jsx";
import Button from "../../components/button/Button.jsx";
import {useState} from "react";

function Login() {

    const [createAccount, toggleCreateAccount] = useState(false);
    const [formState, setFormState] = useState({
        name: "",
        password: "",
    });

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

    function handleClick() {

    }

    return (
        <>
            <div className={"login_page_wrapper"}>
                <div className={"login_page_content"}>
                    <img src={inlogImage} alt="Log in"/>
                    <div className={"form_and_new_account_wrapper"}>
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

                            />
                        </div>
                    </div>
                </div>


            </div>
        </>

    )
}

export default Login;