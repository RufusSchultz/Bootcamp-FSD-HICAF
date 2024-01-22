import "./Button.css";
import {useNavigate} from "react-router-dom";

function Button({text, label, destination, disabled}) {

    const navigate = useNavigate();

    function handleClick() {
        navigate(`${destination}`)
    }

    return (
        <div className={"button_wrapper"}>
            <label htmlFor={"button"}>{label}</label>
            <button type={"button"}
                    id={"button"}
                    className={"button"}
                    onClick={handleClick}
                    disabled={disabled}
            >{text}</button>
        </div>
    )
}

export default Button;