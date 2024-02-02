import "./Button.css";
import {useNavigate} from "react-router-dom";

function Button({text, label, destination, disabled, type, className}) {

    const navigate = useNavigate();

    function HandleClick() {
        if (type === "submit") {
            return null;
        } else if (destination !== null){
            navigate(`${destination}`)
        } else if (onClick === onClick){
            onClick;
        }
    }

    return (
        <div className={"button_wrapper"}>
            <label htmlFor={"button"}>{label}</label>
            <button type={type}
                    id={"button"}
                    className={className}
                    onClick={HandleClick}
                    disabled={disabled}
            >{text}</button>
        </div>
    )
}

export default Button;