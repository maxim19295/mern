const {Router} = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator')
const User = require('./../models/User')
const router = Router();
router.post('/register',
[check('email','Uncorrect email').isEmail(),
check('password','Minimum length - 6 symbols').isLength({min: 6})
],
 async (req,res)=>{
try {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array(),
            message: 'Uncorrect registration data'
        })
    }
    const {email,password} = req.body;
    const candidate = await User.findOne({email});
    if(candidate){
        return res.status(400).json({message: 'This email has been registered earlier'})
    }
    const hashedPassword = await bcrypt.hash(password,12);
    const user = new User({email, password: hashedPassword});
    user.save();
    res.status(201).json({message: 'User successfully created'})
} catch (error) {
    res.status(500).json({message: 'Something went wrong, try again', error})
    console.log(error)
}
});
router.post('/login',
[check('email','Uncorrect email').normalizeEmail().isEmail(),
check('password','Need password').exists()
], async (req,res)=>{
try {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array(),
            message: 'Uncorrect autorization data'
        })
    }
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({message: 'Match is not found'});
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({message: 'Match is not found'})
    }
    const token = jwt.sign({
        userId: user.id
    },require('config').get('secretKey'),{expiresIn: '1h'});
    res.json({token, userId: user.id})
} catch (error) {
    res.status(500).json({message: 'Something went wrong, try again', error})
}
});
module.exports = router;