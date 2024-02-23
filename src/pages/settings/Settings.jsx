import "./Settings.css"
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import axios from "axios";
import passwordStrengthTest from "../../helpers/passwordStrengthTest.js";
import settings_img from "../../assets/preferences.png";
import Button from "../../components/button/Button.jsx";
import InputField from "../../components/inputField/InputField.jsx";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../../context/UserContext.jsx";
import FilterCheckbox from "../../components/filterCheckbox/FilterCheckbox.jsx";

function Settings() {
    const contextContent = useContext(AuthContext);
    const userContext = useContext(UserContext);
    const navigate = useNavigate();
    const abortController = new AbortController();
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const [cleanupTrigger, toggleCleanupTrigger] = useState(false);

    const endpoint = `https://api.datavortex.nl/novibackendhicaf/users/${username}`;
    const [editDetail, setEditDetail] = useState("");
    const [formState, setFormState] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [repeatPassword, setRepeatPassword] = useState({password: "",});
    const [editError, setEditError] = useState("");

    const userData = userContext.data;
    const [filters, setFilters] = useState(userData.filters);
    const [filtersMessage, setFiltersMessage] = useState("");

    const isAdmin = (e) => e.authority === "ADMIN";

//----------------------Personal details--------------------------//

    //--------------------Edit username-----------------------//

    function toggleChangeUsername() {
        setEditDetail("new_username");
        setEditError("");
    }

    function submitNewUsername(e) {
        e.preventDefault();
        if (!formState.username) {
            setEditError("Please enter a new name")
        } else if (formState.username === username) {
            setEditError("This is already your current username.")
        } else {
            void putNewUsername();
            toggleCleanupTrigger(!cleanupTrigger);
        }
    }

    async function putNewUsername() {
        try {
            const response = await axios.put(endpoint, {username: formState.username}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                signal: abortController.signal,
            });
            if (response.status === 204) {
                setEditDetail("new_username_succes")
            }
            console.log(response);
        } catch (e) {
            console.error(e);
            setEditDetail("error")
        }
    }

    //--------------------Edit email-----------------------//

    function toggleChangeEmail() {
        setEditDetail("new_email");
        setEditError("");
    }

    function submitNewEmail(e) {
        e.preventDefault();
        if (!formState.email) {
            setEditError("Please enter a new email");
        } else if (formState.email === contextContent.user.email) {
            setEditError("This is already your current email.")
        } else {
            void putNewEmail();
            console.log(formState);
            toggleCleanupTrigger(!cleanupTrigger);
        }

    }

    async function putNewEmail() {
        try {
            const response = await axios.put(endpoint, {email: formState.email}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                signal: abortController.signal,
            });
            if (response.status === 204) {
                setEditDetail("new_email_succes")
            }
            console.log(response);
        } catch (e) {
            console.error(e);
            setEditDetail("error")
        }
    }

    //--------------------Edit password-----------------------//

    function toggleChangePassword() {
        setEditDetail("new_password");
        setEditError("");
    }

    function submitNewPassword(e) {
        e.preventDefault();
        setEditError("");
        if (!repeatPassword.password || !formState.password) {
            setEditError("Please fill in all fields");
        } else if (repeatPassword.password !== formState.password) {
            setEditError("Please enter the same password twice.");
        } else {
            const passwordCheck = passwordStrengthTest(formState.password, username);
            if (passwordCheck !== formState.password) {
                setEditError(passwordCheck);
            } else {
                void putNewPassword();
                toggleCleanupTrigger(!cleanupTrigger);
            }
        }
    }

    async function putNewPassword() {
        try {
            const response = await axios.put(endpoint, {password: formState.password}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                signal: abortController.signal,
            });
            if (response.status === 204) {
                setEditDetail("new_password_succes")
            }
            console.log(response);
        } catch (e) {
            console.error(e);
            setEditDetail("error")
        }
    }


    function handleChange(e) {
        setFormState({
            [e.target.name]: e.target.value,
        });
    }

    function handleChangeRepeatPassword(e) {
        setRepeatPassword({
            [e.target.name]: e.target.value,
        });
    }

//----------------------Search filters--------------------------//

    async function putNewFilterList(){
        const newInfo = JSON.stringify(userData);

        try {
            const response = await axios.put(endpoint, {info: newInfo}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                signal: abortController.signal,
            });
            console.log(response);
            void userContext.getUserData();
            setFiltersMessage("Filters successfully updated!");
        } catch (e) {
            console.error(e);
            setFiltersMessage("Something went wrong. Try again later.")
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        userData.filters = filters;
        void putNewFilterList();
        toggleCleanupTrigger(!cleanupTrigger);
    }

    function handleFilterChange(e){
        if (e.target.checked){
            setFilters([
                ...filters,
                e.target.value,
            ]);
        } else {
            const list = filters.filter((value) => value !== e.target.value)
            setFilters(list);
        }
    }

    //--------------------Common functions-----------------------//

    useEffect(() => {
        return function cleanup() {
            abortController.abort();
        }
    }, [cleanupTrigger]);

    function handleLogOutClick() {
        contextContent.logOutHandler();
    }

    useEffect(() => {
        if (!contextContent.isAuth) {
            navigate("/login");
        }
    }, []);

    //--------------------UI-----------------------//

    return (
        <>
        {contextContent.isAuth && <div className={"settings_outer_container"}>
            <div className={"logout_button_wrapper"}>
                <Button
                    className={"small_button"}
                    text={"Click to log out"}
                    onClick={handleLogOutClick}
                />
            </div>
            <div className={"settings_inner_container"}>
                <div className={"settings_sidebar"}>
                    <h1>Settings</h1>
                    <img src={settings_img} alt="settings"/>
                    <Button
                        className={"big_button"}
                        text={"Go to favorites"}
                        destination={"/account/favorites"}
                    />
                </div>
                <div className={"settings_content"}>
                        <fieldset className={"settings_fieldset"}>
                            <legend>
                                <h2>Your details</h2>
                            </legend>
                            <div className={"personal_details"}>
                                <div className={"personal_detail"}>
                                    <p className={"personal_detail_category"}>Username: </p>
                                    <p className={"personal_detail_detail"}>{contextContent.user.username} </p>
                                </div>
                                <div className={"personal_detail"}>
                                    <p className={"personal_detail_category"}>Email: </p>
                                    <p className={"personal_detail_detail"}> {contextContent.user.email}</p>
                                </div>
                            </div>
                            <div className={"personal_details_actions"}>
                                <Button
                                    className={"small_button"}
                                    text={"Change username"}
                                    onClick={toggleChangeUsername}
                                />
                                <Button
                                    className={"small_button"}
                                    text={"Change email"}
                                    onClick={toggleChangeEmail}
                                />
                                <Button
                                    className={"small_button"}
                                    text={"Change password"}
                                    onClick={toggleChangePassword}
                                />
                            </div>
                            <div>
                                {editDetail === "new_username" &&
                                    <form onSubmit={submitNewUsername} className={"edit_personal_detail_wrapper"}>
                                        <div className={"edit_personal_detail_field"}>
                                            <h3>New username:</h3>
                                            <InputField
                                                type={"text"}
                                                name={"username"}
                                                id={"username"}
                                                value={formState.username}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className={"edit_personal_detail_field"}>
                                            {editError && <div className={"error_text"}><p>{editError}</p></div>}
                                            <Button
                                                className={"small_button"}
                                                text={"Submit"}
                                                type={"submit"}
                                            />
                                        </div>
                                    </form>}
                                {editDetail === "new_username_succes" && <div className={"edit_success_message"}>
                                    <h2>Username changed successfully!</h2>
                                    <p>Changes will take effect at your next login.</p>
                                </div>}

                                {editDetail === "new_email" &&
                                    <form onSubmit={submitNewEmail} className={"edit_personal_detail_wrapper"}>
                                        <div className={"edit_personal_detail_field"}>
                                            <h3>New email:</h3>
                                            <InputField
                                                type={"email"}
                                                name={"email"}
                                                id={"email"}
                                                value={formState.email}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className={"edit_personal_detail_field"}>
                                            {editError && <div className={"error_text"}><p>{editError}</p></div>}
                                            <Button
                                                className={"small_button"}
                                                text={"Submit"}
                                                type={"submit"}
                                            />
                                        </div>
                                    </form>}
                                {editDetail === "new_email_succes" && <div className={"edit_success_message"}>
                                    <h2>Email changed successfully!</h2>
                                    <p>Changes will take effect at your next login.</p>
                                </div>}

                                {editDetail === "new_password" &&
                                    <form onSubmit={submitNewPassword} className={"edit_personal_detail_wrapper"}>
                                        <div className={"edit_password_fields"}>
                                            <div className={"edit_personal_detail_field"}>
                                                <h3>New password:</h3>
                                                <InputField
                                                    type={"password"}
                                                    name={"password"}
                                                    id={"password"}
                                                    value={formState.password}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className={"edit_personal_detail_field"}>
                                                <h3>Repeat new password:</h3>
                                                <InputField
                                                    type={"password"}
                                                    name={"password"}
                                                    id={"repeat_password"}
                                                    value={repeatPassword.password}
                                                    onChange={handleChangeRepeatPassword}
                                                />
                                            </div>
                                        </div>
                                        <div className={"edit_personal_detail_field"}>
                                            {editError &&
                                                <div className={"error_text"}><p id={"edit_error_text"}>{editError}</p>
                                                </div>}
                                            <Button
                                                className={"small_button"}
                                                text={"Submit"}
                                                type={"submit"}
                                            />
                                        </div>
                                    </form>}
                                {editDetail === "new_password_succes" && <div className={"edit_success_message"}>
                                    <h2>Password changed successfully!</h2>
                                    <p>Changes will take effect at your next login.</p>
                                </div>}

                                {editDetail === "error" && <div className={"edit_success_message"}>
                                    <h2 className={"error_text"}>Something went wrong!</h2>
                                    <p>Please try again later.</p>
                                    <p>Or if you already changed one of your details, </p>
                                    <p>please log out an log in. </p>
                                </div>}
                            </div>
                        </fieldset>

                        <form onSubmit={handleSubmit}>
                            <fieldset className={"settings_fieldset"}>
                                <legend><h2>Your search filters</h2></legend>
                                <div className={"search_filters_container"}>
                                    <div className={"filter_category"}>
                                        <h3>Diet:</h3>
                                        <div className={"field_of_filters"}>
                                            <FilterCheckbox name={"diet"} id={"balanced"} onChange={handleFilterChange}/>
                                            <FilterCheckbox name={"diet"} id={"high-fiber"} onChange={handleFilterChange}/>
                                            <FilterCheckbox name={"diet"} id={"high-protein"} onChange={handleFilterChange}/>
                                            <FilterCheckbox name={"diet"} id={"low-carb"} onChange={handleFilterChange}/>
                                            <FilterCheckbox name={"diet"} id={"low-fat"} onChange={handleFilterChange}/>
                                            <FilterCheckbox name={"diet"} id={"low-sodium"} onChange={handleFilterChange}/>
                                        </div>
                                    </div>
                                    <div className={"filter_category"}>
                                        <h3>Health and Allergy:</h3>
                                        <div className={"field_of_filters"}>
                                            <ul>
                                                <li><FilterCheckbox name={"health"} id={"alcohol-free"} onChange={handleFilterChange}/></li>
                                                <li><FilterCheckbox name={"health"} id={"celery-free"} onChange={handleFilterChange}/></li>
                                                <li><FilterCheckbox name={"health"} id={"crustacean-free"} onChange={handleFilterChange}/></li>
                                                <li><FilterCheckbox name={"health"} id={"dairy-free"} onChange={handleFilterChange}/></li>
                                                <li><FilterCheckbox name={"health"} id={"DASH"} onChange={handleFilterChange}/></li>
                                                <li><FilterCheckbox name={"health"} id={"egg-free"} onChange={handleFilterChange}/></li>
                                                <li><FilterCheckbox name={"health"} id={"fodmap-free"} onChange={handleFilterChange}/></li>
                                                <li><FilterCheckbox name={"health"} id={"gluten-free"} onChange={handleFilterChange}/></li>
                                                <li><FilterCheckbox name={"health"} id={"immuno-supportive"} onChange={handleFilterChange}/></li>
                                                <li><FilterCheckbox name={"health"} id={"keto-friendly"} onChange={handleFilterChange}/></li>
                                                <li><FilterCheckbox name={"health"} id={"kidney-friendly"} onChange={handleFilterChange}/></li>
                                            </ul>
                                            <ul>
                                                <li><FilterCheckbox name={"health"} id={"kosher"} onChange={handleFilterChange}/></li>
                                                <li><FilterCheckbox name={"health"} id={"low-fat-abs"} onChange={handleFilterChange}/></li>
                                                <li><FilterCheckbox name={"health"} id={"low-potassium"} onChange={handleFilterChange}/></li>
                                                <li><FilterCheckbox name={"health"} id={"low-sugar"} onChange={handleFilterChange}/></li>
                                                <li><FilterCheckbox name={"health"} id={"lupine-free"} onChange={handleFilterChange}/></li>
                                                <li><FilterCheckbox name={"health"} id={"Mediterranean"} onChange={handleFilterChange}/></li>
                                                <li><FilterCheckbox name={"health"} id={"mollusk-free"} onChange={handleFilterChange}/></li>
                                                <li><FilterCheckbox name={"health"} id={"mustard-free"} onChange={handleFilterChange}/></li>
                                                <li><FilterCheckbox name={"health"} id={"no-oil-added"} onChange={handleFilterChange}/></li>
                                                <li><FilterCheckbox name={"health"} id={"paleo"} onChange={handleFilterChange}/></li>
                                                <li><FilterCheckbox name={"health"} id={"peanut-free"} onChange={handleFilterChange}/></li>
                                            </ul>
                                            <ul>
                                                <li><FilterCheckbox name={"health"} id={"pescatarian"} onChange={handleFilterChange}/></li>
                                                <li><FilterCheckbox name={"health"} id={"pork-free"} onChange={handleFilterChange}/></li>
                                                <li><FilterCheckbox name={"health"} id={"red-meat-free"} onChange={handleFilterChange}/></li>
                                                <li><FilterCheckbox name={"health"} id={"sesame-free"} onChange={handleFilterChange}/></li>
                                                <li><FilterCheckbox name={"health"} id={"shellfish-free"} onChange={handleFilterChange}/></li>
                                                <li><FilterCheckbox name={"health"} id={"soy-free"} onChange={handleFilterChange}/></li>
                                                <li><FilterCheckbox name={"health"} id={"sugar-conscious"} onChange={handleFilterChange}/></li>
                                                <li><FilterCheckbox name={"health"} id={"sulfite-free"} onChange={handleFilterChange}/></li>
                                                <li><FilterCheckbox name={"health"} id={"tree-nut-free"} onChange={handleFilterChange}/></li>
                                                <li><FilterCheckbox name={"health"} id={"wheat-free"} onChange={handleFilterChange}/></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className={"filter_submit_section"}>
                                    {filtersMessage && <div className={filtersMessage === "Something went wrong. Try again later." ? "error_text" : undefined}>
                                        <h3>{filtersMessage}</h3>
                                    </div>}
                                    <Button
                                        text={"Submit"}
                                        type={"submit"}
                                        className={"small_button"}
                                    />
                                </div>
                            </fieldset>

                        </form>

                    {contextContent.user.authorities.some(isAdmin) && <div>
                        <h1>Admin stuff</h1>
                    </div>}
                </div>
            </div>
        </div>}
</>
    )
}

export default Settings;