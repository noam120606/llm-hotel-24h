document.getElementById("msg").addEventListener("keydown", function(event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
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

        // Création de l'élément de chargement
        const iaWrapper = document.createElement("div");
        iaWrapper.style.display = "flex";
        iaWrapper.style.flexDirection = "column";
        iaWrapper.style.alignItems = "flex-start";
        iaWrapper.className = "ia-wrapper-loading";

        const iaHeader = document.createElement("div");
        iaHeader.className = "message-header";
        iaHeader.textContent = "Californyan";
        iaHeader.style.marginLeft = "53px";

        const iaMessageContainer = document.createElement("div");
        iaMessageContainer.className = "ia-message-container";

        const loadingIcon = document.createElement("div");
        loadingIcon.className = "loading-icon";
        loadingIcon.style.width = "30px";
        loadingIcon.style.height = "30px";
        loadingIcon.style.border = "4px solid rgba(128, 109, 109, 0.42)";
        loadingIcon.style.borderTop = "4px solid #c7acac6b";
        loadingIcon.style.borderRadius = "50%";
        loadingIcon.style.animation = "spin 1s linear infinite";
        loadingIcon.style.marginRight = "7px";
        loadingIcon.style.marginLeft = "7px";
        loadingIcon.style.marginTop = "7px";
        loadingIcon.style.flexShrink = "0";

        iaMessageContainer.appendChild(loadingIcon);
        iaWrapper.appendChild(iaHeader);
        iaWrapper.appendChild(iaMessageContainer);
        chatContainer.appendChild(iaWrapper);

        setTimeout(() => {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }, 100);
    }
}

socket.on("msg_ia", data => {
    const chatContainer = document.getElementById("chat-container");
    
    // Supprimer l'élément de chargement
    const loadingElement = document.querySelector(".ia-wrapper-loading");
    if (loadingElement) {
        loadingElement.remove();
    }
    
    const iaWrapper = document.createElement("div");
    iaWrapper.style.display = "flex";
    iaWrapper.style.flexDirection = "column";
    iaWrapper.style.alignItems = "flex-start";

    const iaHeader = document.createElement("div");
    iaHeader.className = "message-header";
    iaHeader.textContent = "Californyan";
    iaHeader.style.marginLeft = "53px";

    const iaMessageContainer = document.createElement("div");
    iaMessageContainer.className = "ia-message-container";

    const iaIcon = document.createElement("img");
    iaIcon.className = "icon-img";
    iaIcon.src = "/image/californyan_icon.png";
    iaIcon.alt = "Icon de Californyan";
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

socket.on("audio_result", data => {
    const url = `/audio/${data.fileName}`;
    const audio = new Audio(url);
    audio.play();
});

socket.on("audio_error", data => {
    console.error('Error generating audio:', data.message);
});

// Ajout du CSS pour l'animation du chargement
document.head.insertAdjacentHTML("beforeend", `
<style>
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
`);
