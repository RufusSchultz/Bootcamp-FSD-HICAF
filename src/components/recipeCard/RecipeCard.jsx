import "./RecipeCard.css";
import arrayOrString from "../../helpers/arrayOrString.jsx";


function RecipeCard({title, image, link, ingredients, servings, source, cuisineType, mealType, dishType, diets, healthStuff }) {



    return(
        <li>
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
                            <h4>{arrayOrString(cuisineType)}</h4>
                            <h4>{arrayOrString(mealType)}</h4>
                        </div>
                        <div className={"recipe_identities"}>
                            <h4>{arrayOrString(dishType)}</h4>
                            <h4 id={"servings"}>{servings} servings</h4>
                        </div>
                        <div className={"recipe_ingredients_list"}>
                            {arrayOrString(ingredients)}
                        </div>
                    </div>
                </div>
                <div>
                    <details>
                        <summary className={"recipe_details_summary"}>Dietary, allergy and health details</summary>
                        <div className={"recipe_details"}>
                            <div className={"recipe_details_diet"}>
                                {arrayOrString(diets)}
                            </div>
                            <div className={"recipe_details_health"}>
                                {arrayOrString(healthStuff)}
                            </div>
                        </div>

                    </details>
                </div>
            </div>
        </li>

    )
}

export default RecipeCard;