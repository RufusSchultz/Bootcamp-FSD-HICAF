import "./Testimonial.css";
function Testimonial({ quote, user }) {
    return (
        <div className={"testimonial_wrapper"}>
            <p className={"testimonial_quote"}>"{quote}"</p>
            <p className={"testimonial_user"}>- {user}</p>
        </div>
    )
}

export default Testimonial;