
///initializing chats : reading it from mongodb database using created endpoint
async function initializeChats() {
    let chats = []
    try{
     resp = await fetch("https://chatbotopenai-en7k.onrender.com/allchats");
     chats = await resp.json();
    }
    catch(error){
      chats = []
    }
chats.forEach((chat) => {
    if(chat.sender == "user"){
        document.getElementById("chat").innerHTML += ` <div class="message sent">
        <div class="message-content">${chat.content}</div>
    </div>`
    } else  if(chat.sender == "openai"){
        document.getElementById("chat").innerHTML += `<div class="message received">
        <div class="message-content">${chat.content}</div>
    </div>`
    }
})
  }


const socket = io("https://chatbotopenai-en7k.onrender.com");

//executing emit on a message is clicked to be sent
const onSendClicked = ()=> {
    let message = document.getElementById("message-input").value
    if(message !== ""){
        //updating screen when message is sent
        document.getElementById("chat").innerHTML += ` <div class="message sent">
        <div class="message-content">${message}</div>
    </div>`
    document.getElementById("message-input").value = ""
        socket.emit("usermessage", message)
    }
}



//updating screen when message is recieved from the server
socket.on('servermessage', async function (prompt) {
    document.getElementById("chat").innerHTML += `<div class="message received">
    <div class="message-content">${prompt}</div>
</div>`
  });


  //updating screen when there is some error 
  socket.on('servermessageerror', async function (prompt) {
    document.getElementById("chat").innerHTML += `<div class="message received">
    <div class="message-content">Netwrok error occured!!</div>
</div>`
  });

