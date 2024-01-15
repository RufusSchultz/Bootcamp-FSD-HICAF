import "./FishSearchForm.css"

function fishSearchForm() {

    function searchFish(e) {
        e.preventDefault();
    }

    return (
        <form onSubmit={searchFish} className={"fish_search_form"}>
            <input type="text"/>
            <button type={"submit"}>Search</button>
        </form>
    )
}

export default fishSearchForm;