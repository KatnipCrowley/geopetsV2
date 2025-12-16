import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Chat.css';

interface Message {
    id: number;
    text: string;
    isMine: boolean;
    timestamp: string;
}

const Chat: React.FC = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');

    const generateLoremIpsum = (): string => {
        const words = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod'];
        const length = Math.floor(Math.random() * 16) + 5; // 5-20 caracteres
        let result = '';

        while (result.length < length) {
            const randomWord = words[Math.floor(Math.random() * words.length)];
            if (result.length + randomWord.length + 1 <= length) {
                result += (result ? ' ' : '') + randomWord;
            } else {
                break;
            }
        }

        return result.trim();
    };

    const handleSend = () => {
        if (!inputValue.trim()) return;

        // Agregar mensaje del usuario
        const newUserMessage: Message = {
            id: messages.length + 1,
            text: inputValue,
            isMine: true,
            timestamp: ''
        };

        setMessages(prev => [...prev, newUserMessage]);
        setInputValue('');

        // Respuesta automática después de un breve delay
        setTimeout(() => {
            const autoReply: Message = {
                id: messages.length + 2,
                text: generateLoremIpsum(),
                isMine: false,
                timestamp: ''
            };
            setMessages(prev => [...prev, autoReply]);
        }, 800);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="chat-container">
            {/* Header */}
            <div className="chat-header">
                <button className="back-button" onClick={() => navigate(-1)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                <div className="user-info">
                    <img
                        src="https://picsum.photos/40/40?random=1"
                        alt="Helena Hills"
                        className="user-avatar"
                    />
                    <div className="user-details">
                        <div className="user-name">Helena Hills</div>
                        <div className="user-status">Activo hace 11 minutos</div>
                    </div>
                </div>

                <div className="header-actions">
                    <button className="action-button">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M22 16.92V19.92C22 20.4723 21.5523 20.92 21 20.92H19C18.4477 20.92 18 20.4723 18 19.92V16.92C18 16.3677 18.4477 15.92 19 15.92H21C21.5523 15.92 22 16.3677 22 16.92Z" stroke="currentColor" strokeWidth="2" />
                            <path d="M6 16.92V19.92C6 20.4723 5.55228 20.92 5 20.92H3C2.44772 20.92 2 20.4723 2 19.92V16.92C2 16.3677 2.44772 15.92 3 15.92H5C5.55228 15.92 6 16.3677 6 16.92Z" stroke="currentColor" strokeWidth="2" />
                            <path d="M18 18H6" stroke="currentColor" strokeWidth="2" />
                            <path d="M22 6V9C22 9.55228 21.5523 10 21 10H19C18.4477 10 18 9.55228 18 9V6C18 5.44772 18.4477 5 19 5H21C21.5523 5 22 5.44772 22 6Z" stroke="currentColor" strokeWidth="2" />
                            <path d="M6 6V9C6 9.55228 5.55228 10 5 10H3C2.44772 10 2 9.55228 2 9V6C2 5.44772 2.44772 5 3 5H5C5.55228 5 6 5.44772 6 6Z" stroke="currentColor" strokeWidth="2" />
                            <path d="M18 7H6" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </button>
                    <button className="action-button">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M23 3.5C23 4.88071 21.8807 6 20.5 6C19.1193 6 18 4.88071 18 3.5C18 2.11929 19.1193 1 20.5 1C21.8807 1 23 2.11929 23 3.5Z" stroke="currentColor" strokeWidth="2" />
                            <path d="M9 12C9 13.3807 7.88071 14.5 6.5 14.5C5.11929 14.5 4 13.3807 4 12C4 10.6193 5.11929 9.5 6.5 9.5C7.88071 9.5 9 10.6193 9 12Z" stroke="currentColor" strokeWidth="2" />
                            <path d="M23 17C23 18.3807 21.8807 19.5 20.5 19.5C19.1193 19.5 18 18.3807 18 17C18 15.6193 19.1193 14.5 20.5 14.5C21.8807 14.5 23 15.6193 23 17Z" stroke="currentColor" strokeWidth="2" />
                            <path d="M18.5 5L9 11" stroke="currentColor" strokeWidth="2" />
                            <path d="M18 17L9.5 12" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div className="messages-container">
                {messages.map((message) => (
                    <div key={message.id} className={`message-wrapper ${message.isMine ? 'mine' : 'theirs'}`}>
                        {!message.isMine && (
                            <img
                                src="https://picsum.photos/24/24?random=1"
                                alt="User"
                                className="message-avatar"
                            />
                        )}
                        <div className="message-content">
                            {message.timestamp && (
                                <div className="message-timestamp">{message.timestamp}</div>
                            )}
                            <div className={`message-bubble ${message.isMine ? 'mine' : 'theirs'}`}>
                                {message.text}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Mensaje..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="message-input"
                />
                <button className="input-action-button">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M19 11C19 7.13401 15.866 4 12 4C8.13401 4 5 7.13401 5 11V17H19V11Z" stroke="currentColor" strokeWidth="2" />
                        <path d="M12 4V1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path d="M12 20V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>
                <button className="input-action-button">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                        <circle cx="8" cy="10" r="1.5" fill="currentColor" />
                        <circle cx="16" cy="10" r="1.5" fill="currentColor" />
                        <path d="M8 15C8.91212 16.2144 10.3643 17 12 17C13.6357 17 15.0879 16.2144 16 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>
                <button className="input-action-button">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                        <path d="M21 15L16 10L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Chat;
