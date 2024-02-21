import "./Favorites.css"
import {useContext, useEffect} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import favorites_img from "../../assets/favorites.png";
import Button from "../../components/button/Button.jsx";
import {UserContext} from "../../context/UserContext.jsx";

function Favorites() {

    const contextContent = useContext(AuthContext);
    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!contextContent.isAuth) {
            navigate("/login");
        }
    }, []);

    function handleLogOutClick() {
        contextContent.logOutHandler();
    }

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
                    {console.log(userContext.data)}
                </div>

            </div>}
        </>
    )
}

export default Favorites;