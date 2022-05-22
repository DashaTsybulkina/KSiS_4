var ws = null;

function Connect() {
    var b_Text = document.getElementById("connect_button");

    ws = new WebSocket("ws://localhost:8080");
    
    function send_message() {
        // Create JSON object containing name and message
        message = {
            // Getting name
            "name" : document.forms["login_form"].name.value,
            // Getting message
            "message" : document.getElementById("message").value,
        }
        ws.send(JSON.stringify(message));
        // Clearing the text from the element after the message is sent
        document.getElementById("message").value = "";
    }

    ws.onopen = () => {
        let name = document.forms["login_form"].name;
        name.setAttribute("disabled", "true");
        ws.send(`${name.value} has entered the chat!`);
        // this runs on successful connection
        // change Connect button to disconnect button here
        b_Text.innerHTML = "Disconnect";
        b_Text.setAttribute("onclick", "ws.close();");        
        document.getElementById("send_button").addEventListener("click", send_message);
    }

    ws.onmessage = (mesg) => {
        // On receiving a message from the server
        let chat_box = document.getElementById("chat_box");
        let displayed_message = document.createElement("p");
        displayed_message.innerHTML = mesg.data;
        chat_box.appendChild(displayed_message);
        chat_box.scrollTop = chat_box.scrollHeight;
    }

    ws.onclose = () => {
        let name = document.forms["login_form"].name;
        name.removeAttribute("disabled");
        ws.send(`${name.value} has left the chat!`);
        b_Text.innerHTML = "Connect";
        // Refresh the page
        // location.reload();
        document.getElementById("connect_button").setAttribute("onclick", "Connect();");
        document.getElementById("send_button").removeEventListener("click", send_message);
    }

    ws.onerror = (e) => {
        console.log(e);
    }

}