import "./Recipes.css";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import RecipeCard from "../../components/recipeCard/RecipeCard.jsx";
import Button from "../../components/button/Button.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";
import {UserContext} from "../../context/UserContext.jsx";


function Recipes() {
    const {id} = useParams();
    const contextContent = useContext(AuthContext);
    const userContext = useContext(UserContext);
    const userData = userContext.data;
    const abortController = new AbortController();

    const app_id = "c5ff97ab";
    const app_key = "53223ed5c12039e77b08fc5f130446ce";
    const originalEndpoint = `https://api.edamam.com/api/recipes/v2?type=public&q=${id}&app_id=${app_id}&app_key=${app_key}&imageSize=REGULAR&dishType=Biscuits%20and%20cookies&dishType=Bread&dishType=Condiments%20and%20sauces&dishType=Desserts&dishType=Main%20course&dishType=Pancake&dishType=Preps&dishType=Preserve&dishType=Salad&dishType=Sandwiches&dishType=Side%20dish&dishType=Soup&dishType=Starter&dishType=Sweets&field=uri&field=label&field=image&field=source&field=url&field=yield&field=dietLabels&field=healthLabels&field=ingredientLines&field=cuisineType&field=mealType&field=dishType&field=externalId`;
    const initialEndpoint = setEndpoint(originalEndpoint);

    const [recipes, setRecipes] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [nextEndpoint, setNextEndpoint] = useState("")
    const [resultEndpoints, setResultEndpoints] = useState([initialEndpoint]);
    const [isRandomized, toggleIsRandomized] = useState(false);
    const [foundResults, toggleFoundResults] = useState(false);

    const [cleanupTrigger, toggleCleanupTrigger] = useState(false);
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username")
    const backendEndpoint = `https://api.datavortex.nl/novibackendhicaf/users/${username}`;


//-----------------Search results and navigation-----------------//

    function setEndpoint(endpoint){
        if (contextContent.isAuth) {
            const filterString = userData.filters.join("");
            console.log(filterString);
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
                console.log(result);
                setRecipes(result.data);
                if (result.data._links.next) {
                    setNextEndpoint(`${result.data._links.next.href}`)
                }
                if (result.data.count > 0){
                    toggleFoundResults(true);
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

    function handleBackClick(e) {
        e.preventDefault()
        console.log("Back");
        resultEndpoints.pop();
        setResultEndpoints([...resultEndpoints]);
    }

    function handleNextClick(e) {
        e.preventDefault()
        console.log("Next");
        setResultEndpoints([...resultEndpoints, nextEndpoint]);
    }

    async function fetchRandomRecipe() {
        const randomEndpoint = initialEndpoint + "&random=true";

        try {
            setIsLoading(true);
            const result = await axios.get(randomEndpoint, {signal: abortController.signal,});
            setRecipes(result.data);
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

//-----------------Favorites-----------------//

    async function putNewFavoriteList(){
        const newInfo = JSON.stringify(userData);

        try {
            const response = await axios.put(backendEndpoint, {info: newInfo}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                signal: abortController.signal,
            });
            console.log(response);
            void userContext.getUserData();
        } catch (e) {
            console.error(e);
        }
    }

    function handleFavorite(favorite, favoriteId) {
        if (favorite === false) {
            const count = userData.favorites.push(`${favoriteId}`);
            void putNewFavoriteList();
            console.log("Added to favorites");
        } else {
            const index = userData.favorites.indexOf(favoriteId);
            const list = userData.favorites.splice(index, 1);
            void putNewFavoriteList();
            console.log("Removed from favorites");
        }
        toggleCleanupTrigger(!cleanupTrigger);
    }

    useEffect(() => {
        return function cleanup() {
            abortController.abort();
        }
    }, [cleanupTrigger]);

//-----------------UI-----------------//

    return (
        <div>
            {isLoading && <div className={"loading_status_message"}>
                <h1>Waiting for the database to bite...</h1>
            </div>}

            {error && <div className={"loading_status_message"}>
                <h1>{error}</h1>
            </div>}

            {foundResults && <div className={"recipe_list_outer"}>

                {!isRandomized && <h1>Here {recipes.count > 1 ? "are" : "is"} {recipes.count} {recipes.count > 1 ? "ideas" : "idea"} what to do with your fish</h1>}
                {isRandomized && <h1>Here is your inspiration</h1>}

                <div className={"browse_buttons"}>
                    {!isRandomized &&
                        <button type={"button"}
                                className={resultEndpoints[resultEndpoints.length - 1] === initialEndpoint ? "recipe_browse_button_disabled" : "recipe_browse_button"}
                                onClick={handleBackClick}
                                disabled={resultEndpoints[resultEndpoints.length - 1] === initialEndpoint}
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
                        />
                    </div>}
                    {contextContent.isAuth
                        ?  <Button
                            text={"Click here!"}
                            label={<h3>Want to manage your favorites or change your filters?</h3>}
                            destination={"/account"}
                            type={"button"}
                            className={"small_button"}
                        />
                        :  <Button
                            text={"Click here!"}
                            label={<h3>Want to save ideas as a favorite or use filters?</h3>}
                            destination={"/login"}
                            type={"button"}
                            className={"small_button"}
                        />
                    }
                    {!isRandomized &&
                        <button type={"button"}
                                className={!recipes._links.next ? "recipe_browse_button_disabled" : "recipe_browse_button"}
                                onClick={handleNextClick}
                                disabled={!recipes._links.next}
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
                                className={resultEndpoints[resultEndpoints.length - 1] === initialEndpoint ? "recipe_browse_button_disabled" : "recipe_browse_button"}
                                onClick={handleBackClick}
                                disabled={resultEndpoints[resultEndpoints.length - 1] === initialEndpoint}
                        >Previous page
                        </button>
                        <button type={"button"}
                                className={!recipes._links.next ? "recipe_browse_button_disabled" : "recipe_browse_button"}
                                onClick={handleNextClick}
                                disabled={!recipes._links.next}
                        >Next page
                        </button>
                    </div>}
            </div>}
            {!foundResults && <div className={"low_content_container"}>
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