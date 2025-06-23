import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

function ChatWindow({ character, messages, onSendMessage }) {
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (messageText.trim()) {
      onSendMessage(messageText);
      setMessageText('');
    }
  };
  
  if (!character) {
    return (
      <div className="chat-window empty-state">
        <div className="empty-message">
          <h2>Select a character to start interview</h2>
          <p>Or create a new interviewer from the sidebar</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="character-info">
          <h2>{character.companyName}</h2>
        </div>
      </div>
      
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="empty-chat">
            <p>Start interview with {character.companyName}</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div 
              key={index} 
              className={`message ${message.role === 'user' ? 'user-message' : 'bot-message'}`}
            >
              <div className="message-content">{message.content}</div>
              <div className="message-timestamp">
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form className="message-input-container" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={`Message ${character.companyName}...`}
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          className="message-input"
        />
        <button 
          type="submit" 
          disabled={!messageText.trim()}
          className="send-button"
          aria-label="Send message"
        >
          <Send />
        </button>
      </form>
    </div>
  );
}

export default ChatWindow;