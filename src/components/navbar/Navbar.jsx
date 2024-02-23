import "./Navbar.css";
import {NavLink} from "react-router-dom";
import headerLogo from "../../assets/HICAF_Nav_Logo.png";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";

function Navbar() {
    const contentContext = useContext(AuthContext);

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
                    {contentContext.isAuth
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