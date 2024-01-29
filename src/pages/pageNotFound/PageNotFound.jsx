import "./PageNotFound.css"
import Button from "../../components/button/Button.jsx";

function PageNotFound() {
    return(
        <div className={"page_not_found"}>
            <h1>Whoops, this page doesn't exist.</h1>
            <Button
                text={"Click here to return to the homepage"}
                destination={"/"}
                clickPurpose={"navigate"}
                type={"button"}
            />
        </div>
    )
}

export default PageNotFound;