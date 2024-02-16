import "./Favorites.css"
import {useContext, useEffect} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

function Favorites() {

    const contextContent = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!contextContent.isAuth) {
            navigate("/login");
        }
    }, []);


    return (
        <>
            {contextContent.isAuth && <div>

                <h1>Favos!</h1>

            </div>}
        </>
    )
}

export default Favorites;