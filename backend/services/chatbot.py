"""
AI Chatbot service
Handles chatbot conversations using external AI API (OpenRouter)
"""
import requests
import os
import json
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class ChatbotService:
    """Service for handling chatbot conversations"""
    
    def __init__(self):
        # OpenRouter API URL
        self.api_url = os.getenv('CHATBOT_API_URL', 'https://openrouter.ai/api/v1/chat/completions')
        # API Key from environment variable
        self.api_key = os.getenv('CHATBOT_API_KEY')
        # Default model for OpenRouter (using a free tier model)
        self.model = os.getenv('CHATBOT_MODEL', 'xiaomi/mimo-v2-flash:free')
        self.use_api = bool(self.api_key)
    
    def get_response(self, user_message, history=None):
        """
        Get chatbot response for user message
        
        Args:
            user_message: User's question/message
            history: List of previous messages in the session
            
        Returns:
            str: Chatbot response
        """
        if self.use_api:
            return self._get_api_response(user_message, history)
        else:
            return self._get_rule_based_response(user_message)
    
    def _get_api_response(self, user_message, history=None):
        """Get response from OpenRouter API"""
        try:
            # System prompt for tax-related assistance
            system_prompt = """You are 'TaxC Assistant', a professional tax assistant for TaxC Bangladesh.
            
DIRECTIONS:
1. ALWAYS speak in Bangla (বাংলা). 
2. Use professional, polite, and helpful language.
3. Help with income tax, slabs, payments, forms, receipts, and investment (like sanchaypatra).
4. Be concise but clear.
5. Address the user directly and maintain context.
6. If the user uses Romanized Bangla (e.g., 'kemon achen'), respond in proper Bangla script (বাংলা লিপি).
7. If thanked, acknowledge and offer further help.
"""
            
            headers = {
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {self.api_key}',
                'HTTP-Referer': 'http://localhost:3000',
                'X-Title': 'Tax Payment System'
            }
            
            # Construct messages with history
            messages = [{'role': 'system', 'content': system_prompt}]
            
            if history and isinstance(history, list):
                # Only take last 10 for context to avoid token limits
                for msg in history[-10:]:
                    role = 'assistant' if msg.get('isBot') else 'user'
                    messages.append({'role': role, 'content': msg.get('text', '')})
            
            # Add current message
            messages.append({'role': 'user', 'content': user_message})
            
            payload = {
                'model': self.model,
                'messages': messages,
                'max_tokens': 500,
                'temperature': 0.5,
                'top_p': 0.9,
                'frequency_penalty': 0.3
            }
            
            response = requests.post(self.api_url, json=payload, headers=headers, timeout=20)
            response.raise_for_status()
            
            data = response.json()
            
            if 'choices' in data and len(data['choices']) > 0:
                raw_content = data['choices'][0]['message']['content']
                return raw_content.strip()
            else:
                return "দুঃখিত, আমি বিষয়টি বুঝতে পারছি না। দয়া করে আবার জিজ্ঞাসা করুন।"
                
        except Exception as e:
            print(f"API Error: {str(e)}")
            return self._get_rule_based_response(user_message)
    
    def _get_rule_based_response(self, user_message):
        """Fallback rule-based chatbot in Bangla"""
        msg = user_message.lower()
        
        # Greetings
        if any(word in msg for word in ['hello', 'hi', 'hey', 'কেমন', 'হ্যালো', 'সালাম']):
            return "স্বাগতম! আমি ট্যাক্স-সি অ্যাসিস্ট্যান্ট। আমি আপনাকে ট্যাক্স হিসাব, স্ল্যাব, পেমেন্ট এবং রিসিট সংক্রান্ত বিষয়ে সাহায্য করতে পারি। আপনি কি জানতে চান?"

        # Tax calculation
        if any(word in msg for word in ['calculate', 'tax', 'income', 'হিসাব', 'ট্যাক্স', 'কত']):
            return """ট্যাক্স হিসাব করতে:
১. 'Tax Form' পেজে যান।
২. আপনার বার্ষিক আয় এবং অন্যান্য তথ্য প্রদান করুন।
৩. 'Calculate Tax' বাটনে ক্লিক করে আপনার প্রদেয় ট্যাক্স দেখুন।"""
        
        # Sanchaypatra / Savings Certificates
        if any(word in msg for word in ['sanchay', 'sanchaptra', 'সঞ্চয়', 'সঞ্চয়পত্র']):
            return "সঞ্চয়পত্রের সুদের ওপর সাধারণত ৫% বা ১০% হারে উৎস কর (TDS) কাটা হয়। এটি আপনার মোট ট্যাক্সের সাথে সমন্বয় করা যায়। বিস্তারিত জানতে একজন ট্যাক্স বিশেষজ্ঞের পরামর্শ নিন।"

        # Default response in Bangla
        return """দুঃখিত, আমি বিষয়টি বুঝতে পারছি না। আপনি আমাকে নিচের বিষয়গুলো নিয়ে জিজ্ঞাসা করতে পারেন:
- ট্যাক্স হিসাব করার পদ্ধতি
- পেমেন্ট কীভাবে করবেন
- ট্যাক্স স্ল্যাব এবং রেট
- রিসিট ডাউনলোড করা
- সঞ্চয়পত্র ও অন্যান্য কর তথ্য"""

# Create singleton instance
chatbot_service = ChatbotService()
