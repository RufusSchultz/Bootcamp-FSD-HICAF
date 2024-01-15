import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import RecipeSearch from "./pages/recipeSearch/RecipeSearch.jsx";
import Contact from "./pages/contact/Contact.jsx"
import Login from "./pages/contact/Contact.jsx"
import Account from "./pages/account/Account.jsx"
import Navbar from "./components/navbar/Navbar.jsx";

function App() {
    return (
        <>
            <Navbar/>
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
