import {jwtDecode} from "jwt-decode";

function validTokenChecker(token) {

    const decoded = jwtDecode(token);
    return Date.now() < (decoded.exp * 1000);

}

export default validTokenChecker;