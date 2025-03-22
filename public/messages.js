document.getElementById("msg").addEventListener("keydown", function(event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault(); // Empêche le retour à la ligne
        send_to_ia();
    }
});

function send_to_ia() {
    let msg = document.getElementById("msg").value;
    if (msg.trim() !== "") {
        socket.emit("msg_user", { content: msg });

        const chatContainer = document.getElementById("chat-container");

        const userWrapper = document.createElement("div");
        userWrapper.style.display = "flex";
        userWrapper.style.flexDirection = "column";
        userWrapper.style.alignItems = "flex-end";

        const userHeader = document.createElement("div");
        userHeader.className = "message-header";
        userHeader.textContent = "Vous";
        userHeader.style.marginRight = "7px";

        const userMessage = document.createElement("div");
        userMessage.className = "user-message";
        userMessage.textContent = msg;
        userMessage.style.maxWidth = "500px";

        userWrapper.appendChild(userHeader);
        userWrapper.appendChild(userMessage);
        chatContainer.appendChild(userWrapper);

        document.getElementById("msg").value = "";

        setTimeout(() => {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }, 100);
    }
}

socket.on("msg_ia", data => {
    const chatContainer = document.getElementById("chat-container");

    const iaWrapper = document.createElement("div");
    iaWrapper.style.display = "flex";
    iaWrapper.style.flexDirection = "column";
    iaWrapper.style.alignItems = "flex-start";

    const iaHeader = document.createElement("div");
    iaHeader.className = "message-header";
    iaHeader.textContent = "Californyan";
    iaHeader.style.marginLeft = "53px";

    const iaMessageContainer = document.createElement("div");
    iaMessageContainer.style.display = "flex";
    iaMessageContainer.style.alignItems = "center"; 

    const iaIcon = document.createElement("img");
    iaIcon.src = "/image/californyan_icon.png";
    iaIcon.alt = "Icon de Californyan";
    iaMessageContainer.style.alignItems = "flex-start";
    iaIcon.style.marginRight = "7px";
    iaIcon.style.marginTop = "7px";

    iaIcon.style.flexShrink = "0";
    iaIcon.style.width = "40px";

    const iaMessage = document.createElement("div");
    iaMessage.className = "ia-message";
    iaMessage.textContent = data.content;
    iaMessage.style.maxWidth = "500px";

    iaMessageContainer.appendChild(iaIcon);
    iaMessageContainer.appendChild(iaMessage);

    iaWrapper.appendChild(iaHeader);
    iaWrapper.appendChild(iaMessageContainer);
    chatContainer.appendChild(iaWrapper);

    setTimeout(() => {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 100);
});
