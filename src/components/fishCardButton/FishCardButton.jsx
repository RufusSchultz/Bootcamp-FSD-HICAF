import "./FishCardButton.css";

function FishCardButton({image, name, theme, sendQuery}) {

    function handleClick() {
        sendQuery(`${name}`);
    }


    return (
            <li>
                <button className={`card_button ${theme.toLowerCase()}`}
                        onClick={handleClick}>
                    <div className={"card_button_image_wrapper"}>
                        <img src={image} alt={name} className={"card_button_image"}/>
                    </div>
                    <span className={"card_button_title"}>{name}</span>
                </button>

            </li>
    )
}

export default FishCardButton;