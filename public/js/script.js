document.addEventListener('DOMContentLoaded', function() {
    var count = 0;
     var count2 = 0;
    function add_new_contact_dom(data){
        for(let i=0;i<data.length;i++){
        var username = data[i].Username
        document.querySelector('#chats').innerHTML=document.querySelector('#chats').innerHTML+`
        <a href="#list-chat" class="filterDiscussions all unread single" id="list-chat-list5" data-toggle="list" role="tab">
        <img class="avatar-md" src="/img/avatars/blank-avatar.jpg" data-toggle="tooltip" data-placement="top" title="" alt="avatar" data-original-title="Ryan">
												<div class="status">
													<i class="material-icons offline">fiber_manual_record</i>
												</div>
												<div class="data">
													<h5>${username}</h5>
													<span>Thu</span>
													<p>Unfortunately your session today has been cancelled!</p>
												</div>
											</a>
        `
        }
    }

    function add_contact_dom(data){
        for(let i=0;i<data.length;i++){
        var username = data[i].Username
        var user_id = data[i].User_id
        var message = data[i].Content


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


        if(message){
            let messages = ``;
            message.forEach(element => {
                if(element.sender === user_id){
                    let messagex = `
                    <div class="message">
                        <img class="avatar-md" src="/img/avatars/blank-avatar.jpg" data-toggle="tooltip" data-placement="top" title="" alt="avatar" data-original-title="Keith">
                        <div class="text-main">
                            <div class="text-group">
                                <div class="text">
                                    <p>${element.body}</p>
                                </div>
                            </div>
                            <span>${element.time}</span>
                        </div>
                    </div>`
                    messages += messagex
                }
                else{
                    let messagex = `
                    <div class="message me">
                        <div class="text-main">
                            <div class="text-group me">
                                <div class="text me">
                                    <p>${element.body}</p>
                                </div>
                            </div>
                            <span>${element.time}</span>
                        </div>
                    </div>
                    `
                    messages += messagex
                }
            })
            ;
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
                           ${messages}
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
        }
        else{
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
											<div class="no-messages">
												<i class="material-icons md-48">forum</i>
												<p>Seems people are shy to start the chat. Break the ice send the first message.</p>
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
        }
    }

           
        }
        


    function getDocHeight(documentx) {
        var D = documentx;
        return Math.max(
            D.scrollHeight, D.scrollHeight,
            D.offsetHeight, D.offsetHeight,
            D.clientHeight, D.clientHeight
        )
    }

    function amountscrolled(windowx){
        var winheight= windowx.innerHeight || windowx.clientHeight
        var docheight = getDocHeight(windowx)
        var scrollTop = windowx.pageYOffset || windowx.scrollTop
        var trackLength = docheight - winheight
        var pctScrolled = Math.floor(scrollTop/trackLength * 100) // gets percentage scrolled (ie: 80 or NaN if tracklength == 0)
        return pctScrolled
    }

    if(count===0){
        scrollfetch()
    }

    function scrollfetch(){
        if((amountscrolled(document.querySelector('#sidebar'))>70 || count===0) && count!=-1){
            fetch('/retrieve-contacts', {
                method: 'POST',
                body: JSON.stringify({
                    count: count,
                }),
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   }
              })
              .then(response => {
                    if(response.status===201){
                        error = false
                        return response.json()
                    }
                    else{
                        error=true
                        if(response.status===401) {count = -1}
                        return response.json()
                    }
            })
              .then(result => {
                  if(error) {
                    
                    }
                  else{
                    count=count+result.count;
                    add_contact_dom(result.result)
                  }
                  
    
                  
              })
              return false
        }
    }

    function add_message_dom(data,chat,contact_id){
        console.log(data)
        for(let i=0;i<data.length;i++){
                let text = data.body
                let sender_id = data.sender
                if(chat.querySelector('.no-messages')){
                  add = chat.querySelector('.no-messages')
               }
               else if(chat.querySelector('.message')){
                 add = chat.querySelector('.message')
               }
               else if(chat.querySelector('.message me')){
                 add = chat.querySelector('.message me')
               }
               
               if(sender_id!=contact_id){
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
    }


    function fetchrequest(){
        console.log(amountscrolled(document.querySelector('#sidebar')))
        if((amountscrolled(document.querySelector('#sidebar'))>70 || count2===0) && count2!=-1){
            fetch('/retrieve-requests', {
                method: 'POST',
                body: JSON.stringify({
                    count: count2,
                }),
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   }
              })
              .then(response => {
                    if(response.status===201){
                        error = false
                        return response.json()
                    }
                    else{
                        error=true
                        if(response.status===401) {count2 = -1}
                        return response.json()
                    }
            })
              .then(result => {
                  if(error) {
                
                    }
                  else{
                    count2=count2+result.count;
                    add_request_dom(result.result)
                  }
                  
    
                  
              })
              return false
        }
    }

    function add_request_dom(data){
        for(let i=0;i<data.length;i++){
        var username = data[i].Username
        var user_id = data[i].User_id
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
                        }
    }
        
            



    /*
    function messagefetch(){
        let chat_box = document.querySelector('.babble.tab-pane.fade.active.show')
        console.log(amountscrolled(chat_box.querySelector('.chat').querySelector('.content')))
        if((amountscrolled(chat_box.querySelector('.chat').querySelector('.content'))<30 || count2===0)){
            if(chat_box.querySelector('#user_id2')){
            let contact_id = chat_box.querySelector('#user_id2').value
            fetch('/retrieve-messages', {
                method: 'POST',
                body: JSON.stringify({
                    count: count2,
                    contact_id: contact_id


                }),
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   }
              })
              .then(response => {
                    if(response.status===201){
                        error = false
                        return response.json()
                    }
                    else{
                        error=true
                        if(response.status===401) {count2 = -1}
                        return response.json()
                    }
            })
              .then(result => {
                  if(error) {
                    
                    }
                  else{
                    count2=count2+result.count;
                    console.log(count)
                    add_message_dom(result.result,chat_box,contact_id)
                  }
                  
    
                  
              })
              return false
            }
        }
    }
    */


    
    document.querySelector('#sidebar').addEventListener("scroll",scrollfetch,false)
    fetchrequest()
    //document.querySelector('#sidebar').addEventListener("scroll",fetchrequest,false)
    /*
    console.log(document.querySelector('.babble.tab-pane.fade.active.show').querySelector('.chat').querySelector('.content'))
    document.querySelector('.babble.tab-pane.fade.active.show ').querySelector('.chat').querySelector('.content').addEventListener("scroll",messagefetch,false)
    */


    document.querySelector('.add-contact').onsubmit = function() {
        var error = false
        socket.emit('request', {contact_email: document.querySelector('#user').value} );
        fetch('/add-contact', {
            method: 'POST',
            body: JSON.stringify({
                content: document.querySelector('#user').value,
            }),
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               }
          })
          .then(response => {
                if(response.status===201){
                    error = false
                    return response.json()
                }
                else{
                    error=true
                    return response.json()
                }
        })
          .then(result => {
              if(error) {
                alert(result.error)
                }
              else{
                alert('Request Send')
                
              }
              

              
          })
          return false
    }

    document.body.addEventListener('click',function(e){
        console.log(e.target.className)
        console.log(e.target.id)
        if( e.target.id === 'accept' ){
        let username = document.querySelector('.babble.tab-pane.fade.active.show').id
        let contact_id = document.querySelector('.babble.tab-pane.fade.active.show').querySelector('#user_id2').value
            fetch('/accept-request', {
                method: 'POST',
                body: JSON.stringify({
                    contact_id: contact_id,
                    username: username
                }),
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   }
              })
              .then(response => {
                    if(response.status===201){
                        error = false
                        return response.json()
                    }
                    else{
                        error=true
                        return response.json()
                    }
            })
              .then(result => {
                  if(error) {
                    alert(result.error)
                    }
                  else{
                    alert('accepted')
                    let start = document.querySelector('.babble.tab-pane.fade.active.show').querySelector('.content').querySelector('.col-md-12')
                    start.innerHTML = `<div class="no-messages">
                    <i class="material-icons md-48">forum</i>
                    <p>Seems people are shy to start the chat. Break the ice send the first message.</p>
                </div>`
                  }
                  
    
                  
              })
              return false
        }
        
      })

      document.body.addEventListener('click',function(e){
        console.log(e.target.className)
        if( e.target.id === 'reject' ){
        let username = document.querySelector('.babble.tab-pane.fade.active.show').id
        let contact_id = document.querySelector('.babble.tab-pane.fade.active.show').querySelector('#user_id2').value
            fetch('/reject-request', {
                method: 'POST',
                body: JSON.stringify({
                    contact_id: contact_id,
                    username: username
                }),
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   }
              })
              .then(response => {
                    if(response.status===201){
                        error = false
                        return response.json()
                    }
                    else{
                        error=true
                        return response.json()
                    }
            })
              .then(result => {
                  if(error) {
                    alert(result.error)
                    }
                  else{
                    alert('rejected')
                    let start = document.querySelector('.babble.tab-pane.fade.active.show')
                    document.getElementsByTagName("a").forEach(element => {
                      if(element.href===`${username}`){
                          element.remove()
                      }

                  })
                  start.remove()
                 } })
                  
    
                  
              
              return false
        }
        
      })


})
