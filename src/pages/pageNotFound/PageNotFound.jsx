import "./PageNotFound.css"
import Button from "../../components/button/Button.jsx";

function PageNotFound() {
    return(
        <div className={"low_content_container"}>
            <h1>Whoops, this page doesn't exist.</h1>
            <Button
                text={"Click here to return to the homepage"}
                destination={"/"}
                type={"button"}
                className={"big_button"}
            />
        </div>
    )
}

export default PageNotFound;