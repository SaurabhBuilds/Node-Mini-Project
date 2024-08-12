const express = require('express');
const app = express();
const userModel = require('./models/user');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const postModel = require("./models/post")
const crypto = require("crypto");
const path = require("path");
const upload = require('./config/multerconfig');

app.set("view engine","ejs");
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended: true}));

app.get('/',(req,res)=>{
    res.render("index");
})

app.get("/profile/upload",isLogedin,(req,res)=>{
    res.render("profileupload");
})

app.post("/upload",isLogedin,upload.single("image"),async(req,res)=>{
    let post = await userModel.findOneAndUpdate({_id:req.user.userid},{profilepic:req.file.filename},{new:true})
    await post.save()
    res.redirect("/profile")
})

app.get('/login',(req,res)=>{
    res.render("login");
})

app.get('/profile',isLogedin,async(req,res)=>{
    const {email} = req.user
    let user = await userModel.findOne({email}).populate("posts") //populate will replace the posts field in the found user document with the actual data from the posts collection.
    res.render("profile",{user}); //don't put "/" in render it is not a route
})

app.get('/like/:id',isLogedin,async(req,res)=>{
    let post = await postModel.findOne({_id:req.params.id}).populate("user")//user field ko populate karo 
    if(post.likes.indexOf(req.user.userid)=== -1){
        post.likes.push(req.user.userid);
    }
    else{
        post.likes.splice(post.likes.indexOf(req.user.userid), 1)
    }
    await post.save();
     //populate will replace the posts field in the found user document with the actual data from the posts collection.
    res.redirect("/profile"); //don't put "/" in render it is not a route
})

app.get('/edit/:id',isLogedin,async(req,res)=>{
    let{id} = req.params
    let post = await postModel.findOne({_id:id}) //populate will replace the posts field in the found user document with the actual data from the posts collection.
    res.render("edit",{post});

 })
 app.post('/edit/:id',isLogedin,async(req,res)=>{
    let{id} = req.params
    let {content} = req.body  
    await postModel.findOneAndUpdate({_id:id},{content:content},{new:true}) //populate will replace the posts field in the found user document with the actual data from the posts collection.
    res.redirect("/profile");
    //ussko index le ke replace karna padega
})

app.post('/post',isLogedin,async(req,res)=>{
    const {email} = req.user
    let user = await userModel.findOne({email})
    let {content} = req.body //jab hum form submit karange tab jo text area ka name hai wo aiga req me 
   let post = await postModel.create({
        user: user._id,
        content     
    })
    user.posts.push(post._id);
    await user.save();
    res.redirect("/profile")
})

app.post('/register',async(req,res)=>{
    let {name, email , password ,age, username } = req.body
    let user = await userModel.findOne({email})
    if(user) return res.status(500).send("user already exists");

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {
            let user = await userModel.create({
                username,
                email,
                age,
                name,
                password:hash,
            })
           return res.send(`Hello ${name} you are registered`)
        });
    });

})

app.post('/login',async(req,res)=>{
    let {email , password } = req.body
    let user = await userModel.findOne({email})
    if(!user) return res.status().send("user doesn't exists !!")
    bcrypt.compare(password, user.password, function(err, result) {
        if(result){
            let token = jwt.sign({email:email,userid:user._id},"shhhhh");
            res.cookie('token',token);
            res.status(200).redirect("/profile")
        }
        else{
            res.redirect("/login")
        }
    });  
})
app.get('/logout',(req,res)=>{
    res.cookie('token',"")
    res.send("you are logged out !!")
})

async function isLogedin (req,res,next){
    if(!req.cookies.token) return res.redirect("/login");//redirect will call the route of /login
    var decoded = jwt.verify(req.cookies.token, 'shhhhh');
    req.user = decoded  //jaha bhi islogedin middleware use hoga waha pe we can access user with the help of this line
    next();
}

app.listen(3000,()=>{
    console.log("the server is running on port 3000")
})