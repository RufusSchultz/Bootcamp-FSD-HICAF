import "./ContinentButton.css";
function ContinentButton({ continent, setChosenContinent }) {

    function assignContinent() {
        {setChosenContinent(`${continent}`)}
    }

    return(
        <div className={"continent_button_wrapper"}>
            <button type={"button"}
                    className={continent === "Earth" ? "world_button" : "continent_button"}
            ><img src={`src/assets/continents/${continent}.png`}
                  alt={`${continent}`}
                  onClick={assignContinent}
            /></button>
        </div>
    )
}

export default ContinentButton;