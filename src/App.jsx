import './App.css';
import {NavLink, Route, Routes} from "react-router-dom";
import headerLogo from "/assets/HICAF Nav Logo.png";
import Home from "/pages/home/Home.jsx";
import RecipeSearch from "/pages/recipeSearch/RecipeSearch.jsx";
import Contact from "/pages/contact/Contact.jsx"
import Login from "/pages/contact/Contact.jsx"
import Account from "/pages/account/Account.jsx"

function App() {
  return (
    <>
      <header>
        <img src={headerLogo} alt="hicaf logo"/>
        <nav>
          <ul>
            <li><NavLink className={({ isActive }) => isActive ? 'active-menu-link' : 'default-menu-link'} to="/">Home</NavLink></li>
            <li><NavLink className={({ isActive }) => isActive ? 'active-menu-link' : 'default-menu-link'} to="/recipeSearch">Alle posts</NavLink></li>
            <li><NavLink className={({ isActive }) => isActive ? 'active-menu-link' : 'default-menu-link'} to="/contact">Nieuwe post</NavLink></li>
            <li><NavLink className={({ isActive }) => isActive ? 'active-menu-link' : 'default-menu-link'} to="/login">Nieuwe post</NavLink></li>
          </ul>
        </nav>
      </header>

      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="recipeSearch" element={<RecipeSearch/>}/>
          <Route path="contact" element={<Contact/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="account" element={<Account/>}/>
      </Routes>
    </>
  )
}

export default App
