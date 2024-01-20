import "./RecipeCard.css";
import arrayOrH4 from "../../helpers/arrayOrH4.jsx";


function RecipeCard({title, image, link, ingredients, servings, source, cuisineType, mealType, dishType, diets, healthStuff }) {



    return(
        <div className={"recipe_card_outer"}>
            <div className={"recipe_header"}>
                <h2>{title}</h2>
            </div>
            <div className={"recipe_card_inner"}>
                <div className={"recipe_card_left"}>
                    <span className={"recipe_card_image_wrapper"}>
                        <img src={image} alt=""/>
                    </span>
                    <h4>{source}</h4>
                    <button onClick={()=>window.open(`${link}`, '_blank')} className={"full_recipe_button"}>click here for full recipe</button>
                </div>
                <div className={"recipe_card_right"}>
                    <div className={"recipe_identities"}>
                        {arrayOrH4(cuisineType)}
                        {arrayOrH4(mealType)}
                    </div>
                    <div className={"recipe_identities"}>
                        {arrayOrH4(dishType)}
                        <h4>{servings} servings</h4>
                    </div>
                    <div className={"recipe_ingredients_list"}>
                        {arrayOrH4(ingredients)}
                    </div>
                </div>
            </div>
            <div>
                <details>
                    <summary className={"recipe_details_summary"}>Dietary, allergy and health details</summary>
                    <div className={"recipe_details"}>
                        <div className={"recipe_details_diet"}>
                            {arrayOrH4(diets)}
                        </div>
                        <div className={"recipe_details_health"}>
                            {arrayOrH4(healthStuff)}
                        </div>
                    </div>

                </details>
            </div>
        </div>
    )
}

export default RecipeCard;