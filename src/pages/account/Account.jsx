import "./Account.css";
import Button from "../../components/button/Button.jsx";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";

function Account() {

    const contextContent = useContext(AuthContext);
    function handleLogOutClick(){
        contextContent.logOutHandler();
    }

    console.log(contextContent.user);

    return (
        <>
            <h1>Account paginaaaaaaaaaaaaaaa</h1>
            <Button
                className={"big_button"}
                text={"Log out"}
                onClick={handleLogOutClick}
            />
        </>
    )
}

export default Account;