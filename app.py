from flask import Flask, jsonify, request
from flask_cors import CORS  # Import CORS to enable cross-origin resource sharing
import random
import json

app = Flask(__name__)

# Enable CORS for all routes and origins
CORS(app)

# Load data from JSON files
def load_data():
    with open('performance_indicators.json', 'r') as pi_file:
        performance_indicators = json.load(pi_file)
        
    with open('case_studies.json', 'r') as cs_file:
        case_studies = json.load(cs_file)
    
    return performance_indicators, case_studies

# Randomly select performance indicators based on the event
def select_performance_indicators(event, num_pis):
    performance_indicators, _ = load_data()
    event_pis = [pi for pi in performance_indicators if pi['event_id'] == event]
    return random.sample(event_pis, min(num_pis, len(event_pis)))

# Randomly select a case study
def select_case_study():
    _, case_studies = load_data()
    return random.choice(case_studies)

@app.route('/api/start_conversation', methods=['GET'])
def start_conversation():
    case_study = select_case_study()
    return jsonify({"message": f"Which event are you working on? Available event: {case_study['title']}", "event_id": case_study["id"]})

@app.route('/api/generate_event', methods=['POST'])
def generate_event():
    data = request.json
    event_id = data['event_id']
    num_pis = random.randint(3, 7)  # Random number of performance indicators
    selected_pis = select_performance_indicators(event_id, num_pis)

    # Retrieve case study by event_id
    _, case_studies = load_data()
    case_study = next(cs for cs in case_studies if cs['id'] == event_id)

    event = {
        "case_study": case_study,
        "performance_indicators": selected_pis
    }
    
    return jsonify(event)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
