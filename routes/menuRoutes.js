const express = require('express')
const router = express.Router();
const MenuItem = require('./../models/Menu');


//POST method of add Menu Item

router.post('/', async (req,res)=>{
    try{
        const data = req.body
        const newMenu = new MenuItem(data);
        const response= await newMenu.save();
        console.log('data saved');
        res.status(500).json(response);

    }catch(err){
        console.log('Error:', err);
        res.status(500).json({ error: 'Internal server error' });

    }
})

//GET Method to get the meny items
router.get('/',async (req,res)=>{
    try{
        const data = await MenuItem.find();
        console.log('data Fetched');
        res.status(200).json(data);

    }catch(err){
        console.log('Error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports= router