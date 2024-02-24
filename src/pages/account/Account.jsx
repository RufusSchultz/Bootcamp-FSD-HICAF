import "./Account.css";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import {UserContext} from "../../context/UserContext.jsx";
import Button from "../../components/button/Button.jsx";
import settings_img from "../../assets/preferences.png";
import favorites_img from "../../assets/favorites.png";

function Account() {

    const authContent = useContext(AuthContext);
    const userContent = useContext(UserContext);
    const navigate = useNavigate();
    const isAdmin = (e) => e.authority === "ADMIN"

    function handleLogOutClick() {
        authContent.logOutHandler();
    }

    useEffect(() => {
        void userContent.getUserData();
        if (!authContent.isAuth) {
            navigate("/login");
        }
    }, []);

    return (
        <>
            {authContent.isAuth && <div className={"account_outer_container"}>

                <div className={"account_outer_container"}>
                    <h1 id={"welcome_text"}>Welcome, {authContent.user.username}!</h1>
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
                    {authContent.user.authorities.some(isAdmin) && <div>
                        <Button
                            className={"big_button"}
                            text={"Admin portal"}
                            destination={"/admin"}
                        />
                    </div>}
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