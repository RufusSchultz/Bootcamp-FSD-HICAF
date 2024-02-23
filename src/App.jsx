import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import RecipeSearch from "./pages/recipeSearch/RecipeSearch.jsx";
import Contact from "./pages/contact/Contact.jsx"
import Login from "./pages/login/Login.jsx";
import Account from "./pages/account/Account.jsx"
import Navbar from "./components/navbar/Navbar.jsx";
import Recipes from "./pages/recipes/Recipes.jsx";
import PageNotFound from "./pages/pageNotFound/PageNotFound.jsx";
import BackendStart from "./pages/backendStart/BackendStart.jsx";
import Settings from "./pages/settings/Settings.jsx";
import Favorites from "./pages/favorites/Favorites.jsx";
import Admin from "./pages/admin/Admin.jsx";

function App() {
    return (
        <>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/recipeSearch" element={<RecipeSearch/>}/>
                <Route path="/recipeSearch/:id" element={<Recipes/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/account" element={<Account/>}/>
                <Route path="/account/settings" element={<Settings/>}/>
                <Route path="/account/favorites" element={<Favorites/>}/>
                <Route path="/admin" element={<Admin/>} />
                <Route path="*" element={<PageNotFound/>}/>
                <Route path="/backendStart" element={<BackendStart/>}/>
            </Routes>
        </>
    )
}

export default App
