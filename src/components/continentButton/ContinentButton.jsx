import "./ContinentButton.css"
function ContinentButton({ continent }) {

    function tempFunction() {
        console.log("Klik");
    }

    return(
        <div className={"continent_button_wrapper"}>
            <button type={"button"}
                    className={continent === "World" ? "world_button" : "continent_button"}
            ><img src={`src/assets/continents/${continent}.png`}
                  alt={`${continent}`}
                  onClick={tempFunction}
            /></button>
        </div>
    )
}

export default ContinentButton;