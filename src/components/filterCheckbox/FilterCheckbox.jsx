import "./FilterCheckbox.css"
import {useContext, useState} from "react";
import {UserContext} from "../../context/UserContext.jsx";

function FilterCheckbox({id, name, onChange}) {
    const userContent = useContext(UserContext);
    const filterValue = `&${name}=${id}`
    const text = ` ${id}`;
    const [isChecked, toggleIsChecked] = useState(userContent.data.filters.includes(filterValue))

    function onToggle(e) {
        toggleIsChecked(!isChecked);
        onChange(e);
    }

    return (
        <label>
            <input type="checkbox"
                   id={id}
                   name={name}
                   value={filterValue}
                   onChange={onToggle}
                   checked={isChecked}
            />
            {text}
        </label>
    )
}

export default FilterCheckbox;