import "./InputField.css"

function InputField({ label, type, name, value, onChange,   }){
    return (
        <div className={"input_field_wrapper"}>
            <label htmlFor={name}>{label}</label>
            <input type={type}
                   name={name}
                   id={name}
                   value={value}
                   onChange={onChange}
                   className={"input_text_field"}
            />
        </div>
    )
}

export default InputField;