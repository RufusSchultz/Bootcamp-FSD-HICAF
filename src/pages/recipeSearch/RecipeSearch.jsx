import "./RecipeSearch.css";
import fish from "../../constants/fishData.json";
import {useState} from "react";
import ContinentButton from "../../components/continentButton/ContinentButton.jsx";
import FishSearchForm from "../../components/fishSearchForm/FishSearchForm.jsx";

function RecipeSearch() {
    const [continent, setContinent] = useState("");
    const [fishQuery, setFishQuery] = useState("");

    return (
        <div className={"recipe_search_page"}>
            {!continent && <div>
                <h3>Where in the world did you catch your fish?</h3>
                <div className={"hemisphere_choice"}>
                    <ContinentButton
                        continent="North_America"
                    />
                    <ContinentButton
                        continent="Europe"
                    />
                    <ContinentButton
                        continent="Asia"
                    />
                </div>
                <div className={"hemisphere_choice"}>
                    <ContinentButton
                        continent="South_America"
                    />
                    <ContinentButton
                        continent="Africa"
                    />
                    <ContinentButton
                        continent="Australia"
                    />
                </div>
                <div className={"world_and_exact_choice_wrapper"}>
                    <div className={"world_choice"}>
                        <h3>Unsure about the continent? Click below</h3>
                        <ContinentButton
                            continent="World"
                        />
                    </div>
                    <div className={"exact_choice"}>
                        <h3>Or search here if you already know what fish you caught</h3>
                        <FishSearchForm />
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default RecipeSearch;