const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');

// POST route to add a person
router.post('/', async (req, res) => {
    try {
        const data = req.body; // Assuming the request body contains the person data

        // Create a new Person document using the Mongoose model
        const newPerson = new Person(data);

        // Save the new person
        const response = await newPerson.save();
        console.log('Data saved successfully');
        res.status(200).json(response);
    } catch (err) {
        console.log('Error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//GET method
router.get('/', async (req,res)=>{
    try{
      const data = await Person.find();
      console.log('Data fetched successfully');
        res.status(200).json(data);
    }catch(err){
        console.log('Error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

//Parameterised Get method
router.get('/:workType', async (req,res)=>{
    try{
        const workType = req.params.workType;
        if(workType=='chef' || workType=='manager' || workType == 'waiter'){
        const response = await Person.find({work:workType});
         console.log('response fetched');
         res.status(200).json(response);
        }else{
            res.status(404).json({error: 'Tnvalid work type'})
        }

    }catch(err){
        console.log('Error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

//Update the person PUT 
router.put('/:id', async (req,res)=>{
    try{
        const personId= req.params.id; //Extractrt the if from Url parameters
        const updatedPersonData = req.body; //Updated data for the Person

        const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new:true, //Return the updated document
            runValidators:true, //Run mongoose validation
        })

        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }

        console.log('data updated');
        res.status(200).json(response);

    }catch(err){
        console.log('Error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

//Delete method
router.delete('/:id', async (req,res)=>{
    try{
        const personId = req.params.id; //Extract the Person ID from the Url parameters

        //Assuming we have a person model
        const response = await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }
        console.log('data deleted');
        res.status(200).json({message: 'person Deleted Successfully'});
    }catch(err){
console.log('Error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = router;
