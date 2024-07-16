// function add(a,b){
//     return a+b;
// }


// var add = function(a,b){
//     return a+b;
// }


// var add = (a,b) =>{
//     return a+b;
// }


// var add = (a,b) => a+b;
// var ans = add(1,8)

// console.log(ans);

// var fs = require('fs');
// var os = require('os')

// var user = os.userInfo;

// fs.appendFile('greeting.txt','hi' + user.username + '\n', () =>{
//     console.log('file is created')
// })

// const notes = require('./notes.js')

// var age = notes.age

// var result = notes.add(age+18, 10);

// console.log(age);
// console.log('result is now'+ result);

 
const express = require('express')
const app = express();
const db = require('./db')

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body

const Person = require('./models/Person');
const MenuItem = require('./models/Menu');

app.get('/', function(req,res){
    res.send('helloo welcom! how can i help u')
})

// app.get('/admin',function(req,res){

//we dont use this method anymore

//     res.send('this is the admin page')
// })

// app.get('/menu',(req,res)=>{
//     var customised_food={
//         daal:'masoor',
//         rice:'basmati',
//         mango:'malde aam',
//         curry:'soya'
//     }
//     res.send(customised_food)
// })

//Post route to add a person
// app.post('./person',(req,res)=>{
//     const data = req.body //assusme the request body contains the person data

//     //Create a new Person documnet using the Mongoose model
//     //if we have many feilds then we cant do that repetively
//     /* // const newPerson = new Person();
//     // newPerson.name = data.name;
//     // newPerson.age = data.age;
//     // newPerson.mobile = data.mobile;
//     // newPerson.address = data.address;
//     // newPerson.email = data.email;
//     // newPerson.salary = data.salary; */
//     const newPerson = new Person(data);

//     //save the new person to the database
//     newPerson.save((error,savedPerson)=>{
//         if(error){
//             console.log('Error saving person', error);
//             res.status(500).json({error:'Internal server error'})
//         }else{
//             console.log('Data saved Successfully');
//             res.status(200).json(savedPerson);
//         }
//     })
// })

// POST route to add a person
app.post('/person', async (req, res) => {
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
app.get('/person', async (req,res)=>{
    try{
      const data = await Person.find();
      console.log('Data fetched successfully');
        res.status(200).json(data);
    }catch(err){
        console.log('Error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
})


app.listen(3000,()=>{
    console.log('server is running at 3000 port')
})