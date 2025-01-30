import random
import json
import openai

# Set your OpenAI API key
openai.api_key = "your-openai-api-key"

# Load the data from the JSON files
def load_data():
    with open('C:/Users/Sid/OneDrive/Desktop/deca-ai-project/flask_api_project/database/performance_indicators.json', 'r') as pi_file:
        performance_indicators = json.load(pi_file)
        
    with open('C:/Users/Sid/OneDrive/Desktop/deca-ai-project/flask_api_project/database/case_studies.json', 'r') as cs_file:
        case_studies = json.load(cs_file)
    
    return performance_indicators, case_studies

# Randomly select performance indicators
def select_performance_indicators(pi_data, num_pis):
    num_pis = min(num_pis, len(pi_data))
    return random.sample(pi_data, num_pis)

# Generate a new AI case study
def generate_ai_case_study(existing_cases):
    # Extract some example case studies
    example_cases = "\n\n".join([f"Title: {c['title']}\nDescription: {c['description']}" for c in existing_cases[:5]])

    prompt = f"""
    You are an AI that generates business case studies for DECA roleplay practice. 

    Here are some example case studies:
    {example_cases}

    Now, generate a brand-new case study in the same format:
    """

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "system", "content": prompt}]
    )

    ai_generated_text = response["choices"][0]["message"]["content"]
    
    # Convert the AI-generated text into a structured dictionary
    lines = ai_generated_text.strip().split("\n")
    title = lines[0].replace("Title: ", "").strip()
    description = "\n".join(lines[1:]).replace("Description: ", "").strip()

    return {
        "title": title,
        "description": description
    }

# Function to generate a complete DECA practice event
def generate_event():
    # Load existing data
    performance_indicators, case_studies = load_data()

    # Generate a brand-new AI case study
    case_study = generate_ai_case_study(case_studies)

    # Randomly select PIs
    num_pis = random.randint(3, 7)
    selected_pis = select_performance_indicators(performance_indicators, num_pis)

    # Create the final event
    practice_event = {
        "case_study": case_study,
        "performance_indicators": selected_pis
    }
    
    return practice_event
