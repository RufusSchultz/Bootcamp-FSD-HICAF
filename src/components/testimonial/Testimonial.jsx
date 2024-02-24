import "./Testimonial.css";

function Testimonial({quote, user}) {

    return (
        <blockquote className={"testimonial_wrapper"}>
            <p className={"testimonial_quote"}>&quot;{quote}&quot;</p>
            <cite className={"testimonial_user"}>
                <span>- {user}</span>
            </cite>
        </blockquote>
    )
}

export default Testimonial;