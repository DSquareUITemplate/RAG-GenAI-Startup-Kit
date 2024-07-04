from flask import Flask, request, jsonify  
from flask_cors import CORS
import os  
import openai  
  
app = Flask(__name__)  
CORS(app)  
  
openai.api_type = "azure"  
openai.api_base = "your endpoint"  
openai.api_version = "2023-03-15-preview"  
openai.api_key = "your OpenAI key" 
  
@app.route('/chat', methods=['POST'])  
def chat():  
    input_data = request.json  
    inputstr = input_data['inputText']  
      
    try:  
        response = openai.ChatCompletion.create(  
            engine="bosonchatbot",  
            messages=[{"role":"user","content":inputstr}],  
            temperature=0.7,  
            max_tokens=800,  
            top_p=0.95,  
            frequency_penalty=0,  
            presence_penalty=0,  
            stop=None  
        )  
        return jsonify({"message": response['choices'][0]['message']['content']}), 200  
    except Exception as e:  
        return jsonify({"error": str(e)}), 500  
  
if __name__ == '__main__':  
    app.run(port=5002,debug=True)  
