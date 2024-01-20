import "./Recipes.css";
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import RecipeCard from "../../components/recipeCard/RecipeCard.jsx";


function Recipes() {
    const [recipes, setRecipes] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const {id} = useParams();

    useEffect(() => {
        const abortController = new AbortController();

        const app_id = "c5ff97ab";
        const app_key = "53223ed5c12039e77b08fc5f130446ce";
        const endpoint = `https://api.edamam.com/api/recipes/v2?type=public&q=${id}&app_id=${app_id}&app_key=${app_key}&health=pescatarian&imageSize=REGULAR&field=uri&field=label&field=image&field=source&field=url&field=yield&field=dietLabels&field=healthLabels&field=ingredientLines&field=cuisineType&field=mealType&field=dishType&field=externalId`;

        async function fetchRecipes() {
            try {
                setIsLoading(true);
                const result = await axios.get(endpoint, {signal: abortController.signal,});
                setRecipes(result);
                setError("");
            } catch (e) {
                console.error(e);
                setError("Oops, failed to catch any data. Please try again.");
            } finally {
                setIsLoading(false);
            }
        }

        fetchRecipes();

        return () => {
            abortController.abort();
        }
    }, [id]);


    return (
        <div>
            {isLoading && <div className={"loading_status_message"}>
                <h1>Waiting for the database to bite...</h1>
            </div>}

            {error && <div className={"loading_status_message"}>
                <h1>{error}</h1>
            </div>}

            {recipes && <div className={"recipe_list_outer"}>

                    <RecipeCard
                        title={recipes.data.hits[0].recipe.label}
                        image={recipes.data.hits[0].recipe.image}
                        link={recipes.data.hits[0].recipe.url}
                        ingredients={recipes.data.hits[0].recipe.ingredientLines}
                        servings={recipes.data.hits[0].recipe.yield}
                        source={recipes.data.hits[0].recipe.source}
                        cuisineType={recipes.data.hits[0].recipe.cuisineType}
                        mealType={recipes.data.hits[0].recipe.mealType}
                        dishType={recipes.data.hits[0].recipe.dishType}
                        diets={recipes.data.hits[0].recipe.dietLabels}
                        healthStuff={recipes.data.hits[0].recipe.healthLabels}
                    />
            </div>}
        </div>
    )
}

export default Recipes;