const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');
const session = require('express-session')
const bcrypt = require('bcrypt');
const bodyParser = require('body-Parser')
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const mongoose = require('mongoose');
sharedsession = require("express-socket.io-session");
mongoose.connect('mongodb://127.0.0.1:27017/Chat_app', {useNewUrlParser: true, useUnifiedTopology: true});
//mongoose.connect('mongodb+srv://admin:admin1@cluster0.orqkl.mongodb.net/Chat_app?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

//using mongodb 
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});
const { Schema } = mongoose;
const User = new Schema({
  username:  String, // String is shorthand for {type: String}
  email: { type : String , unique : true },
  password:   String,
  contacts: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  requests: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  outgoing_requests: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  online_status: Boolean
});
const Message = new Schema({
  sender:  { type: Schema.Types.ObjectId, ref: 'User' }, // String is shorthand for {type: String}
  reciever: { type: Schema.Types.ObjectId, ref: 'User' },
  body:   String,
  time : { type : Date, default: Date.now },
  recieved: Boolean,
});
const Notification = new Schema({
  sender:  { type: Schema.Types.ObjectId, ref: 'User' }, // String is shorthand for {type: String}
  reciever: { type: Schema.Types.ObjectId, ref: 'User' },
  body:   String,
  time : { type : Date, default: Date.now },
});
const user = mongoose.model('User', User);
const message = mongoose.model('Message', Message);
const notify = mongoose.model('Notification', Notification);

/*
const silence = new user({ username: 'ahmad',email: 'ahmadraza@gmail.com' });
silence.save()
*/
/*
user.findOneAndRemove({email:'ahmad1@123'},function (err, user) {
  if (err) return handleError(err);
  // Prints "Space Ghost is a talk show host".)
})
*/

user.update({email:'ahmad12@123'},{$set: {"requests":[]}},function (err, user) {
  if (err) return handleError(err);
  // Prints "Space Ghost is a talk show host".)
})
/*
user.update({email:'ahmad1@123'},{$set: {"requests":[]}},function (err, user) {
  if (err) return handleError(err);
  // Prints "Space Ghost is a talk show host".)
})
*/



// server started listening on port 3000.
 var server = app.listen(PORT, () => console.log("server running on :" + PORT))

const sessiony = session({
  secret: "secret",
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  cookie: {secure: false,
    httpOnly: true,
    sameSite: true,
    maxAge: 1000 * 60 * 60 * 24
}
});

 // start web socket
 var clients = []
const io = require('socket.io')(server)
io.use(sharedsession(sessiony));
file1 = require('./socket')(io,message,user,notify,clients)



app.use(cookieParser());


app.use(sessiony);

// miidleware that parses incoming requests with JSON payloads 
app.use(express.json())

// body parser middleware used to parse the request body.
app.use(bodyParser.urlencoded())


// using handlebars templating engine
var exphbs  = require('express-handlebars');
const e = require('express');

app.engine('handlebars', exphbs({extname: "hbs", defaultLayout: false}));
app.set('view engine', 'handlebars');

const publicPath = path.join(__dirname, '/public');

app.use(express.static(publicPath))

// protection layer for accesing the site without authentication
const redirectlogin = (req,res,next) => {
  if(!req.session.User_id) {
    res.redirect('login')
  }
  else{
    next()
  }
}

//redirect the user to home page if he is already logged in 
const redirecthome = (req,res,next) => {
  if(req.session.User_id) {
    res.redirect('/')
  }
  else{
    next()
  }
}

// get request for login page
app.get('/', redirectlogin, function (req, res) {
    let username = req.session.username
    res.render('main',{
      user_authenticated: req.session.User_id,
      user_username: username
    });
});

app.get('/login', redirecthome, function (req, res) {
  res.render('login');
});


//Login Post route for Login form.
app.post('/login', redirecthome, async function(req,res) {
  try{
  const email = req.body.email
  const password = req.body.password
  var flag = false
   user.find({ 'email': email },'email password username', async function (err, user) {
    if (err) return handleError(err);
    
    if(user.length==1){
      const resk = await bcrypt.compare(password,user[0].password)
      if(resk){
        req.session.User_id = user[0]._id
        req.session.username = user[0].username
        return res.redirect('/')
      }
    }
    else{
      return res.render('login',{
        error:"Email or password incorrect"
      })
    }
    }
  )
}
catch{
  return res.render('login',{
    error:"There is some error currently. Please login later."
  })
}
})  




// get request for register page
app.get('/Register', redirecthome, function (req, res) {
  res.render('Register');
});



//Register Post route for register form.
app.post('/Register', redirecthome, async function(req,res) {
  try{

    if(await req.body.username.length<=0 || req.body.username.length>30){
      res.render('Register',{
        error: "Please enter username between 0 and 30 characters"
      });
      return
    }
    if(req.body.email.length<=0 || req.body.email.length>30){
      res.render('Register',{
        error: "Please enter email between 0 and 30 characters"
      });
      return
    }
    if(req.body.password.length<=0 || req.body.password.length>60){
      res.render('Register',{
        error: "Please enter password between 0 and 60 characters"
      });
      return
    }
    if(req.body.password!=req.body.confirmation){
      res.render('Register',{
        error: "The confirmation password is not correct"
      });
      return
    }
    user.find({ 'email': req.body.email }, async function (err, user) {
      if (err) return handleError(err);
      // Prints "Space Ghost is a talk show host".
      if(user.length>=1){
        return res.render('Register',{
          error:"Email already exists!."
        })
      }
    });
    const salt = await bcrypt.genSalt()
    const hashed_password = await bcrypt.hash(req.body.password,salt)
    await new user({  username: req.body.username, email: req.body.email, password: hashed_password, online_status: true }).save()
     
   user.find({ 'email': req.body.email }, '_id username' ,async function (err, user) {
    if (err) return handleError(err);
    if(user.length==1){
      console.log(user[0]._id+user[0].username)
      req.session.User_id = user[0]._id
      req.session.username = user[0].username
      return res.redirect('/')
    }
  });
 

  }
  catch{
    res.render('Register',{
      error: "There is some error. Please Register Later."
    });
  }
})

//logout route
app.get('/logout',redirectlogin,function(req,res){
  req.session.destroy(err => {
    if(err) {
      return res.redirect('/')
    }
    res.clearCookie('connect.sid')
    req.session.destroy()
    res.redirect('login')
  }
    )
})


// add-contact
app.post('/add-contact',redirectlogin, async function(req,res){
  try{
    var contact_id = null
    var username = null
    user.find({ 'email': req.body.content }, async function (err, userx) {
      if (err) return handleError(err);
      if(userx.length==0){
        return res.status(400).json({
          "error": "No such User found."
        })
      }
      contact_id = userx[0]._id
      username = userx[0].username

      user.find({$and: [{'_id':req.session.User_id},{$or:[{'contacts': contact_id},{'outgoing_requests': contact_id}]}]}, async function (err, userx) {
        if (err) throw(err);
        if(userx.length>=1){
           return res.status(400).json({
            "error": "Request already sent"
          })
        }
        const update = { $push: { outgoing_requests: contact_id } };
        user.update({'_id':req.session.User_id},update, async function (err, userx){
        if (err) throw(err);
        user.update({'_id':contact_id},{ $push: { requests: req.session.User_id } }, async function (err, userx){
          if (err) throw(err);
          return res.status(201).json({
          "info": "friend request send",
          })
        
      });
          
    })
      });
    })
}
  catch{
   return res.status(400).json({
      "error": "Something went wrong. please try later."
    })
  }
})

app.post('/accept-request',redirectlogin, async function(req,res){
  try{
    var contact_id = req.body.contact_id
    var username = req.body.username
    console.log(contact_id)
    console.log(username)
        const update = { $push: { contacts: contact_id } };
        user.update({'_id':req.session.User_id},update, async function (err, userx){
        if (err) throw(err);
        user.update({'_id':req.session.User_id},{$pull: { requests: contact_id }}, async function (err, userx){
          if (err) throw(err);
        user.update({'_id':req.body.contact_id},{ $push: { contacts: req.session.User_id }}, async function (err, userx){
          if (err) throw(err);
          user.update({'_id':req.body.contact_id},{$pull: { outgoing_requests: req.session.User_id} }, async function (err, userx){
          return res.status(201).json({
          "contact_id": contact_id,
          "username": username
          })
        })
      });
    })
  })
}
  catch{
   return res.status(400).json({
      "error": "Something went wrong. please try later."
    })
  }
})

app.post('/reject-request',redirectlogin, async function(req,res){
  try{
    var contact_id = req.body.contact_id
    var username = req.body.username
        const update = { $pull: { requests: contact_id }  };
        user.update({'_id':req.session.User_id},update, async function (err, userx){
        if (err) throw(err);
        user.update({'_id':req.body.contact_id},{ $pull: { outgoing_requests: req.session.User_id }}, async function (err, userx){
          if (err) throw(err);
          return res.status(201).json({
          "info": "request rejected"
          })
        
      });
    })
}
  catch{
   return res.status(400).json({
      "error": "Something went wrong. please try later."
    })
  }
})


app.post('/retrieve-requests',redirectlogin,async function(req,res){
  try{
    var count=0;
    user.findOne({ '_id': req.session.User_id }).populate('requests').exec(async (err, user) => {
      var contacts = user.requests
      if(contacts.length===0){
        res.status(401).json({
          "info": "no record found"
        })
      }
      else{
        if(contacts.length-req.body.count<10){
        count = contacts.length-req.body.count
        result=contacts.slice(req.body.count,contacts.length)
      }
      else{
        result=contacts.slice(req.body.count,req.body.count+10)
        count=10
      }
      function find_message(query) {
        return new Promise( (resolve, reject) => {
           message.find(query).sort({created_at: -1}).exec((err, message) => {
             if(err){
               return reject(err);
             }
             resolve(message);
        })
      })
    }
      
      var value = []
      for(let i=0;i<result.length;i++){
            value.push({Username: result[i].username, User_id: result[i]._id})
      }
      res.status(201).json({
        "info": "record found",
        "count": count,
        "result": value,
      })
    }
    })
}
  catch{
    res.status(400).json({
      "error": "Something went wrong. please try later."
    })
  }
})




// retrieving contacts information
app.post('/retrieve-contacts',redirectlogin,async function(req,res){
  try{
    var count=0;
    user.findOne({ '_id': req.session.User_id }).populate('contacts').exec(async (err, user) => {
      var contacts = user.contacts
      if(contacts.length===0){
        res.status(401).json({
          "info": "no record found"
        })
      }
      else{
        if(contacts.length-req.body.count<10){
        count = contacts.length-req.body.count
        result=contacts.slice(req.body.count,contacts.length)
      }
      else{
        result=contacts.slice(req.body.count,req.body.count+10)
        count=10
      }
      function find_message(query) {
        return new Promise( (resolve, reject) => {
           message.find(query).sort({created_at: -1}).exec((err, message) => {
             if(err){
               return reject(err);
             }
             resolve(message);
        })
      })
    }
      
      var value = []
      for(let i=0;i<result.length;i++){
        let messagex = await find_message({$or:[{$and:[{sender: req.session.User_id},{reciever: result[i]._id}]},{$and:[{sender: result[i]._id},{reciever: req.session.User_id}]}]})
        console.log(messagex)
          if(messagex.length!=0){
        value.push({Username: result[i].username,Content:messagex,User_id: result[i]._id})
          }
          else{
            value.push({Username: result[i].username, User_id: result[i]._id})
          }
      }
      res.status(201).json({
        "info": "record found",
        "count": count,
        "result": value,
      })
    }
    })
}
  catch{
    res.status(400).json({
      "error": "Something went wrong. please try later."
    })
  }
})

/*
app.post('/retrieve-messages',redirectlogin,async function(req,res){
  try{
    var count=10;
    function find_message(query) {
      return new Promise( (resolve, reject) => {
         message.find(query).sort({created_at: -1}).limit(10).exec((err, message) => {
           if(err){
             return reject(err);
           }
           resolve(message);
      })
    })
  }
  let messagex = await find_message({$or:[{$and:[{sender: req.session.User_id},{reciever: req.body.contact_id}]},{$and:[{sender: req.body.contact_id},{reciever: req.session.User_id}]}]})
      if(messagex.length===0){
        return res.status(401).json({
          "info": "no record found"
        })
      }
      else{
        if(messagex.length-req.body.count<=0){
          return res.status(401).json({
            "info": "now new messages"
          })
        }
        }
        if(messagex.length-req.body.count<10){
        count = messagex.length-req.body.count
        result = messagex.slice(req.body.count,messagex.length)
      }
      else{
        result=contacts.slice(req.body.count,req.body.count+10)
        count=10
      }
      
      res.status(201).json({
        "info": "record found",
        "count": count,
        "result": result
      })
    }
    

  catch{
    res.status(400).json({
      "error": "Something went wrong. please try later."
    })
  }
})
*/
 
  










