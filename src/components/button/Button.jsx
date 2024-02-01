import "./Button.css";
import {useNavigate} from "react-router-dom";

function Button({text, label, destination, disabled, type}) {

    const navigate = useNavigate();

    function HandleClick() {
        if (type === "submit") {
            return null;
        } else {
            navigate(`${destination}`)
        }
    }

    return (
        <div className={"button_wrapper"}>
            <label htmlFor={"button"}>{label}</label>
            <button type={type}
                    id={"button"}
                    className={"button"}
                    onClick={HandleClick}
                    disabled={disabled}
            >{text}</button>
        </div>
    )
}

export default Button;