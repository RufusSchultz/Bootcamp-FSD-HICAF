import "./Navbar.css";
import {useContext} from "react";
import {NavLink} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.jsx";
import headerLogo from "../../assets/HICAF_Nav_Logo.png";

function Navbar() {

    const authContent = useContext(AuthContext);

    return (
        <div className={"navbar"}>
            <img src={headerLogo} alt="hicaf logo"/>
            <nav>
                <ul className={"navigation_list"}>
                    <li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                 to="/">Home</NavLink></li>
                    <li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                 to="/recipeSearch">RecipeSearch</NavLink></li>
                    <li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                 to="/contact">Contact</NavLink></li>
                    {authContent.isAuth
                        ? <li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                       to="/account">Account / Log out</NavLink></li>
                        : <li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                       to="/login">Log in / New User</NavLink></li>
                    }
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;