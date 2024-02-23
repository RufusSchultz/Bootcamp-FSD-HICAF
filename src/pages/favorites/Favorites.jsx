import "./Favorites.css"
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import favorites_img from "../../assets/favorites.png";
import Button from "../../components/button/Button.jsx";
import {UserContext} from "../../context/UserContext.jsx";
import axios from "axios";
import FavoriteRecipe from "../../components/favoriteRecipe/FavoriteRecipe.jsx";

function Favorites() {

    const contextContent = useContext(AuthContext);
    const userContext = useContext(UserContext);
    const navigate = useNavigate();
    const abortController = new AbortController();

    const [cleanupTrigger, toggleCleanupTrigger] = useState(false);
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username")
    const backendEndpoint = `https://api.datavortex.nl/novibackendhicaf/users/${username}`;
    const userData = userContext.data;

    useEffect(() => {
        if (!contextContent.isAuth) {
            navigate("/login");
        }
    }, []);

    function handleLogOutClick() {
        contextContent.logOutHandler();
    }

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

    return (
        <>
            {contextContent.isAuth && <div className={"favorites_outer_container"}>
                <div className={"logout_button_wrapper"}>
                    <Button
                        className={"small_button"}
                        text={"Click to log out"}
                        onClick={handleLogOutClick}
                    />
                </div>
                <div className={"favorites_mini_header"}>
                    <h1>Favorites</h1>
                    <img src={favorites_img} alt="favorites"/>
                    <Button
                        className={"big_button"}
                        text={"Go to settings"}
                        destination={"/account/settings"}
                    />
                </div>
                <div>
                    {!userData.favorites.length > 0 && <div className={"empty_favorites_section"}>
                        <h2>No favorites yet.</h2>
                        <Button
                            className={"big_button"}
                            text={"Go find some!"}
                            destination={"/recipeSearch"}
                        />
                    </div>}

                    {userData.favorites.length > 0 && <div>
                        <ul className={"choice_buttons_and_cards"}>
                            {userData.favorites.map((favorite) => {
                                return <FavoriteRecipe
                                    key={favorite}
                                    favoriteURI={favorite}
                                    favoritesList={userData.favorites}
                                    handleFavorite={handleFavorite}
                                />
                            })}
                        </ul>


                    </div>}

                </div>

            </div>}
        </>
    )
}

export default Favorites;