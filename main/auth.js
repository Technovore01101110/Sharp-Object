import jwt from "jsonwebtoken"

export function authUser(req, res, next){
    const token = req.cookies.token ?? null;
    if (!token){
        req.user = null
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_SECRET_TOKEN);
        req.user = decoded;
    } catch (err) {
        req.user = null;
        res.clearCookie("token")
    }

    next()
}

export function requireAuth(req, res, next){
    if (!req.user){
        return res.redirect("/user/login")
    }
    next()
}

export function requireNoAuth(req, res, next){
    if (req.user){
        return res.redirect("/")
    }

    next()
}