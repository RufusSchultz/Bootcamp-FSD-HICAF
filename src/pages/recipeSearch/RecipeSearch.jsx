import "./RecipeSearch.css";
import fishes from "../../constants/fishData.json";
import {useEffect, useState} from "react";
import ContinentButton from "../../components/continentButton/ContinentButton.jsx";
import FishSearchForm from "../../components/fishSearchForm/FishSearchForm.jsx";
import FishCardButton from "../../components/fishCardButton/FishCardButton.jsx";
import underscoreRemover from "../../helpers/underscoreRemover.js";

function RecipeSearch() {
    const [continent, setContinent] = useState("");
    const [fishQuery, setFishQuery] = useState("");

    function handleContinentSetter(chosenContinent) {
        setContinent(chosenContinent);
    }

    function handleQuery(query) {
        setFishQuery(query);
    }

    useEffect(() => {
        console.log(fishQuery);
    }, [fishQuery]);

    return (
        <div className={"recipe_search_page"}>

            {/*First set of choices of the page.*/}
            {!continent && !fishQuery && <div>
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

            {/*Second set of choices of the page.*/}
            {continent && !fishQuery && <div>
                <div className={"second_set_container"}>
                    <h3>Random flattering stuff about {underscoreRemover(continent)}!</h3>
                    <h3 id={"what_fish"}>What fish did you catch?</h3>
                    <div className={"fish_choice_wrapper"}>
                        <ul className={"choice_buttons"}>
                            {fishes.filter(fish => {
                                if (fish.continents.includes(continent)){
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
                    <h3>Don't see your fish? Search by name here</h3>
                    <FishSearchForm sendQuery={handleQuery}/>
                </div>
            </div>}

            {/*Third stage of page: search results.*/}
            {fishQuery && <div>
                <h1>{fishQuery}</h1>
            </div>}

        </div>
    )
}

export default RecipeSearch;