import "./Recipes.css";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import {UserContext} from "../../context/UserContext.jsx";
import {useParams} from "react-router-dom";
import axios from "axios";
import RecipeCard from "../../components/recipeCard/RecipeCard.jsx";
import Button from "../../components/button/Button.jsx";

function Recipes() {

    const {id} = useParams();
    const authContent = useContext(AuthContext);
    const userContent = useContext(UserContext);
    const userData = userContent.data;
    const abortController = new AbortController();

    //--- Edamam API - Search queries ---//
    const app_id = "c5ff97ab";
    const app_key = "53223ed5c12039e77b08fc5f130446ce";
    const originalEndpoint = `https://api.edamam.com/api/recipes/v2?type=public&q=${id}&app_id=${app_id}&app_key=${app_key}&imageSize=REGULAR&dishType=Biscuits%20and%20cookies&dishType=Bread&dishType=Condiments%20and%20sauces&dishType=Desserts&dishType=Main%20course&dishType=Pancake&dishType=Preps&dishType=Preserve&dishType=Salad&dishType=Sandwiches&dishType=Side%20dish&dishType=Soup&dishType=Starter&dishType=Sweets&field=uri&field=label&field=image&field=source&field=url&field=yield&field=dietLabels&field=healthLabels&field=ingredientLines&field=cuisineType&field=mealType&field=dishType&field=externalId`;
    const initialEndpoint = setEndpoint(originalEndpoint);

    //--- Novi backend - Adding and removing favorites ---//
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const userEndpoint = `https://api.datavortex.nl/novibackendhicaf/users/${username}`;

    //--- States ---//
    const [recipes, setRecipes] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [nextEndpoint, setNextEndpoint] = useState("");
    const [resultEndpoints, setResultEndpoints] = useState([initialEndpoint]);
    const [isRandomized, toggleIsRandomized] = useState(false);
    const [foundRecipes, toggleFoundRecipes] = useState(false);
    const [cleanupTrigger, toggleCleanupTrigger] = useState(false);

//----------------- Search results -----------------//

    function setEndpoint(endpoint){
        if (authContent.isAuth) {
            const filterString = userData.filters.join("");
            return endpoint + filterString;
        } else {
            return endpoint;
        }
    }

    useEffect(() => {

        const endpoint = resultEndpoints[resultEndpoints.length - 1];

        async function fetchRecipes() {

            try {
                setIsLoading(true);
                const result = await axios.get(endpoint, {signal: abortController.signal,});
                setRecipes(result.data);
                if (result.data._links.next) {
                    setNextEndpoint(`${result.data._links.next.href}`);
                }
                if (result.data.count > 0){
                    toggleFoundRecipes(true);
                }
                setError("");
            } catch (e) {
                console.error(e);
                setError("Oops, failed to catch any data. Please try again.");
            } finally {
                setIsLoading(false);
            }
        }

        void fetchRecipes();

        return () => {
            abortController.abort();
        }
    }, [resultEndpoints]);


    async function fetchRandomRecipe() {

        const randomEndpoint = initialEndpoint + "&random=true";

        try {
            setIsLoading(true);
            const result = await axios.get(randomEndpoint, {signal: abortController.signal,});
            setRecipes(result.data);
            if (result.data.count > 0){
                toggleFoundRecipes(true);
            }
            setError("");
        } catch (e) {
            console.error(e);
            setError("Oops, failed to catch any data. Please try again.");
        } finally {
            setIsLoading(false);
            toggleIsRandomized(true);
        }
    }

    function getRandomRecipe() {
        void fetchRandomRecipe();
        toggleCleanupTrigger(!cleanupTrigger);
    }

//----------------- Favorites -----------------//

    async function putNewFavoriteList(){

        const newInfo = JSON.stringify(userData);

        try {
            const response = await axios.put(userEndpoint, {info: newInfo}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                signal: abortController.signal,
            });
            if (response.status === 204){
                console.log("Favorites updated");
            }
            void userContent.getUserData();
        } catch (e) {
            console.error(e);
        }
    }

    function handleFavorite(favorite, favoriteId) {

        if (favorite === false) {
            const count = userData.favorites.push(`${favoriteId}`);
            void putNewFavoriteList();
        } else {
            const index = userData.favorites.indexOf(favoriteId);
            const list = userData.favorites.splice(index, 1);
            void putNewFavoriteList();
        }
        toggleCleanupTrigger(!cleanupTrigger);
    }

    useEffect(() => {
        return function cleanup() {
            abortController.abort();
        }
    }, [cleanupTrigger]);

//----------------- Navigation -----------------//

    function handleBackClick(e) {
        e.preventDefault();
        resultEndpoints.pop();
        setResultEndpoints([...resultEndpoints]);
    }

    function isBackDisabled() {
        return resultEndpoints[resultEndpoints.length - 1] === initialEndpoint;
    }

    function setBackClassname() {
        if (resultEndpoints[resultEndpoints.length - 1] === initialEndpoint) {
            return "recipe_browse_button_disabled";
        } else {
            return "recipe_browse_button";
        }
    }

    function handleNextClick(e) {
        e.preventDefault();
        setResultEndpoints([...resultEndpoints, nextEndpoint]);
    }

    function isNextDisabled() {
        return !recipes._links.next;
    }

    function setNextClassname() {
        if (!recipes._links.next) {
            return "recipe_browse_button_disabled";
        } else {
            return "recipe_browse_button";
        }
    }


//-----------------UI-----------------//

    return (
        <div>
            {isLoading && <div className={"loading_status_message"}>
                <h1>Waiting for the database to bite...</h1>
            </div>}

            {error && <div className={"loading_status_message"}>
                <h1>{error}</h1>
            </div>}

            {foundRecipes && <div className={"recipe_list_outer"}>

                {!isRandomized && <h1>Here {recipes.count > 1 ? `are ${recipes.count} ideas` : `is ${recipes.count} idea`} what to do with your fish</h1>}
                {isRandomized && <h1>Here is your inspiration</h1>}

                <div className={"browse_buttons"}>
                    {!isRandomized &&
                        <button type={"button"}
                                className={setBackClassname()}
                                onClick={handleBackClick}
                                disabled={isBackDisabled()}
                                id={"top_back_button"}
                        >Previous page
                        </button>
                    }

                    {recipes.count > 1 && !isRandomized && <div>
                        <Button
                            text={"Get a random idea!"}
                            label={<h3>Too much choice?</h3>}
                            type={"button"}
                            className={"small_button"}
                            onClick={getRandomRecipe}
                            id={"random_result_button"}
                        />
                    </div>}

                    {authContent.isAuth
                        ?  <Button
                            text={"Click here!"}
                            label={<h3>Want to manage your favorites or change your filters?</h3>}
                            destination={"/account"}
                            type={"button"}
                            className={"small_button"}
                            id={"account_button"}
                        />
                        :  <Button
                            text={"Click here!"}
                            label={<h3>Want to save ideas as a favorite or use filters?</h3>}
                            destination={"/login"}
                            type={"button"}
                            className={"small_button"}
                            id={"account_button"}
                        />
                    }

                    {!isRandomized &&
                        <button type={"button"}
                                className={setNextClassname()}
                                onClick={handleNextClick}
                                disabled={isNextDisabled()}
                                id={"top_next_button"}
                        >Next page
                        </button>
                    }
                </div>

                <div className={"search_result"}>
                    {!isRandomized && <ul className={"choice_buttons_and_cards"}>
                        {recipes.hits.map((hit) => {
                            return <RecipeCard
                                key={hit._links.self.href}
                                favoriteId={hit._links.self.href}
                                title={hit.recipe.label}
                                image={hit.recipe.image}
                                link={hit.recipe.url}
                                ingredients={hit.recipe.ingredientLines}
                                servings={hit.recipe.yield}
                                source={hit.recipe.source}
                                cuisineType={hit.recipe.cuisineType}
                                mealType={hit.recipe.mealType}
                                dishType={hit.recipe.dishType}
                                diets={hit.recipe.dietLabels}
                                healthStuff={hit.recipe.healthLabels}
                                handleFavorite={handleFavorite}
                                favoritesList={userData.favorites}
                            />
                        })}
                    </ul>}

                    {isRandomized && <div className={"choice_buttons_and_cards"}>
                        <RecipeCard
                            key={recipes.hits[0]._links.self.href}
                            favoriteId={recipes.hits[0]._links.self.href}
                            title={recipes.hits[0].recipe.label}
                            image={recipes.hits[0].recipe.image}
                            link={recipes.hits[0].recipe.url}
                            ingredients={recipes.hits[0].recipe.ingredientLines}
                            servings={recipes.hits[0].recipe.yield}
                            source={recipes.hits[0].recipe.source}
                            cuisineType={recipes.hits[0].recipe.cuisineType}
                            mealType={recipes.hits[0].recipe.mealType}
                            dishType={recipes.hits[0].recipe.dishType}
                            diets={recipes.hits[0].recipe.dietLabels}
                            healthStuff={recipes.hits[0].recipe.healthLabels}
                            handleFavorite={handleFavorite}
                            favoritesList={userData.favorites}
                        />
                    </div>}
                </div>

                {!isRandomized && <div className={"browse_buttons"}>
                        <button type={"button"}
                                className={setBackClassname()}
                                onClick={handleBackClick}
                                disabled={isBackDisabled()}
                        >Previous page
                        </button>
                        <button type={"button"}
                                className={setNextClassname()}
                                onClick={handleNextClick}
                                disabled={isNextDisabled()}
                        >Next page
                        </button>
                    </div>}
            </div>}

            {!foundRecipes && <div className={"low_content_container"}>
                <h1>Found no ideas at all</h1>
                <h3>Perhaps the recipes or no longer available.</h3>
                <Button
                    text={"Click to try again"}
                    destination={"/recipeSearch"}
                    type={"button"}
                    className={"big_button"}
                />
            </div>}
        </div>
    )
}

export default Recipes;