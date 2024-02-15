import "./Contact.css";
import Button from "../../components/button/Button.jsx";
import {useContext, useEffect, useState} from "react";
import InputField from "../../components/inputField/InputField.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";

function Contact() {
    const contentContext = useContext(AuthContext);
    const [inputFieldError, setInputFieldError] = useState(null);
    const [messageSent, toggleMessageSent] = useState(false);
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        message: "",
        allowCitation: false,
    });

    function handleChange(e) {
        const newValue = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setFormState({
            ...formState,
            [e.target.name]: newValue,
        })
    }

    useEffect(() => {
        if (contentContext.isAuth) {
            setFormState({
                ...formState,
                name: contentContext.user.username,
                email: contentContext.user.email,
            });
        }
    }, []);

    // This function has te be made asynchronous and put in an effect when it's matched with a suitable backend.
    function handleSubmit(e) {
        e.preventDefault();
        if (!formState.name || !formState.email || !formState.message) {
            if (contentContext.isAuth) {
                setInputFieldError("Please leave an actual message.")
            } else {
                setInputFieldError("Please fill in all fields.")
            }
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
                {contentContext.isAuth
                    ? <p>Leave your message here and we'll get back to you, {contentContext.user.username}.</p>
                    : <p>Fill in this form and we'll get back to you. </p>
                }

                <form onSubmit={handleSubmit} className={"contact_form"}>
                    {!contentContext.isAuth && <div className={"contact_form_name_email"}>
                        <InputField
                            label={"Name:"}
                            type={"text"}
                            name={"name"}
                            id={"name"}
                            value={formState.name}
                            onChange={handleChange}
                        />
                        <InputField
                            label={"Email:"}
                            type={"email"}
                            name={"email"}
                            id={"email"}
                            value={formState.email}
                            onChange={handleChange}
                        />
                    </div>}

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
                    <div>
                        <label className={"allow_citation_checkbox"}>
                            <input type={"checkbox"}
                                   name={"allowCitation"}
                                   id={"allow_citation"}
                                   checked={formState.allowCitation}
                                   onChange={handleChange}
                            />
                            I give permission to use (part of) my message as a testimonial.
                        </label>
                    </div>
                    {inputFieldError && <div>
                        <h2 className={"error_text"}>{inputFieldError}</h2>
                    </div>}
                    <Button
                        text={"Submit"}
                        type={"submit"}
                        className={"big_button"}
                    />
                </form>

                <p>Alternatively, you can <a href="mailto:tijdelijkeplaatshouder@gmail.com" className={"email_link"}>click
                    here</a> to send us an
                    email.</p>
            </div>}

            {messageSent && <div className={"contact_page"}>
                <div className={"low_content_container"}>
                    <h1>Thank you for your message!</h1>
                    <Button
                        text={"Click here to return to the homepage"}
                        destination={"/"}
                        clickPurpose={"navigate"}
                        type={"button"}
                        className={"big_button"}
                    />
                </div>

            </div>}

        </>
    )
}

export default Contact;