import "./ContinentButton.css";

function ContinentButton({continent, setChosenContinent}) {

    function assignContinent() {
        {
            setChosenContinent(`${continent}`)
        }
    }

    return (
        <div>
            <button type={"button"}
                    className={continent === "Earth" ? "world_button" : "continent_button"}
            ><img src={`src/assets/continents/${continent}.png`}
                  alt={`${continent}`}
                  className={"continent_image"}
                  onClick={assignContinent}
            /></button>
        </div>
    )
}

export default ContinentButton;