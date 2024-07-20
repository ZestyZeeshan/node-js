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

 
const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/Person');


const bodyParser = require('body-parser');

app.use(bodyParser.json()); //req.body
const PORT = process.env.PORT || 3000;



//Middleware Function
const logRequest = (req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request Made to:${req.originalUrl}`);
    next();
}

app.use(logRequest);

passport.use(new LocalStrategy(async (username, password,done)=>{
    try{
        console.log('Received credentials:' , username, password);
        //username ko database wale username se match krenge
        const user = await Person.findOne({username});
        if(!user)
            return done(null, false, {message : 'Incorrect username.'});

        const isPsswordMatch = await user.comparePassword(password);

        if(isPsswordMatch){
            return done(null,user);
        }else{
            return done(null, false,{message: 'Incorrect password'});
        }

    }catch(err){
        return done(err);
    }
}));

app.use(passport.initialize());

//now we are using jwt so dont require this anymore
const localAuthMiddleware = passport.authenticate('local' , {session : false})

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



//import the router files
const personRoutes = require('./routes/personroutes');

//use the router
app.use('/person', personRoutes);

//import the menu router
const menuRouter = require ('./routes/menuRoutes')

//use the menu routes
app.use('/menu', menuRouter);




app.listen(PORT,()=>{
    console.log('server is running at 3000 port')
})