function backendMessageStreamliner(message) {

    if (message === "Username already exists in application novibackendhicaf") {
        return "Username is already in use!"
    } else if (message === "Email already exists") {
        return "Email already in use!"
    } else {
        return message;
    }
}

export default backendMessageStreamliner;