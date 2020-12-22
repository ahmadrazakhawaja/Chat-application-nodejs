const socket = io();

        socket.on('connect', () => {
          console.log('connected')
        });

        function insert_message(text,chat,sender) {
          
          if(chat.querySelector('.no-messages')){
            add = chat.querySelector('.no-messages')
         }
         else if(chat.querySelector('.message')){
           add = chat.querySelector('.message')
         }
         else if(chat.querySelector('.message me')){
           add = chat.querySelector('.message me')
         }
         
         if(sender){
          add.parentElement.innerHTML = add.parentElement.innerHTML+` <div class="message me">
          <div class="text-main">
              <div class="text-group me">
                  <div class="text me">
                      <p>${text}</p>
                  </div>
              </div>
              <span>11:07 PM</span>
          </div>
      </div>`
         }
         else{
         add.parentElement.innerHTML = add.parentElement.innerHTML+`<div class="message">
         <img class="avatar-md" src="/img/avatars/blank-avatar.jpg" data-toggle="tooltip" data-placement="top" title="" alt="avatar" data-original-title="Keith">
         <div class="text-main">
           <div class="text-group">
             <div class="text">
               <p>${text}</p>
             </div>
           </div>
           <span>11:07 PM</span>
         </div>
       </div>`
         }
        }


        socket.on('message', function(data){
          let sender_username = data.sender_username;
          let sender_id = data.sender_id;
          let text = data.text;
          let query = `#${sender_username}`
          console.log(query)
          let chat = document.querySelector(query)
          insert_message(text,chat,false)
          
          }
          
      );

        document.body.addEventListener('click',function(e){
          if(!document.querySelector('.babble.tab-pane.fade.active.show').querySelector('.no-messages.request')){
          console.log(e.target.parentNode.className)
          if( e.target.parentNode.className === 'btn send' ){
            let form = e.target.parentNode.parentNode
            console.log(form)
            let text = form.querySelector('.message').value
            let reciever_id = form.querySelector('#user_id').value
            console.log(text)
            socket.emit('message', {text: text, reciever_id: reciever_id} );
            console.log(form.parentNode.parentNode.parentNode.parentNode)
            insert_message(text,form.parentNode.parentNode.parentNode.parentNode,true)
            return false
          }
        }
        })


        document.querySelector('.add-contact').onsubmit = function () {
        
            socket.emit('send_request', {contact_email: document.querySelector('#user').value} );
          
        }

        socket.on('disconnect', function(){
          // Do stuff (probably some jQuery)
      });

      socket.on('notify',function(data) {
        document.querySelector('#alerts').innerHTML = document.querySelector('#alerts').innerHTML+ `
        <a href="#" class="filterNotifications all latest notification" data-toggle="list">
												<img class="avatar-md" src="/img/avatars/blank-avatar.jpg" data-toggle="tooltip" data-placement="top" title="" alt="avatar" data-original-title="Mariette">
												<div class="status">
													<i class="material-icons online">fiber_manual_record</i>
												</div>
												<div class="data">
													<p>${data.body}</p>
												</div>
											</a>
        `
      })




      socket.on('request', function (data) {
        let username = data.sender_username
        let user_id = data.sender_id
        document.querySelector('#chats').innerHTML=document.querySelector('#chats').innerHTML+`
      <a href="#${username}" class="filterDiscussions all unread single" id="list-chat-list5" data-toggle="list" role="tab">
      <img class="avatar-md" src="/img/avatars/blank-avatar.jpg" data-toggle="tooltip" data-placement="top" title="" alt="avatar" data-original-title="Ryan">
                                          <div class="status">
                                              <i class="material-icons offline">fiber_manual_record</i>
                                          </div>
                                          <div class="data">
                                              <h5>${username}</h5>
                                              <span>Thu</span>
                                          </div>
                                      </a>
                                      `
                                      document.querySelector('#nav-tabContent').innerHTML = document.querySelector('#nav-tabContent').innerHTML+ `
                                      <!-- Start of Babble -->
                                      <div class="babble tab-pane fade" id="${username}" role="tabpanel" aria-labelledby="list-empty-list">
                                      <input type="hidden" id="user_id2" name="custId" value="${user_id}">
                                          <!-- Start of Chat -->
                                          <div class="chat" id="chat2">
                                              <div class="top">
                                                  <div class="container">
                                                      <div class="col-md-12">
                                                          <div class="inside">
                                                              <a href="#"><img class="avatar-md" src="/img/avatars/blank-avatar.jpg" data-toggle="tooltip" data-placement="top" title="Lean" alt="avatar"></a>
                                                              <div class="status">
                                                                  <i class="material-icons offline">fiber_manual_record</i>
                                                              </div>
                                                              <div class="data">
                                                                  <h5><a href="#">${username}</a></h5>
                                                                  <span>Inactive</span>
                                                              </div>
                                                              <button class="btn connect d-md-block d-none" name="2"><i class="material-icons md-30">phone_in_talk</i></button>
                                                              <button class="btn connect d-md-block d-none" name="2"><i class="material-icons md-36">videocam</i></button>
                                                              <button class="btn d-md-block d-none"><i class="material-icons md-30">info</i></button>
                                                              <div class="dropdown">
                                                                  <button class="btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="material-icons md-30">more_vert</i></button>
                                                                  <div class="dropdown-menu dropdown-menu-right">
                                                                      <button class="dropdown-item connect" name="2"><i class="material-icons">phone_in_talk</i>Voice Call</button>
                                                                      <button class="dropdown-item connect" name="2"><i class="material-icons">videocam</i>Video Call</button>
                                                                      <hr>
                                                                      <button class="dropdown-item"><i class="material-icons">clear</i>Clear History</button>
                                                                      <button class="dropdown-item"><i class="material-icons">block</i>Block Contact</button>
                                                                      <button class="dropdown-item"><i class="material-icons">delete</i>Delete Contact</button>
                                                                  </div>
                                                              </div>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                              <div class="content empty">
                                                  <div class="container">
                                                      <div class="col-md-12">
                                                      <div class="no-messages request">
                                                      <a href="#"><img class="avatar-xl" src="/img/avatars/blank-avatar.jpg" data-toggle="tooltip" data-placement="top" title="" alt="avatar" data-original-title=${username}></a>
                                                      <h5>${username} would like to add you as a contact. <span>Hi, I'd like to add you as a contact.</span></h5>
                                                      <div class="options">
                                                          <button class="btn button" id='accept'><i class="material-icons">check</i></button>
                                                          <button class="btn button" id='reject'><i class="material-icons">close</i></button>
                                                      </div>
                                                  </div>
                                                      </div>
                                                  </div>
                                              </div>
                                              <div class="container">
                                                  <div class="col-md-12">
                                                  <div class="bottom">
                                                          <form class="position-relative w-100 message_form" onsubmit="return false">
                                                              <textarea class="form-control message" placeholder="Start typing for reply..." rows="1"></textarea>
                                                              <input type="hidden" id="user_id" name="custId" value="${user_id}">
                                                              <button class="btn emoticons"><i class="material-icons">insert_emoticon</i></button>
                                                              <button class="btn send"><i class="material-icons">send</i></button>
                                                          </form>
                                                          <label>
                                                              <input type="file">
                                                              <span class="btn attach d-sm-block d-none"><i class="material-icons">attach_file</i></span>
                                                          </label> 
                                                      </div>   
                                                  </div>
                                              </div>
                                          </div>
                                          <!-- End of Chat -->
                                          <!-- Start of Call -->
                                          <div class="call" id="call2">
                                              <div class="content">
                                                  <div class="container">
                                                      <div class="col-md-12">
                                                          <div class="inside">
                                                              <div class="panel">
                                                                  <div class="participant">
                                                                      <img class="avatar-xxl" src="/img/avatars/avatar-female-2.jpg" alt="avatar">
                                                                      <span>Connecting</span>
                                                                  </div>							
                                                                  <div class="options">
                                                                      <button class="btn option"><i class="material-icons md-30">mic</i></button>
                                                                      <button class="btn option"><i class="material-icons md-30">videocam</i></button>
                                                                      <button class="btn option call-end"><i class="material-icons md-30">call_end</i></button>
                                                                      <button class="btn option"><i class="material-icons md-30">person_add</i></button>
                                                                      <button class="btn option"><i class="material-icons md-30">volume_up</i></button>
                                                                  </div>
                                                                  <button class="btn back" name="2"><i class="material-icons md-24">chat</i></button>
                                                              </div>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                          <!-- End of Call -->
                                      </div>
                                      <!-- End of Babble -->`
                      })
                      /*
                      document.querySelector('.filterDiscussions.all.unread.single').onclick = setTimeout(function() {
                        let id = document.querySelector('.babble.tab-pane.fade.active.show').id
                        let username = document.querySelector('.babble.tab-pane.fade.active.show').querySelector('#user_id2').value
                        socket.emit('check_status', {user_id: id} );
                      },3000)

                      socket.on('check_status', function(data){
                        console.log(data.status)
                        let a = document.querySelector('.babble.tab-pane.fade.active.show').querySelector('.material-icons.offline')
                          let b = document.querySelector('.babble.tab-pane.fade.active.show').querySelector('.inside').querySelector('.data').getElementsByTagName('span')
                          if(!a){
                            a = document.querySelector('.babble.tab-pane.fade.active.show').querySelector('.material-icons.online')
                          }
                        if(data.status){
                            a.className='material-icons online'
                            b.innerHTML = 'active'
                          }
                          else{
                            a.className='material-icons offline'
                            b.innerHTML = 'Inactive'
                          }
                        })
                        */
                        
                        
                        
                      
                      
        

          