import "./FavoriteRecipe.css";
import {useContext, useEffect, useState} from "react";
import {ColorContext} from "../../context/ColorContext.jsx";
import axios from "axios";
import RecipeCard from "../recipeCard/RecipeCard.jsx";

function FavoriteRecipe({favoriteURI, favoritesList, handleFavorite}) {
    const abortController = new AbortController();
    const [favoriteRecipe, setFavoriteRecipe] = useState({});
    const [loadingStatus, setLoadingStatus] = useState("")
    const colorContent = useContext(ColorContext);

    useEffect(() => {
        async function fetchFavoriteRecipe() {
            setLoadingStatus("...loading")
            try {
                const response = await axios.get(favoriteURI, {signal: abortController.signal});
                setFavoriteRecipe(response.data);
                colorContent.continentColorSetter("");
                setLoadingStatus("done")
            } catch (e) {
                console.error(e);
                setLoadingStatus("loading failed")
            }
        }

        void fetchFavoriteRecipe();

        return () => {
            abortController.abort();
        }
    }, []);

    return (
        <div>
            {loadingStatus !== "done" && <div>
                <h3>{loadingStatus}</h3>
            </div>}

            {loadingStatus === "done" &&
                <RecipeCard
                    key={favoriteRecipe._links.self.href}
                    favoriteId={favoriteRecipe._links.self.href}
                    title={favoriteRecipe.recipe.label}
                    image={favoriteRecipe.recipe.image}
                    link={favoriteRecipe.recipe.url}
                    ingredients={favoriteRecipe.recipe.ingredientLines}
                    servings={favoriteRecipe.recipe.yield}
                    source={favoriteRecipe.recipe.source}
                    cuisineType={favoriteRecipe.recipe.cuisineType}
                    mealType={favoriteRecipe.recipe.mealType}
                    dishType={favoriteRecipe.recipe.dishType}
                    diets={favoriteRecipe.recipe.dietLabels}
                    healthStuff={favoriteRecipe.recipe.healthLabels}
                    handleFavorite={handleFavorite}
                    favoritesList={favoritesList}
                />}
        </div>
    )
}

export default FavoriteRecipe;