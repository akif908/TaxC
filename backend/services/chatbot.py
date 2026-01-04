"""
AI Chatbot service
Handles chatbot conversations using external AI API (OpenRouter)
"""
import requests
import os
import json

class ChatbotService:
    """Service for handling chatbot conversations"""
    
    def __init__(self):
        # OpenRouter API URL
        self.api_url = os.getenv('CHATBOT_API_URL', 'https://openrouter.ai/api/v1/chat/completions')
        # API Key from environment variable
        self.api_key = os.getenv('CHATBOT_API_KEY', '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')
        # Default model for OpenRouter (using a free tier model)
        self.model = os.getenv('CHATBOT_MODEL', 'openai/gpt-oss-20b:free')
        self.use_api = bool(self.api_key)
    
    def get_response(self, user_message):
        """
        Get chatbot response for user message
        
        Args:
            user_message: User's question/message
            
        Returns:
            str: Chatbot response
        """
        if self.use_api:
            return self._get_api_response(user_message)
        else:
            return self._get_rule_based_response(user_message)
    
    def _get_api_response(self, user_message):
        """Get response from OpenRouter API"""
        try:
            # System prompt for tax-related assistance
            system_prompt = """You are a helpful tax assistant for a Bangladesh tax payment system.So, always speak in bangla 
Help users understand tax calculations, payment processes, and tax-related questions.
Provide complete, helpful answers in plain text format without HTML tags.
Use simple formatting with dashes (-) for lists and keep responses clear and readable."""
            
            headers = {
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {self.api_key}',
                'HTTP-Referer': 'http://localhost:3000', # Required by OpenRouter
                'X-Title': 'Tax Payment System' # Optional
            }
            
            payload = {
                'model': self.model,
                'messages': [
                    {'role': 'system', 'content': system_prompt},
                    {'role': 'user', 'content': user_message}
                ],
                'max_tokens': 1200,  # Increased to allow complete responses
                'temperature': 0.7
            }
            
            response = requests.post(self.api_url, json=payload, headers=headers, timeout=10)
            response.raise_for_status()
            
            data = response.json()
            
            if 'choices' in data and len(data['choices']) > 0:
                return data['choices'][0]['message']['content']
            else:
                return "I'm having trouble understanding that. Could you rephrase?"
                
        except Exception as e:
            print(f"API Error: {str(e)}")
            return self._get_rule_based_response(user_message)
    
    def _get_rule_based_response(self, user_message):
        """Fallback rule-based chatbot"""
        message_lower = user_message.lower()
        
        # Tax calculation questions
        if any(word in message_lower for word in ['calculate', 'tax', 'income', 'how much']):
            return """To calculate your tax:
1. Go to the Tax Form page
2. Enter your annual income
3. Click 'Calculate Tax' to see your tax amount based on current tax slabs
4. Submit the form to proceed with payment"""
        
        # Payment questions
        elif any(word in message_lower for word in ['pay', 'payment', 'transaction']):
            return """To make a payment:
1. Submit your tax form first
2. Go to the Payments page
3. Select your pending submission
4. Complete the payment process
5. Download your receipt after successful payment"""
        
        # Profile questions
        elif any(word in message_lower for word in ['profile', 'update', 'information', 'tin', 'nid']):
            return """You can manage your profile information:
1. Go to Profile page
2. Fill in your personal details (Name, NID, TIN, Address, etc.)
3. Save your profile
4. You can update it anytime"""
        
        # Tax slabs questions
        elif any(word in message_lower for word in ['slab', 'rate', 'percentage', 'bracket']):
            return """Tax slabs determine your tax rate based on income:
- 0-300,000: 0%
- 300,000-400,000: 5%
- 400,000-500,000: 10%
- 500,000-600,000: 15%
- 600,000-3,000,000: 20%
- Above 3,000,000: 25%"""
        
        # Receipt questions
        elif any(word in message_lower for word in ['receipt', 'download', 'pdf', 'proof']):
            return """After payment, you can download your receipt:
1. Go to Payment History
2. Find your completed payment
3. Click 'Download Receipt'
4. A PDF receipt will be generated with all payment details"""
        
        # Help/greeting
        elif any(word in message_lower for word in ['hello', 'hi', 'help', 'hey', 'start']):
            return """Hello! I'm your tax assistant chatbot. I can help you with:
- Tax calculations
- Payment process
- Profile management
- Tax slabs and rates
- Downloading receipts
What would you like to know?"""
        
        # Default response
        else:
            return """I'm here to help with tax-related questions! You can ask me about:
- How to calculate taxes
- Making payments
- Managing your profile
- Tax slabs and rates
- Downloading receipts
Please feel free to ask any specific question!"""

# Create singleton instance
chatbot_service = ChatbotService()
