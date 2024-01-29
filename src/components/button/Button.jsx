import "./Button.css";
import {useNavigate} from "react-router-dom";

function Button({text, label, destination, disabled, clickPurpose, type}) {

    const navigate = useNavigate();

    function handleClick(e) {
        e.preventDefault();
        if (clickPurpose === "navigate"){
            navigate(`${destination}`)
        }

    }

    function toggleHandleClick() {
        if (type === "submit") {
            return null;
        } else {
            return handleClick();
        }
    }

    return (
        <div className={"button_wrapper"}>
            <label htmlFor={"button"}>{label}</label>
            <button type={type}
                    id={"button"}
                    className={"button"}
                    onClick={toggleHandleClick}
                    disabled={disabled}
            >{text}</button>
        </div>
    )
}

export default Button;