import "./FilterCheckbox.css"
import {useContext, useState} from "react";
import {UserContext} from "../../context/UserContext.jsx";

function FilterCheckbox({id, name, onChange}) {
    const userContext = useContext(UserContext);
    const filterValue = `&${name}=${id}`
    const text = ` ${id}`;
    const [isChecked, toggleIsChecked] = useState(userContext.data.filters.includes(filterValue))

    function onCheckOrUncheck(e) {
        toggleIsChecked(!isChecked);
        onChange(e);
    }

    return (
        <label>
            <input type="checkbox"
                   id={id}
                   name={name}
                   value={filterValue}
                   onChange={onCheckOrUncheck}
                   checked={isChecked}
            />
            {text}
        </label>
    )
}

export default FilterCheckbox;