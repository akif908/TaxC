import { useState } from 'react';
import chatbotService from '../services/chatbotService';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: 'স্বাগতম ! আমি আপনাকে ট্যাক্স সংক্রান্ত বিষয়ে সাহায্য করতে পারি।', isBot: true }
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
            // Send both the current message and the previous history (last 10 messages for context)
            const { response } = await chatbotService.sendMessage(input, messages.slice(-10));
            setMessages(prev => [...prev, { text: response, isBot: true }]);
        } catch (error) {
            setMessages(prev => [...prev, { text: 'দুঃখিত, কোনো একটি সমস্যা হয়েছে।', isBot: true }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="chatbot-container">
            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <h3>ট্যাক্স অ্যাসিস্ট্যান্ট</h3>
                        <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '20px' }}>×</button>
                    </div>
                    <div className="chatbot-messages">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`message ${msg.isBot ? 'message-bot' : 'message-user'}`} style={{ whiteSpace: 'pre-wrap' }}>
                                {msg.text}
                            </div>
                        ))}
                        {loading && <div className="message message-bot">লিখছি...</div>}
                    </div>
                    <div className="chatbot-input">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                            placeholder="আপনার প্রশ্নটি লিখুন..."
                        />
                        <button onClick={sendMessage} className="btn btn-primary">পাঠান</button>
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
