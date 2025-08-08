from flask import Flask, render_template, request, jsonify
from gemini import generate_response

app = Flask(__name__)


@app.route('/')
def home():
  return render_template('home.html')


@app.route('/chat')
def chat():
  prompt = request.args.get('prompt')
  response = generate_response(prompt)
  return response

if __name__ == '__main__':
  app.run(host='0.0.0.0', debug=True)
