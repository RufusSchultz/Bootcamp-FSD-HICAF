import "./Account.css";
import Button from "../../components/button/Button.jsx";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import favorites_img from "../../assets/favorites.png";
import settings_img from "../../assets/preferences.png";

function Account() {

    const contextContent = useContext(AuthContext);
    function handleLogOutClick(){
        contextContent.logOutHandler();
    }

    return (
        <div className={"account_page"}>
            <h2>Welcome, {contextContent.user.username}!</h2>
            <div className={"content_outer_container"}>
                <div className={"content_inner_container"}>
                    <img src={favorites_img} alt="Favorites"/>
                    <Button
                        className={"big_button"}
                        text={"Favorites"}
                    />
                </div>
                <div className={"content_inner_container"}>
                    <img src={settings_img} alt="Settings"/>
                    <Button
                        className={"big_button"}
                        text={"Settings"}
                    />
                </div>
            </div>
            <div className={"logout_button_wrapper"}>
                <h3>Want to log out?</h3>
                <Button
                    className={"small_button"}
                    text={"Click me!"}
                    onClick={handleLogOutClick}
                />
            </div>

        </div>
    )
}

export default Account;