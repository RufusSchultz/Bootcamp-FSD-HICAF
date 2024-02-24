import "./FishSearchForm.css";
import {useContext, useState} from "react";
import {ColorContext} from "../../context/ColorContext.jsx";

function FishSearchForm({sendQuery}) {

    const colorContent = useContext(ColorContext);
    const [query, setQuery] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        colorContent.continentColorSetter();
        sendQuery(query);
    }

    return (
        <form onSubmit={handleSubmit} className={"fish_search_form"}>
            <input type="text"
                   value={query}
                   onChange={(e) => setQuery(e.target.value)}/>
            <button type={"submit"}>Search</button>
        </form>
    )
}

export default FishSearchForm;