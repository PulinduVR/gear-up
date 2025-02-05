// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "./chat.css";
import { FaClipboard } from "react-icons/fa";
import OfferForm from "../offer-form/offer-form";

const Chat = () => {
  const messages = [
    {
      name: "Franklin Tavarez",
      message:
        "Are your item is available? Its price is too much per day. So are you ready to nego...",
      date: "16 Sep 2024",
      avatar:
        "https://th.bing.com/th/id/OIP.IrUBHhdMo6wWLFueKNreRwHaHa?rs=1&pid=ImgDetMain",
    },
    {
      name: "Sarah Vinsoff",
      message:
        "Are your item is available? Its price is too much per day. So are you ready to nego...",
      date: "16 Sep 2024",
      avatar:
        "https://th.bing.com/th/id/OIP.1UvglNYc8yU0mDUssyZtYgHaE8?rs=1&pid=ImgDetMain",
      chat: [
        { text: "Hello I need your piano so I put a reservation", sender: "Sarah" },
        { text: "The day rental cost is higher of your piano", sender: "Sarah" },
        {
          text: "So I haven't enough money to buy it for a month. Do you agree for the negotiation?",
          sender: "Sarah",
        },
      ],
    },
    {
      name: "Linkon Davis",
      message:
        "Are your item is available? Its price is too much per day. So are you ready to nego...",
      date: "16 Sep 2024",
      avatar:
        "https://th.bing.com/th/id/OIP.V8AXG6eNLssQ-yiV5FrqqAHaFj?rs=1&pid=ImgDetMain",
    },
    {
      name: "Aeimy Scooper",
      message:
        "Are your item is available? Its price is too much per day. So are you ready to nego...",
      date: "16 Sep 2024",
      avatar:
        "https://thumbs.dreamstime.com/b/happy-person-portrait-smiling-woman-tanned-skin-curly-hair-happy-person-portrait-smiling-young-friendly-woman-197501184.jpg",
    },
  ];

  // States
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [activeTab, setActiveTab] = useState("Unread");

  // Offer Pop-up States
  const [isOfferFormVisible, setIsOfferFormVisible] = useState(false);
  const [prefilledOfferData, setPrefilledOfferData] = useState(null);

  // Open the OfferForm with a blank state
  const handleOpenOfferForm = () => {
    setIsOfferFormVisible(true);
    setPrefilledOfferData(null);
  };

  // Handle the submission of offer data
  const handleOfferFormSubmit = (data) => {
    const updatedUser = {
      ...selectedUser,
      chat: [
        ...(selectedUser.chat || []),
        { text: "Received an offer", sender: "System" },
      ],
      offerData: data,
    };
    setSelectedUser(updatedUser);
  };

  // Handle viewing a received offer (prefill the form)
  const handleReceivedOfferClick = () => {
    if (selectedUser && selectedUser.offerData) {
      setPrefilledOfferData(selectedUser.offerData);
      setIsOfferFormVisible(true);
    }
  };

  // Handle selecting a user from the chat list
  const handleClick = (user) => {
    setSelectedUser(user);
  };

  // Handle sending a new message
  const handleSend = () => {
    if (newMessage.trim() !== "" && selectedUser) {
      const updatedUser = {
        ...selectedUser,
        chat: [
          ...(selectedUser.chat || []),
          { text: newMessage, sender: "Me" },
        ],
      };

      setSelectedUser(updatedUser);
      setNewMessage("");
    }
  };

  // Determine if a message is unread
  const isUnread = (msg) => {
    if (!msg.chat || msg.chat.length === 0) return true; // No chat exists, unread
    const lastMessage = msg.chat[msg.chat.length - 1];
    return lastMessage.sender !== "Me"; // Last message not sent by "Me"
  };

  // Filter messages based on the active tab
  const filteredMessages =
    activeTab === "Unread"
      ? messages.filter(isUnread) // Filter unread messages
      : messages; // All messages

  return (
    <div className="chat-container">
      <div className="chat-card">
        {/* Sidebar */}
        <div className="chat-sidebar">
          <div className="chat-header">
            <button
              className={`tab ${activeTab === "Unread" ? "active" : ""}`}
              onClick={() => setActiveTab("Unread")}
            >
              Unread
            </button>
            <button
              className={`tab ${activeTab === "All" ? "active" : ""}`}
              onClick={() => setActiveTab("All")}
            >
              All
            </button>
          </div>
          <div className="chat-list">
            {filteredMessages.map((msg, index) => (
              <div
                className="chat-item"
                key={index}
                onClick={() => handleClick(msg)}
              >
                <img
                  src={msg.avatar}
                  alt={`${msg.name}'s avatar`}
                  className="chat-avatar"
                />
                <div className="chat-details">
                  <div className="chat-name">{msg.name}</div>
                  <div className="chat-preview">{msg.message}</div>
                </div>
                <div className="chat-date">{msg.date}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="chat-main">
          {selectedUser ? (
            <div>
              <h3>{selectedUser.name}</h3>
              <div className="chat-messages">
  {selectedUser.chat ? (
    selectedUser.chat.map((chat, index) => (
      <div
        key={index}
        className={`chat-message ${chat.sender === "Me" ? "me" : "them"}`}
      >
        {/* Check if the text is "Received an offer" to make it clickable */}
        {chat.text === "Received an offer" ? (
          <p className="clickable-offer" onClick={handleReceivedOfferClick}>
            {chat.text}
          </p>
        ) : (
          <p>{chat.text}</p>
        )}
      </div>
    ))
  ) : (
    <p>No messages yet</p>
  )}
</div>
              {/* Typing Bar */}
              <div className="chat-typing-bar">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <FaClipboard
                  className="clipboard-icon"
                  onClick={handleOpenOfferForm}
                />
                <button onClick={handleSend}>Send</button>
              </div>

              {/* Offer Form */}
              <OfferForm
                isVisible={isOfferFormVisible}
                onClose={() => setIsOfferFormVisible(false)}
                onSubmit={handleOfferFormSubmit}
                prefilledData={prefilledOfferData}
              />
            </div>
          ) : (
            <div className="chat-placeholder">Gearup chat</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
