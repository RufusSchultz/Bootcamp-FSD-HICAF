function passwordStrengthTest(password, username) {

    if (password.length > 7 && password.match(/\d+/g) && password.match(/[A-Z]+/g) && password.match(/[a-z]+/g) && password !== username) {
        return password;
    } else {
        if (password.length < 8) {
            return "Password needs to be at least 8 characters long";
        } else if (!password.match(/\d+/g) || !password.match(/[A-Z]+/g) || !password.match(/[a-z]+/g)) {
            return "Password must contain at least one uppercase letter, one lowercase letter and one number";
        } else if (password === username) {
            return "Password can not be identical to username!";
        }
    }
}

export default passwordStrengthTest;