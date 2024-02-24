import "./Button.css";
import {useNavigate} from "react-router-dom";

function Button({text, label, destination, disabled, type, className, onClick, id}) {

    const navigate = useNavigate();

    function HandleClick() {
        if (type === "submit") {
            return null;
        } else if (destination !== undefined) {
            navigate(`${destination}`);
        } else {
            {
                onClick();
            }
        }
    }

    return (
        <div className={"button_wrapper"}>
            <label htmlFor={id}>{label}</label>
            <button type={type}
                    id={id}
                    className={className}
                    onClick={HandleClick}
                    disabled={disabled}
            >{text}</button>
        </div>
    )
}

export default Button;