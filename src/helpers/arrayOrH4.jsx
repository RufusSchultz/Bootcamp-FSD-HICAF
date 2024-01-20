function arrayOrH4(list) {
    const array = Array.from(list);
    if (array.length === 1) {
        return (<h4>{array}</h4>)
    } else {
        return (
            <ul>
                {array.map((object) => {
                    return <li key={object}>{object}</li>
                })}
            </ul>
        )
    }
}

export default arrayOrH4;