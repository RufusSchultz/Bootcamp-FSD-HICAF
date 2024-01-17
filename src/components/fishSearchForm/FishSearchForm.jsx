import "./FishSearchForm.css"
import {useState} from "react";

function FishSearchForm({ sendQuery }) {
    const [query, setQuery] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
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