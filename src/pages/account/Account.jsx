import "./Account.css";
import Button from "../../components/button/Button.jsx";
import {useContext, useEffect} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import favorites_img from "../../assets/favorites.png";
import settings_img from "../../assets/preferences.png";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../../context/UserContext.jsx";

function Account() {

    const contextContent = useContext(AuthContext);
    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    function handleLogOutClick() {
        contextContent.logOutHandler();
    }

    useEffect(() => {
        void userContext.getUserData();
        if (!contextContent.isAuth) {
            navigate("/login");
        }
    }, []);

    return (
        <>
            {contextContent.isAuth && <div className={"account_outer_container"}>

                <div className={"account_outer_container"}>
                    <h1 id={"welcome_text"}>Welcome, {contextContent.user.username}!</h1>
                    <div className={"content_outer_container"}>
                        <div className={"content_inner_container"}>
                            <img src={favorites_img} alt="Favorites"/>
                            <Button
                                className={"big_button"}
                                text={"Favorites"}
                                destination={"/account/favorites"}
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
                </div>
            </div>}
        </>
    )
}

export default Account;