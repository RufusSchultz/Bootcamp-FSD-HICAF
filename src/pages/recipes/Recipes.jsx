import "./Recipes.css"
import {useEffect, useState} from "react";
import axios from "axios";


function Recipes() {
    const [recipes, setRecipes] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [loadingError, setLoadingError] = useState(false);

    useEffect(() => {
        const abortController = new AbortController();

        async function fetchRecipes() {
            try {
                setIsLoading(true);
                const result = await axios.get(`https://api.edamam.com/api/recipes/v2/${fishQuery}`, {})
                setRecipes(result);
            } catch (e) {
                console.error(e);
                setLoadingError(true)
            } finally {
                setIsLoading(false);
            }
        }

        fetchRecipes();

        return () => {
            abortController.abort();
        }
    }, []);


    return (
        <div>
            {isLoading && <div>
                <h1>Waiting for the database to bite...</h1>
            </div>}

            {loadingError && <div>
                <h1>Oops, failed to catch any data. Please try again.</h1>
            </div>}
        </div>
    )
}

export default Recipes;