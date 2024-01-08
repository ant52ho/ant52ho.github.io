const { jwtDecode } = require("jwt-decode");

function getToken(cookieString) {
    const cookies = cookieToJson(cookieString);
    return cookies["_auth"];
}

function decodeCookieJWT(reqCookie) {
    return jwtDecode(reqCookie["_auth"]);
}

module.exports = { getToken, decodeCookieJWT };
