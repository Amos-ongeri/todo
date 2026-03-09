import { useState } from "react";
import "./Chat.css";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

function Chat() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { sender: "assistant", text: "Hi! How can I help you?" }
  ]);

  const sendMessage = async () => {
    if (!message.trim()) return; // don't send empty messages

    // Add user message
    setChatHistory(prev => [...prev, { sender: "user", text: message }]);

    try {
      const res = await fetch("http://localhost:5000/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      console.log(data);

      // Add assistant reply
      setChatHistory(prev => [...prev, { sender: "assistant", text: data.reply }]);
      setMessage(""); // clear input
    } catch (err) {
      console.error(err);
      setChatHistory(prev => [...prev, { sender: "assistant", text: "Error: could not reach assistant." }]);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        className="chat-toggle-btn"
        onClick={() => setOpen(prev => !prev)}
        title={open ? "Close chat" : "Open chat"}
      >
        <IoChatbubbleEllipsesOutline />
      </button>

      {/* Chat Popup */}
      {open && (
        <div className="chat-popup">
          <div className="chat-header">
            <span>Chat</span>
            <button className="chat-close-btn" onClick={() => setOpen(false)}>
              &times;
            </button>
          </div>

          <div className="chat-body">
            <div className="chat-messages">
              {chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`chat-message chat-message-${msg.sender}`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <form
              className="chat-form"
              onSubmit={e => {
                e.preventDefault();
                sendMessage();
              }}
            >
              <input
                className="chat-input"
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
              <button className="chat-send-btn" type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Chat;
