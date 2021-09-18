const express = require('express')
const router = express.Router()

router.get('/user', (req,res)=>{
    res.json({
        data:"USER URL"
    });
});

module.exports = router;