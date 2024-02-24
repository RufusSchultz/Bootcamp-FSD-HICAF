import "./Admin.css";
import {useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.jsx";
import Button from "../../components/button/Button.jsx";

function Admin() {
    const authContent = useContext(AuthContext);
    const isAdmin = (e) => e.authority === "ADMIN"
    const navigate = useNavigate();

    useEffect(() => {
        if (!authContent.user.authorities.some(isAdmin)) {
            navigate("/");
        }
    }, []);

    function handleManageUsersClick() {
        console.log("With a suited backend, this would lead you to a userlist with options to edit them and whatnot.")
    }

    function handleMessagesClick() {
        console.log("With a suited backend, this would bring you to every message sent via the Contact page. You could also then delete or reply to them.")
    }

    function handleManageTestimonialsClick() {
        console.log("With a suited backend, this would bring you to a database where you could edit the testimonials visible on the homepage. The current version of the database is a simple JSON.")
    }

    function handleManageFishDatabaseClick() {
        console.log("With a suited backend, this would bring you to a database where you could edit the buttons with fishes on them on the recipeSearch page. The current version of the database is a simple JSON. You could also edit the images of the fish here.")
    }

    return (
        <div className={"admin_outer_container"}>
            <div>
                <h1>Admin Portal</h1>
            </div>
            <div className={"admin_buttons"}>
                <Button
                    className={"big_button"}
                    text={"Manage users"}
                    onClick={handleManageUsersClick}
                />
                <Button
                    className={"big_button"}
                    text={"Messages"}
                    onClick={handleMessagesClick}
                />
                <Button
                    className={"big_button"}
                    text={"Manage testimonials"}
                    onClick={handleManageTestimonialsClick}
                />
                <Button
                    className={"big_button"}
                    text={"Manage fish database"}
                    onClick={handleManageFishDatabaseClick}
                />
            </div>
            <div>
                <h3>Note: portal is currently not functional.</h3>
            </div>
        </div>
    )
}

export default Admin;