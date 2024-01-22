import logo from "../../assets/HICAF_logo.png";
import "./Home.css";
import Testimonial from "../../components/testimonial/Testimonial.jsx";
import Button from "../../components/button/Button.jsx";

function Home() {


    return (
        <div className={"homepage"}>
            <h1>Help I caught a fish!</h1>
            <img src={logo} alt=""/>
            <h3>We will help you find the best recipe for whatever fish you want to eat</h3>
            <div className={"homepage_startbuttons"}>
                <Button
                    text={"Start here!"}
                    label={<h3>Need an idea for your fish?</h3>}
                    destination={"/recipeSearch"}
                />
                <Button
                    text={"Click here!"}
                    label={<h3>Want to log in?</h3>}
                    destination={"/login"}
                />
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