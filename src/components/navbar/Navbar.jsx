import "./Navbar.css";
import {NavLink} from "react-router-dom";
import headerLogo from "../../assets/HICAF_Nav_Logo.png";

function Navbar() {
    return(
        <div className={"navbar"}>
            <img src={headerLogo} alt="hicaf logo"/>
            <nav>
                <ul className={"navigation_list"}>
                    <li><NavLink className={({ isActive }) => isActive ? 'active-menu-link' : 'default-menu-link'} to="/">Home</NavLink></li>
                    <li><NavLink className={({ isActive }) => isActive ? 'active-menu-link' : 'default-menu-link'} to="/recipeSearch">RecipeSearch</NavLink></li>
                    <li><NavLink className={({ isActive }) => isActive ? 'active-menu-link' : 'default-menu-link'} to="/contact">Contact</NavLink></li>
                    <li><NavLink className={({ isActive }) => isActive ? 'active-menu-link' : 'default-menu-link'} to="/login">Log in</NavLink></li>
                </ul>
            </nav>
        </div>

    )
}

export default Navbar;