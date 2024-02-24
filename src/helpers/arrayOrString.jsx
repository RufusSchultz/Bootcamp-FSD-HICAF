function arrayOrString(list) {

    if (list !== undefined) {
        const array = Array.from(list);

        if (array.length === 1) {
            return (<span>{array}</span>)
        } else {
            return (
                <ul>
                    {array.map((object) => {
                        return <li key={object}>{object}</li>
                    })}
                </ul>
            )
        }
    } else {
        return undefined;
    }
}

export default arrayOrString;