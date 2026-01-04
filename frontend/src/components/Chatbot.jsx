import { useState } from 'react';
import chatbotService from '../services/chatbotService';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: 'Hi! I can help you with tax-related questions.', isBot: true }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { text: input, isBot: false };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const { response } = await chatbotService.sendMessage(input);
            setMessages(prev => [...prev, { text: response, isBot: true }]);
        } catch (error) {
            setMessages(prev => [...prev, { text: 'Sorry, I encountered an error.', isBot: true }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="chatbot-container">
            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <h3>Tax Assistant</h3>
                        <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '20px' }}>×</button>
                    </div>
                    <div className="chatbot-messages">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`message ${msg.isBot ? 'message-bot' : 'message-user'}`} style={{ whiteSpace: 'pre-wrap' }}>
                                {msg.text}
                            </div>
                        ))}
                        {loading && <div className="message message-bot">Typing...</div>}
                    </div>
                    <div className="chatbot-input">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                            placeholder="Ask a question..."
                        />
                        <button onClick={sendMessage} className="btn btn-primary">Send</button>
                    </div>
                </div>
            )}
            <button className="chatbot-button" onClick={() => setIsOpen(!isOpen)}>
                💬
            </button>
        </div>
    );
};

export default Chatbot;
