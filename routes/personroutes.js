const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');
const {jwtMiddleware, generateToken} = require('./../jwt') ;

// POST route to add a person
router.post('/signup', async (req, res) => {
    try {
        const data = req.body; // Assuming the request body contains the person data

        // Create a new Person document using the Mongoose model
        const newPerson = new Person(data);

        // Save the new person
        const response = await newPerson.save();
        console.log('Data saved successfully');
        
        const payload ={
            id:response.id,
            username : response.username
        }
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        console.log("token is ", token);

        res.status(200).json({response, token : token});
    } catch (err) {
        console.log('Error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//Login route
router.post('/login', async (req,res)=>{
    try{
    
    //extract username and password from request body
    const {username,password} =req.body;

    //Find the user by username
    const user = await Person.findOne({username:username});

    //If user does not exist or password does not match , return error
    if( !user || !(await user.comparePassword(password))){
        return res.status(401).json({error: 'Invalid username or password'});
    }

    //generate Token
    const payload = {
        id : user.id,
        username: user.username
    }
    const token = generateToken(payload);

    //return token as response
    res.json({token})
}catch (err){
    console.log(err);
    res.status(500).json({error : 'Internal Server Error'});
}
});

//Profile route
router.get('/profile', async (req,res) =>{
    try{
        const userData = req.user;
        console.log('user data', userData);

        const userId = userData.id;
        const user = await Person.findById(userId);

        res.status(200).json(user)

    }catch(err){
      console.log(err);
      res.status(500).json({error : 'Internal Server Error'});
    }
})




//GET method
router.get('/', jwtMiddleware, async (req,res)=>{
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
