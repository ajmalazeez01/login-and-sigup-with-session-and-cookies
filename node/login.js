const express=require('express');
const session=require('express-session')
const cookieParser = require("cookie-parser");
const app=express();
app.listen(3000,()=>console.log('listening to 3001'));

app.use(express.urlencoded({ extended: true}));
app.use(express.json()); 
// cookie parser middleware
app.use(cookieParser());

app.set('view engine', 'ejs')
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:'secretpassword',
})) 
const user={
    email:'ajmalazeez766@gmail.com',
    passwrd:'1234'
}   

app.use((req, res, next) => {
    res.set("Cache-Control", "no-store");
    next();
  });


app.get('/', (req,res)=>{
    if(req.session.user){
        res.render('home')
    }
    else{
    res.render('login', { invalid:''});
    // console.log(req.session)
    }
});

app.get('/home',(req,res)=>{
    if(req.session.user){
        return res.render('home')
        console.log('hh')
    }
    else{
        return res.redirect('/')
        console.log('ggg')
    }
 })

app.post('/',(req,res)=>{
    // const mmm=req.body.email
    // console.log(mmm)
    // var body = res.json(req.body)
//     console.log('post')
//     console.log(req.body.email)
//     console.log(req.body.passwrd)
      if(user.email==req.body.email&&user.passwrd==req.body.passwrd){
        req.session.user=req.body.email
        console.log(req.session.user)
        // console.log(session_name)
        res.redirect('/home')

      }
      else{
        // res.render('index', { title:'abdulla',invalid:'pppp'});
        res.render('login',{invalid:'Invalid Username or Password'});
      }
 })

 

 app.get('/logout',(req,res)=>{
    req.session.destroy()
    // console.log(req.session.user)
    // console.log(req.session.user)
        res.redirect('/');
        console.log('session deleted');
        res.end();
 })

 
 
// app.use(express.static('views'))
app.use((req,res)=>{
res.status(404).render('error')
}
)

// app.set('views', path.join(__dirname, 'views'))
