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
    const abortController = new AbortController();
    // dit moet nog naar een context
    const app_id = "c5ff97ab";
    const app_key = "53223ed5c12039e77b08fc5f130446ce";
    const initialEndpoint = `https://api.edamam.com/api/recipes/v2?type=public&q=${id}&app_id=${app_id}&app_key=${app_key}&health=pescatarian&imageSize=REGULAR&dishType=Biscuits%20and%20cookies&dishType=Bread&dishType=Condiments%20and%20sauces&dishType=Desserts&dishType=Main%20course&dishType=Pancake&dishType=Preps&dishType=Preserve&dishType=Salad&dishType=Sandwiches&dishType=Side%20dish&dishType=Soup&dishType=Starter&dishType=Sweets&field=uri&field=label&field=image&field=source&field=url&field=yield&field=dietLabels&field=healthLabels&field=ingredientLines&field=cuisineType&field=mealType&field=dishType&field=externalId`;

    const [recipes, setRecipes] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [nextEndpoint, setNextEndpoint] = useState("")
    const [resultEndpoints, setResultEndpoints] = useState([initialEndpoint]);

    const [cleanupTrigger, toggleCleanupTrigger] = useState(false);
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username")
    const backendEndpoint = `https://api.datavortex.nl/novibackendhicaf/users/${username}`;
    const userData = userContext.data;

//-----------------Search results and navigation-----------------//

    useEffect(() => {

        const endpoint = resultEndpoints[resultEndpoints.length - 1];

        async function fetchRecipes() {
            try {
                setIsLoading(true);
                const result = await axios.get(endpoint, {signal: abortController.signal,});
                setRecipes(result.data);
                if (result.data._links.next) {
                    setNextEndpoint(`${result.data._links.next.href}`)
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
// Recipes.jsx
//-----------------Favorites-----------------//

    // const userContext = useContext(UserContext);
    // const [cleanupTrigger, toggleCleanupTrigger] = useState(false);
    // const token = localStorage.getItem("token");
    // const username = localStorage.getItem("username")
    // const backendEndpoint = `https://api.datavortex.nl/novibackendhicaf/users/${username}`;
    // const userData = userContext.data;

    async function putNewFavoriteList(){
        const newInfo = JSON.stringify(userData);
        console.log(userData);
        console.log(newInfo);
        console.log(`String length: ${newInfo.length}`);

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
            console.log(userData.favorites);
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

            {recipes && <div className={"recipe_list_outer"}>

                <h2>Here are {recipes.count} ideas what to do with your fish</h2>

                <div className={"browse_buttons"}>
                    <button type={"button"}
                            className={resultEndpoints[resultEndpoints.length - 1] === initialEndpoint ? "recipe_browse_button_disabled" : "recipe_browse_button"}
                            onClick={handleBackClick}
                            disabled={resultEndpoints[resultEndpoints.length - 1] === initialEndpoint}
                    >Previous page
                    </button>
                    {contextContent.isAuth
                        ?  <Button
                            text={"Click here!"}
                            label={<h3>Want to manage your favorites?</h3>}
                            destination={"/account/favorites"}
                            type={"button"}
                            className={"small_button"}
                        />
                        :  <Button
                            text={"Click here!"}
                            label={<h3>Want to save ideas as a favorite?</h3>}
                            destination={"/login"}
                            type={"button"}
                            className={"small_button"}
                        />
                    }
                    <button type={"button"}
                            className={!recipes._links.next ? "recipe_browse_button_disabled" : "recipe_browse_button"}
                            onClick={handleNextClick}
                            disabled={!recipes._links.next}
                    >Next page
                    </button>
                </div>

                <div className={"search_result"}>
                    <ul className={"choice_buttons_and_cards"}>
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
                    </ul>
                </div>

                <div className={"browse_buttons"}>
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
                </div>
            </div>}
        </div>
    )
}

export default Recipes;