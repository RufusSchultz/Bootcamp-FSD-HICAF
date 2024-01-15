import "./FishSearchForm.css"

function fishSearchForm() {
    return (
        <form onSubmit={console.log("bla")} className={"fish_search_form"}>
            <input type="text"/>
            <button type={"submit"}>Search</button>
        </form>
    )
}

export default fishSearchForm;