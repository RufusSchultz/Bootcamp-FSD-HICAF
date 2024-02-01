import logo from "../../assets/HICAF_logo.png";
import "./Home.css";
import Testimonial from "../../components/testimonial/Testimonial.jsx";
import Button from "../../components/button/Button.jsx";
import testimonialRandomizer from "../../helpers/testimonialRandomizer.js";

function Home() {

    const testimonials = testimonialRandomizer();

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
                    type={"button"}
                />
                <Button
                    text={"Click here!"}
                    label={<h3>Want to log in or create an account?</h3>}
                    destination={"/login"}
                    type={"button"}
                />
            </div>
            <div className={"testimonials"}>
                <Testimonial
                    quote={testimonials[0].quote}
                    user={testimonials[0].user}
                />
                <Testimonial
                    quote={testimonials[1].quote}
                    user={testimonials[1].user}
                />
                <Testimonial
                    quote={testimonials[2].quote}
                    user={testimonials[2].user}
                />
            </div>

        </div>
    )
}

export default Home;