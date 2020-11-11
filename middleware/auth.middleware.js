const jwt = require('jsonwebtoken');
module.exports = (req,res,next) =>{
    if(req.method==='OPTIONS'){
        return next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        
        if(!token){
            return res.status(401).json({message: 'N1ot autorized'})
        }
        const decoded = jwt.verify(token,require('config').get('secretKey'));
        req.user=decoded;
        next();
    } catch (error) {
        res.status(401).json({message: 'N2ot autorized', error})
        
    }
}