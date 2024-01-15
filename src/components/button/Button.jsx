import "./Button.css";
import {useNavigate} from "react-router-dom";

function Button({text, label, destination}) {

    const navigate = useNavigate();

    function handleClick() {
        navigate(`${destination}`)
    }

    return (
        <div className={"button_wrapper"}>
            <label htmlFor={"button"}>{label}</label>
            <button type={"button"} id={"button"} className={"button"} onClick={handleClick}>{text}</button>
        </div>
    )
}

export default Button;