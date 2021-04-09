const { func } = require("joi");

/*const mongoose = require('mongoose');
var messagex = mongoose.model('Message');*/
exports = module.exports = function(io,model,model2,model3,clients){
        io.on('connection', socket => {
          socket.on('disconnect',function () {
            let index = clients.findIndex((item) => {return item.user_id===socket.handshake.session.User_id})
            clients.splice(index,1)
        });
          clients.push({user_id:socket.handshake.session.User_id, socket_id: socket.id })
          //console.log(clients)
          socket.on('message', async data=>{ 
            let recipient = clients.find((item) => {return item.user_id===data.reciever_id})
            await new model3({  sender: socket.handshake.session.User_id, reciever: data.reciever_id, body: `${socket.handshake.session.username} has sent message ` }).save()
            if(recipient){
              io.to(recipient.socket_id).emit('message', {text: data.text, sender_id:socket.handshake.session.User_id, sender_username: socket.handshake.session.username  } );
              io.to(recipient.socket_id).emit('notify', {sender_id:socket.handshake.session.User_id, sender_username: socket.handshake.session.username, body: `${socket.handshake.session.username} has sent message `   } );
            }
            //console.log(data.reciever_id)
            //console.log(socket.handshake.session.username)
            //console.log(socket.id)
            new model({'sender':socket.handshake.session.User_id,'reciever': data.reciever_id, body: data.text, timestamp: Date(), recieved: false }).save()
            /*
            connection.query('INSERT INTO MESSAGE (Sender_id,Recipient_id,Content,Recieved,Timestamp) VALUES(?,?,?,?)',[connection.escape(req.body.email)],async function(error,result,fields){
              if(result.length===1){
                return res.render('Register',{
                  error:"Email already exists!."
                })
              }
            })
            */
          })
          socket.on('request', data => {
            
              model2.find({ 'email': data.contact_email }, async function (err, userx) {
                if (err) return handleError(err);
                if(userx.length==0){
                  send = false
                }
                contact_id = JSON.stringify(userx[0]._id)
                username = userx[0].username
                contact_id2 = userx[0]._id
                
                console.log(contact_id)
                let index = clients.findIndex(item => {console.log(item.user_id); console.log(typeof(contact_id))
                   return `"${item.user_id}"` === contact_id})
          
                model2.find({$and: [{'_id':socket.handshake.session.User_id},{'contacts': userx[0]._id}]}, async function (err, userx) {
                  if (err) throw(err);
                  if(userx.length>=1){
                    send = false
                  }
                  console.log(index)
                  if(index>=0){
                    console.log(index)
                  io.to(clients[index].socket_id).emit('request', {sender_id: contact_id2, sender_username: socket.handshake.session.username} );
                  io.to(clients[index].socket_id).emit('notify', {sender_id: socket.handshake.session.User_id, sender_username: socket.handshake.session.username, body: `${socket.handshake.session.username} has sent request `} );
                  }
                });
              })
            }
          )
          /*
          socket.on('check_status', data => {
            let index = clients.findIndex(element => element.user_id === data.user_id)
            if(index){
              socket.emit('check_status', {status: true})
            }
            else{
              socket.emit('check_status', {status: false})
            }

          })
          */

          
        });
  
}

