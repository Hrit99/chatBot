async function initializeChats() {
    let chats = []
    try{
     resp = await fetch("%SERVER_URL%/allchats");
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


const socket = io("%SERVER_URL%");
const onSendClicked = ()=> {
    let message = document.getElementById("message-input").value
    if(message !== ""){
        document.getElementById("chat").innerHTML += ` <div class="message sent">
        <div class="message-content">${message}</div>
    </div>`
    document.getElementById("message-input").value = ""
        socket.emit("usermessage", message)
    }
}


socket.on('servermessage', async function (prompt) {
    document.getElementById("chat").innerHTML += `<div class="message received">
    <div class="message-content">${prompt}</div>
</div>`
  });


  socket.on('servermessageerror', async function (prompt) {
    document.getElementById("chat").innerHTML += `<div class="message received">
    <div class="message-content">Netwrok error occured!!</div>
</div>`
  });

