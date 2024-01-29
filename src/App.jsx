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

function App() {
    return (
        <>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/recipeSearch" element={<RecipeSearch/>}/>
                <Route path="/recipes/:id" element={<Recipes/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/account" element={<Account/>}/>
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </>
    )
}

export default App
