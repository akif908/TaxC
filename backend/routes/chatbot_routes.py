"""
Chatbot API routes
"""
from flask import Blueprint, request, jsonify
from services.chatbot import chatbot_service

chatbot_bp = Blueprint('chatbot', __name__, url_prefix='/api/chatbot')

@chatbot_bp.route('', methods=['POST'])
def chat():
    """
    Process chatbot messages
    Expects: message
    Returns: chatbot response
    """
    try:
        data = request.get_json()
        
        if not data or 'message' not in data:
            return jsonify({'error': 'Message is required'}), 400
        
        user_message = data['message'].strip()
        history = data.get('history', [])
        
        if not user_message:
            return jsonify({'error': 'Message cannot be empty'}), 400
        
        # Get response from chatbot service
        response = chatbot_service.get_response(user_message, history)
        
        return jsonify({
            'response': response,
            'timestamp': data.get('timestamp')
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Chatbot error: {str(e)}'}), 500
