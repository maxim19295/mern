const {Router} = require('express');
const router = Router();
const Link = require('./../models/Link');
const auth = require('./../middleware/auth.middleware')
router.post('/generate',auth,async(req,res)=>{
    try {
        const baseURL = require('config').get('baseURL');
        const {from} = req.body;
        const code = require('shortid').generate();
        const existing = await Link.findOne({from});
        if(existing){
            return res.json({link: existing})
        }
        const to = baseURL+'/t/'+code;
        const link = new Link({code, to, from, owner: req.user.userId});
        await link.save();
        res.json({link})
    } catch (error) {
        res.status(500).json({message: 'Something went wrong, try again', error})
        console.log(error)
    }
});
router.get('/',auth, async(req,res)=>{
    try {
        const links = await Link.find({owner: req.user.userId});
        res.json(links);
    } catch (error) {
        res.status(500).json({message: 'Something went wrong, try again', error})
        console.log(error)
    }
});
router.get('/:id',async(req,res)=>{
    try {
        const links = await Link.findById(req.params.id);
        res.json(links);
    } catch (error) {
        res.status(500).json({message: 'Something went wrong, try again', error})
        console.log(error)
    }
})
module.exports = router;