from flask import Flask, request, jsonify
from flask_cors import CORS
from ai_logic import generate_event

app = Flask(__name__)
CORS(app)  # Allow frontend requests

# Endpoint for users to generate a DECA event based on event selection
@app.route('/api/generate_event', methods=['GET'])
def generate_event_route():
    event_id = request.args.get('event_id')

    if not event_id:
        return jsonify({"error": "Please provide an event_id"}), 400
    
    event = generate_event(event_id)
    
    return jsonify(event)

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
