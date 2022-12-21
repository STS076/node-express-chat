(function () {
    const server = 'http://127.0.0.1:3000'
    const socket = io(server);

    socket.on('notification', (data) => {
        console.log('Message depuis le seveur:', data);
    })

    fetch(`${server}/test`).then((res) => {
        return res.json()
    }).then((data) => {
        console.log(data);
    })
})()

let addMessage = document.getElementById("addMessage");
let newMessage = document.getElementById("newMessage");
let dashboard = document.getElementById("dashboard");
let teamChat = document.getElementById("teamChat");
let myDash = document.getElementById("myDash");
let myChat = document.getElementById("myChat");
let allMessages = []; 

function save() {
    if (newMessage.value != " ") {
        addMessage.innerHTML += `<li class="me">
        <div class="name">
            <span class="">Me</span>
        </div>
        <div class="message">
            <p>${newMessage.value}</p>
            <span class="msg-time">5:00 pm</span>
        </div>
    </li>`
    }
}

allMessages.push(newMessage); 
console.log(allMessages)
console.log(newMessage);

function showDash() {
    myChat.style.display = 'none';
    myDash.style.display = 'block';
}

function showChat (){
    myChat.style.display = 'block';
    myDash.style.display = 'none';
}

