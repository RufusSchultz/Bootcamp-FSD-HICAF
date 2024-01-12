import logo from "../../assets/HICAF_logo.png";
import "./Home.css";
import Testimonial from "../../components/Testimonial.jsx";

function Home() {
    return (
        <div className={"homepage"}>
            <h1>Help I caught a fish!</h1>
            <img src={logo} alt=""/>
            <h3>We will help you find the best recipe for whatever fish you want to eat</h3>
            <div className={"homepage_startbuttons"}>
                <div className={"startbutton_set"}>
                    <label htmlFor={"recipeSearch_button"}><h3>Need an idea for your fish?</h3></label>
                    <button type={"button"} id={"recipeSearch_button"}>Start here!</button>
                </div>
                <div className={"startbutton_set"}>
                    <label htmlFor={"login_button"}><h3>Want to log in?</h3></label>
                    <button type={"button"} id={"login_button"}>Click here!</button>
                </div>
            </div>
            <div className={"testimonials"}>
                <Testimonial
                    quote={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, vitae!"}
                    user={"Rex Hunt"}
                />
                <Testimonial
                    quote={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, vitae!"}
                    user={"Bear Grylls"}
                />
                <Testimonial
                    quote={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, vitae!"}
                    user={"Capt. Ahab"}
                />
            </div>

        </div>
    )
}

export default Home;