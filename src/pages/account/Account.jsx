import "./Account.css";
import Button from "../../components/button/Button.jsx";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import favorites_img from "../../assets/favorites.png";
import settings_img from "../../assets/preferences.png";

function Account() {

    const contextContent = useContext(AuthContext);
    const [subpage, setSubpage] = useState("");

    function goToFavoritesSubpage() {
        setSubpage("favorites");
    }

    function handleLogOutClick() {
        contextContent.logOutHandler();
    }

    return (
        <div className={"account_outer_container"}>
            {subpage && <div className={"logout_button_wrapper"}>
                <Button
                    className={"small_button"}
                    text={"Click to log out"}
                    onClick={handleLogOutClick}
                />
            </div>}

            {!subpage && <div className={"account_outer_container"}>
                <h1 id={"welcome_text"}>Welcome, {contextContent.user.username}!</h1>
                <div className={"content_outer_container"}>
                    <div className={"content_inner_container"}>
                        <img src={favorites_img} alt="Favorites"/>
                        <Button
                            className={"big_button"}
                            text={"Favorites"}
                            onClick={goToFavoritesSubpage}
                        />
                    </div>
                    <div className={"content_inner_container"}>
                        <img src={settings_img} alt="Settings"/>
                        <Button
                            className={"big_button"}
                            text={"Settings"}
                            destination={"/account/settings"}
                        />
                    </div>
                </div>
                <Button
                    label={"Want to log out?"}
                    className={"small_button"}
                    text={"Click me!"}
                    onClick={handleLogOutClick}
                />
            </div>}

            {subpage === "favorites" && <div>
                <h1>Favorites</h1>
                <img src={favorites_img} alt="favorites"/>
                <Button
                    className={"big_button"}
                    text={"Go to settings"}
                    destination={"/account/settings"}
                />
            </div>}
        </div>
    )
}

export default Account;