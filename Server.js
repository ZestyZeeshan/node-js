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

app.get('/', function(req,res){
    res.send('helloo welcom! how can i help u')
})

app.get('/admin',function(req,res){
    res.send('this is the admin page')
})

app.get('/menu',(req,res)=>{
    var customised_food={
        daal:'masoor',
        rice:'basmati',
        mango:'malde aam',
        curry:'soya'
    }
    res.send(customised_food)
})

app.listen(3000,()=>{
    console.log('server is running at 3000 port')
})