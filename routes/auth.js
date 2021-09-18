const express = require('express')
const router = express.Router()

router.get('/create-update-user', (req,res)=>{
    res.json({
        data:"HELLO TO NODE JS"
    });
});

module.exports = router;