const jsonwebtoken = require("jsonwebtoken");
const JWT_KEY = "kluczTestowy123";

/**
 * Funkcja middleware do weryfikacji użytkownika na podstawie cookies podczas przesyłania żądań.
 */
function loginRequired(req, res, next) {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }
    jsonwebtoken.verify(token, JWT_KEY, (err, decodedToken) => {
        if (err) {return res.status(401).json({ message: 'Unable to verify token!' }); }
        req.user = decodedToken;
        next();
    })
}
module.exports = {
    loginRequired,
    JWT_KEY
}