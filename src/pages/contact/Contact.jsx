import "./Contact.css";
import Button from "../../components/button/Button.jsx";
import {useState} from "react";

function Contact() {

    const [inputFieldError, setInputFieldError] = useState(null);
    const [messageSent, toggleMessageSent] = useState(false);
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        message: "",
    });

    function handleChange(e) {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        })
    }

    // This function has te be made asynchronous and put in an effect when it's matched with a suitable backend.
    function handleSubmit(e) {
        e.preventDefault();
        if (!formState.name || !formState.email || !formState.message) {
            setInputFieldError("Please fill in all fields.")
        } else {
            toggleMessageSent(true);
            console.log(formState);
            console.log("This message then goes to a suited backend.")
        }

    }

    return (
        <>
            {!messageSent && <div className={"contact_page"}>
                <h1>Questions or comments?</h1>
                <h2>Let us know!</h2>
                <p>Fill in this form and we'll get back to you. </p>
                <form onSubmit={handleSubmit} className={"contact_form"}>
                    <div className={"contact_form_name_email"}>
                        <div>
                            <label htmlFor={"name"}>Name: </label>
                            <input type="text"
                                   name={"name"}
                                   id={"name"}
                                   value={formState.name}
                                   onChange={handleChange}
                                   className={"input_field"}
                            />
                        </div>
                        <div>
                            <label htmlFor={"email"}>Email:</label>
                            <input type="email"
                                   name={"email"}
                                   id={"email"}
                                   value={formState.email}
                                   onChange={handleChange}
                                   className={"input_field"}
                            />
                        </div>
                    </div>
                    <div className={"contact_form_message"}>
                        <label htmlFor={"message"}>What would you like to ask or tell us?</label>
                        <textarea name={"message"}
                                  id={"message"}
                                  value={formState.message}
                                  onChange={handleChange}
                                  cols="50"
                                  rows="15"
                                  placeholder={"Your message here"}
                                  className={"input_field"}
                        ></textarea>
                    </div>
                    {inputFieldError && <div>
                        <h2 className={"error_text"}>{inputFieldError}</h2>
                    </div>}
                    <Button
                        text={"Submit"}
                        type={"submit"}
                    />
                </form>

                <p>Alternatively, you can <a href="mailto:tijdelijkeplaatshouder@gmail.com" className={"email_link"}>click here</a> to send us an
                    email.</p>
            </div>}

            {messageSent && <div className={"contact_page"}>
                <h1>Thank you for your message!</h1>
            </div>}

        </>
    )
}

export default Contact;