import random
import json
import openai  

OPENAI_API_KEY = "VARDAN PUT UR KEY HERE"

openai.api_key = OPENAI_API_KEY

def load_data():
    with open("events.json", "r") as e_file:
        events = json.load(e_file)["events"]
    
    with open("performance_indicators.json", "r") as pi_file:
        performance_indicators = json.load(pi_file)

    with open("examples.json", "r") as ex_file:
        examples = json.load(ex_file)

    return events, performance_indicators, examples

def select_performance_indicators(event_id, pi_data, num_pis=3):
    if event_id in pi_data:
        return random.sample(pi_data[event_id], min(num_pis, len(pi_data[event_id])))
    return []

def generate_case_study(event_id, selected_pis, examples):
    prompt = f"Create a new DECA roleplay scenario for a {event_id} event. It should match these performance indicators:\n"
    for pi in selected_pis:
        prompt += f"- {pi}\n"

    past_cases = [ex for ex in examples if ex["case_study"]["event"] == event_id]

    if past_cases:
        prompt += "\nHere are similar past cases:\n"
        for case in past_cases[:2]:  # Use up to 2 past examples
            prompt += f"Title: {case['case_study']['title']}\nDescription: {case['case_study']['description']}\n\n"

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "system", "content": "You are an expert at generating realistic DECA roleplay events."},
                  {"role": "user", "content": prompt}]
    )

    return response["choices"][0]["message"]["content"].strip()

def generate_event(event_id):
    events, performance_indicators, examples = load_data()
    
    selected_pis = select_performance_indicators(event_id, performance_indicators)
    
    case_study = generate_case_study(event_id, selected_pis, examples)

    return {
        "case_study": case_study,
        "performance_indicators": selected_pis
    }
