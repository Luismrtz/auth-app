import express from 'express';
import User from '../models/userModel';
import jwt from 'jsonwebtoken';
import config from '../config'
import bcrypt from 'bcryptjs';
import {getToken, auth, isAdmin} from '../util';
const router = express.Router();

//*peek at all users
router.get("/all", async (req, res) => {
    try {
        const newUser = await User.find({});
        res.json(newUser);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
});




//* peek at a single user
router.get("/:id", async(req, res) => {
    try {
        const newUser = await User.findOne({_id: req.params.id});
        res.json({newUser,  token: getToken(newUser)})
    } catch (error) {
        res.json({message: error});
    }
});

//* post a new user
router.post("/register", async(req, res) => {
    // same as 'const email = req.body.email;'
    // same as 'let name = req.body.name;'
    const {email, password, passwordCheck, isAdmin} = req.body;
    let {name} = req.body;
 
    try {
        if (!email || !password || !passwordCheck) {
            return res.status(400).send({msg: "Not all fields have been entered."})
        }
        if (password.length < 5) {
            return res.status(400).send({msg: "The password needs to be at least 5 characters long."})
        }
        if (password !== passwordCheck) {
            return res.status(400).send({msg: "Password does not match."})
        }
        const existingUser = await User.findOne({email: email});
        if(existingUser) {
            return res.status(400).send({msg: "An account with this email already exists."});
        }
        if(!name) {
            name = email;
        }
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: passwordHash,
            name,
            isAdmin,
      
        });
        const savedUser = await newUser.save();

        if (savedUser) {
            res.json({
          
                user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
                password: savedUser.password,
                isAdmin: savedUser.isAdmin,
            
            },
            
            token: getToken(savedUser)
        })
        }
    } catch(err) {
        res.status(500).json({error: err.message});
    }
});


//* post a login request
router.post('/login', async(req, res)=> {
    try {
        const { email, password } = req.body;
        //validation
        if(!email || !password) {
            return res.status(400).send({msg: "Not all fields have been entered"})
        }
        const user = await User.findOne({ email: email});
        if (!user) {
            return res.status(400).send({msg: "No account with this email has been registered."});
        }
                //compare the password with the hashString if user has been found
        const isMatch = await bcrypt.compare(password, user.password) 
        if (!isMatch) {
            return res.status(400).send({msg: "Invalid credentials."})
        }

        
    //     const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET);
    //     res.json({token, user: {
    //         id: user._id,
    //         name: user.name,
    //         email: user.email
    //     }
    // })
    
        res.json({
          
            user: {
            id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            isAdmin: user.isAdmin

        },
        token: getToken(user)
    })
  

    } catch (err) {
        res.status(500).json({ error: err.message})
    }
});


// //* delete current logged-in user
// router.delete("/:id", auth, async (req, res) => {
//     try {
//       //  console.log(req.user);
//         const deletedUser = await User.findByIdAndDelete(req.user);
//         res.json(deletedUser)
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

//todo util's auth & isAdmin now functional
//* delete a selected user
router.delete("/:id",auth, isAdmin,  async (req, res) => {
    try {
        console.log(req.user);
        const deletedUser = await User.findById(req.params.id);
        await deletedUser.remove();
        res.json(deletedUser)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// //* DELETE ALL 
//   router.delete("/", async (req, res) => {
//       try {
//     const deleteAll = await User.remove({});
   
      
//       res.send(deleteAll);
//     } catch(error) {
//       res.status(404).send("Product Not Found.")
//     }
//   });






//* valid auth/jwt token to verify user/admin is requesting it
//todo SCRAP THIS
router.post("/tokenIsValid", async (req, res) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.json(false);

        const verified = jwt.verify(token, config.JWT_SECRET )
        if (!verified) {
            return res.json(false);
        }

        const user = await User.findById(verified._id)
        if (!user) {
            return res.json(false);
        }
        //console.log(verfied._id)
        return res.json(true);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

//* get single user
//todo SCRAP THIS
// router.get("/", auth, async (req, res) => {
// try {
//     const user = await User.findById(req.user);

//     res.json({
//         name: user.name,
//         Id: user._id,
//         isAdmin: user.isAdmin,
//         email: user.email
//     });
 


// } catch (err) {
//     res.status(500).json({ error: err.message });
// }
// });

// //* update user info
// router.put('/:id', auth, async(req, res) => {
//     try {
//         const userId = req.params.id;
//         const user = await User.findById(userId);
//         // const salt = await bcrypt.genSalt();
//         // const passwordHash = await bcrypt.hash(user.password, salt);
//         if (user) {
//             // const {email, password, passwordCheck} = req.body;
//             // let {name} = req.body;



//             user.name = req.body.name || user.name;
//             user.email = req.body.email || user.email;
//             user.password = req.body.password || user.password;
//             user.isAdmin = req.body.isAdmin || user.isAdmin;




//             const updatedUser = await user.save();
//             res.send({
//                 _id: updatedUser.id,
//                 name: updatedUser.name,
//                 email: updatedUser.email,
//                 isAdmin: updatedUser.isAdmin,
//                 token: getToken(updatedUser),
//             });

//         }
//     } catch(error) {
//         res.status(404).send({msg: 'User Not Found'});
//     }
// });


//* post a new user
// router.put("/:id", auth, async(req, res) => {
//     // const {email, password, passwordCheck} = req.body;
//     // let {name} = req.body;
//     try {

//         const userId = req.params.id;
//         const user = await User.findById(userId);

//         // if (!email || !password || !passwordCheck) {
//         //     return res.status(400).json({msg: "Not all fields have been entered."})
//         // }
//         // if (password.length < 5) {
//         //     return res.status(400).json({msg: "The password needs to be at least 5 characters long."})
//         // }
//         // if (password !== passwordCheck) {
//         //     return res.status(400).json({msg: "Password does not match."})
//         // }
//         // const existingUser = await User.findOne({email: email});
//         // if(existingUser) {
//         //     return res.status(400).json({msg: "An account with this email already exists."});
//         // }

//         if(user) {

//             // if(!name) {
//             //     name = email;
//             // }
//             const salt = await bcrypt.genSalt();
//             const passwordHash = await bcrypt.hash(req.body.password, salt);

            
//             user.name = req.body.name || user.name;
//             user.email = req.body.email || user.email;
//             user.password = passwordHash || user.password;
//             user.isAdmin = req.body.isAdmin || user.isAdmin;
    
//             // const newUser = new User({
//             //     email,
//             //     password: passwordHash,
//             //     isAdmin,
//             //     name,
//             // });
//             const savedUser = await user.save();
//             res.json(savedUser);
//         }
//     } catch(err) {
//         res.status(500).json({error: err.message});
//     }
// });


// //? update revised
// router.patch('/update/:id', async(req,res) => {


//     try {
//         const salt = await bcrypt.genSalt();
//         const passwordHash = await bcrypt.hash(password, salt);
    
    
//         // const salt = await bcrypt.genSalt();
//         // const passwordHash = await bcrypt.hash(req.body.password, salt);
        
//         const user = await User.updateOne(
//             {_id: req.params.id},
//            {$set: req.body
//             },
//             {password: passwordHash}
//         )
//         res.json(user);
//     } catch (err) {
//         res.json({ message: err})
//     }

// });


export default router;