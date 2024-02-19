import "./RecipeCard.css";
import arrayOrString from "../../helpers/arrayOrString.jsx";
import {useContext, useState} from "react";
import {ColorContext} from "../../context/ColorContext.jsx";
import noFavorite from "../../assets/open_star.png"
import yesFavorite from "../../assets/filled_star.png"
import noFavoriteAlternative from "../../assets/open_star_bright.png"
import {AuthContext} from "../../context/AuthContext.jsx";


function RecipeCard({title, image, link, ingredients, servings, source, cuisineType, mealType, dishType, diets, healthStuff, handleFavorite, favoriteId }) {

    const contextContent = useContext(AuthContext);
    const theme = useContext(ColorContext);
    const cardClass = `recipe_card_outer ${theme.continentColorClass}`
    const [favorite, toggleFavorite] = useState(false);

    function handleClick(){
        toggleFavorite(!favorite);
        handleFavorite(favorite, favoriteId)

    }

    return(
        <li>
            <div className={cardClass}>
                <div className={"recipe_header"}>
                    <h2>{title}</h2>
                    {contextContent.isAuth &&
                    <button onClick={handleClick} className={"favorite_toggle_button"}>
                        {theme.continentColorClass !== "no_continent" && <span>
                           {favorite
                               ? <img src={yesFavorite} alt="remove from favorites"/>
                               : <img src={noFavorite} alt="add to favorites"/>
                           }
                        </span>}
                        {theme.continentColorClass === "no_continent" && <span>
                            {favorite
                                ? <img src={yesFavorite} alt="remove from favorites"/>
                                : <img src={noFavoriteAlternative} alt="add to favorites"/>
                            }
                        </span>}

                    </button>
                    }
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