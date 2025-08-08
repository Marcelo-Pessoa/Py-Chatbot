import os
from openai import OpenAI

cliente = OpenAI(api_key=os.getenv("OPEN_AI_KEY"))

def openai_response(prompt):
  if not prompt or prompt.strip() == "":
    return "Por favor, faça uma pergunta válida."

  try:
    response = cliente.chat.completions.create(
      model = "gpt-3.5-turbo",
      messages = [{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content
  except Exception as e:
      return f"Ocorreu um erro ao processar sua solicitação: {e}"


