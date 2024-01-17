import "./RecipeSearch.css";
import fishes from "../../constants/fishData.json";
import {useEffect, useState} from "react";
import ContinentButton from "../../components/continentButton/ContinentButton.jsx";
import FishSearchForm from "../../components/fishSearchForm/FishSearchForm.jsx";

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
                            continent="World"
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
            {continent && <div>
                <div>
                    <ul>
                        {fishes.filter(fish => {
                                if (fish.continents.includes(continent)){
                                    return fish;
                                }
                        }).map((fish) => {
                            return <li key={fish.id}>
                                <img src={fish.img} alt=""/>
                                <h3>{fish.name}</h3>
                            </li>
                        })}
                    </ul>
                </div>
            </div>}

        </div>
    )
}

export default RecipeSearch;