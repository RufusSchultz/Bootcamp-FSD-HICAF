import "./RecipeSearch.css";
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ColorContext} from "../../context/ColorContext.jsx";
import ContinentButton from "../../components/continentButton/ContinentButton.jsx";
import FishSearchForm from "../../components/fishSearchForm/FishSearchForm.jsx";
import FishCardButton from "../../components/fishCardButton/FishCardButton.jsx";
import underscoreRemover from "../../helpers/underscoreRemover.js";
import randomFlatteringSentence from "../../helpers/randomFlatteringSentence.js";
import fishes from "../../constants/fishData.json";

function RecipeSearch() {

    const navigate = useNavigate();
    const colorContent = useContext(ColorContext);
    const [continent, setContinent] = useState("");
    const [fishQuery, setFishQuery] = useState("");

    useEffect(() => {
        if (fishQuery) {
            navigate(`/recipeSearch/${fishQuery}`);
        }
    }, [fishQuery]);

    function handleContinentSetter(chosenContinent) {
        setContinent(chosenContinent);
        colorContent.continentColorSetter(chosenContinent.toLowerCase());
    }

    function handleQuery(query) {
        setFishQuery(query);
    }

    return (
        <div className={"recipe_search_page"}>

            {!continent && <div>
                <h3>Where in the world did you catch your fish?</h3>
                <div className={"hemisphere_choice"}>
                    <ContinentButton
                        continent="North_America"
                        setChosenContinent={handleContinentSetter}
                    />
                    <ContinentButton
                        continent="Europe"
                        setChosenContinent={handleContinentSetter}
                    />
                    <ContinentButton
                        continent="Asia"
                        setChosenContinent={handleContinentSetter}
                    />
                </div>
                <div className={"hemisphere_choice"}>
                    <ContinentButton
                        continent="South_America"
                        setChosenContinent={handleContinentSetter}
                    />
                    <ContinentButton
                        continent="Africa"
                        setChosenContinent={handleContinentSetter}
                    />
                    <ContinentButton
                        continent="Australia"
                        setChosenContinent={handleContinentSetter}
                    />
                </div>
                <div className={"world_and_exact_choice_wrapper"}>
                    <div className={"world_choice"}>
                        <h3>Unsure about the continent? Click below</h3>
                        <ContinentButton
                            continent="Earth"
                            setChosenContinent={handleContinentSetter}
                        />
                    </div>
                    <div className={"exact_choice"}>
                        <h3>Or search here if you already know what fish you caught</h3>
                        <FishSearchForm sendQuery={handleQuery}/>
                    </div>
                </div>
            </div>}

            {continent && <div>
                <div className={"second_set_container"}>
                    <div>
                        <h3>{randomFlatteringSentence(underscoreRemover(continent))}</h3>
                        <h3>What fish did you catch?</h3>
                    </div>
                    <div className={"fish_choice_wrapper"}>
                        <ul className={"choice_buttons_and_cards"}>
                            {fishes.filter(fish => {
                                if (fish.continents.includes(continent)) {
                                    return fish;
                                }
                            }).map((fish) => {
                                return <FishCardButton
                                    key={fish.id}
                                    image={fish.img}
                                    name={fish.name}
                                    theme={continent}
                                    sendQuery={handleQuery}
                                />
                            })}
                        </ul>
                    </div>
                    <h3>Don&apos;t see your fish? Search by name here</h3>
                    <FishSearchForm sendQuery={handleQuery}/>
                </div>
            </div>}
        </div>
    )
}

export default RecipeSearch;