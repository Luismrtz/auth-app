// import jwt from 'jsonwebtoken';

// const auth = (req, res, next) => {
//     try {
//         const token = req.header("x-auth-token");
//         if(!token) {
//             return res
//             .status(401)
//             .json({msg: "No authentication token, authorization denied."};)
//         }
//         const verified = jwt.verify(token, config.JWT_SECRET);
//         if(!verified) {
//             return res
//             .status(401)
//             .json({ msg: "Token verification failed, authorization denied."});
//         }
//         console.log(verified);
//     } catch (err) {
//         res.status(500).json({error: err.message});
//     }
// }