// ChatWindow.jsx
import React from 'react';
import { Search, Menu, Send, Mic } from 'lucide-react';
import './chat.css';

const ChatWindow = () => {
  return (
    <div className="chat-container">
      {/* Left Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <Menu className="menu-icon" />
        </div>

        <div className="search-container">
          <div className="search-wrapper">
            <Search className="search-icon" />
            <input type="text" placeholder="Pesquisar chat" className="search-input" />
          </div>
        </div>

        <div className="chat-list">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="chat-list-item">
              <div className="avatar" />
              <div className="chat-info">
                <div className="chat-name">Suporte ADMIN</div>
                <div className="chat-preview">Pesquisar chat</div>
              </div>
              {i === 1 && <div className="unread-badge">1</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="main-chat">
        <div className="chat-header">
          <div className="header-user-info">
            <div className="avatar" />
            <div className="user-details">
              <div className="user-name">Suporte ADMIN</div>
              <div className="user-status">ONLINE</div>
            </div>
          </div>
          <img
            src="/api/placeholder/32/32"
            alt="User"
            className="header-avatar"
          />
        </div>

        <div className="messages-container">
          {/* Received Message */}
          <div className="message received">
            <div className="avatar small" />
            <div className="message-content">
              <p>Lorem ipsum has been the industry's standard dummy text ever since the 1500s.</p>
              <span className="timestamp">9:00 PM</span>
            </div>
          </div>

          {/* Sent Message */}
          <div className="message sent">
            <div className="message-content">
              <p>Lorem ipsum has been the industry's standard dummy text ever since the 1500s.</p>
              <span className="timestamp">9:00 PM</span>
            </div>
            <div className="avatar small" />
          </div>
        </div>

        <div className="input-container">
          <div className="input-wrapper">
            <input type="text" placeholder="Digite a mensagem" className="message-input" />
            <div className="input-actions">
              <Mic className="mic-icon" />
              <Send className="send-icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
