import jwt from 'jsonwebtoken';
import config from './config';
const getToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,

    }, config.JWT_SECRET
    // , {
    //     expiresIn: '15m'
    // }
    )
}

// const isAuth = (req, res, next) => {
//     const token = req.headers.authorization;
//     if (token) {
//         const onlyToken = token.slice(7, token.length);
//         jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
//             if (err) {
//                 return res.status(401).send({msg:'Invalid Token util'});
//             }
//             req.user = decode;
//             next();
//             return
//         });
//     } else {

//         return res.status(401).send({msg: 'Token is not supplied.'})
//     }
// }

const auth = (req, res, next) => {
    try {
        const token = req.header("x-auth-token");
        if(!token) {
            return res
            .status(401)
            .json({msg: "No authentication token, authorization denied."});
        }
        const verified = jwt.verify(token, config.JWT_SECRET);
        if(!verified) {
            return res
            .status(401)
            .json({ msg: "Token verification failed, authorization denied."});
        }
       // console.log(verified._id);
        req.user = verified._id;
        next();
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}





const isAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        return next();
    }
    return res.status(401).send({msg: 'Admin Token is not valid.'})
}
export {
    getToken, auth, isAdmin
}