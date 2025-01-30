from flask import Flask, jsonify
from flask_cors import CORS
from ai_logic import generate_event

app = Flask(__name__)
CORS(app)  # Enable CORS

@app.route('/api/generate_event', methods=['GET'])
def generate_event_route():
    event = generate_event()
    return jsonify(event)  # Return AI-generated event

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
