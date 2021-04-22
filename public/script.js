const socket = io.connect();

const chatWindow = document.querySelector(".chat-window");
const chat = document.querySelector(".chat-form");
const input = document.querySelector(".chat-input");
const sendBTN = document.querySelector(".chat-submit");
// sendBTN.style.display = "hide";

const renderMessage = (message) => {
  const div = document.createElement("div");
  div.classList.add("render-message");
  div.innerText = message;
  chatWindow.appendChild(div);
};

socket.on("chat", (message) => {
  renderMessage(message);
  console.log("from server: ", message);
});

// socket.on("chat", (message) => {
//   renderMessage(message);
//   // console.log("from server: ", message);
// });

chat.addEventListener("submit", (event) => {
  event.preventDefault();

  socket.emit("chat", input.value);
  input.value = "";
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("./sw.js").then(
      function (registration) {
        // Registration was successful
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );
      },
      function (err) {
        // registration failed :(
        console.log("ServiceWorker registration failed: ", err);
      }
    );
  });
}

let deferredPrompt;
// var div = document.querySelector(".add-to");
var button = document.querySelector("#add-to");
button.style.display = "none";

window.addEventListener("beforeinstallprompt", (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  button.style.display = "block";

  button.addEventListener("click", (e) => {
    // hide our user interface that shows our A2HS button
    button.style.display = "none";
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the A2HS prompt");
      } else {
        console.log("User dismissed the A2HS prompt");
      }
      deferredPrompt = null;
    });
  });
});
