import time
from google import genai
from markdown_it import MarkdownIt

markdownit = MarkdownIt()
cliente = genai.Client()
chat = cliente.chats.create(model="gemini-2.5-pro")

# Função para gerar a resposta com o modelo Gemini
def generate_response(prompt):
    # Verifica se o prompt é válido
    if not prompt or prompt.strip() == "":
        return "Por favor, faça uma pergunta válida."

    # Tenta gerar a resposta com o modelo Gemini
    # Se ocorrer um erro, tenta novamente até 3 vezes
    max_retries = 3
    for attempt in range(max_retries):
        try:
            output = chat.send_message(prompt)

            return markdownit.render(output.text if output.text else "Desculpe, não entendi.")
        except Exception as e:
            print(f"Tentativa {attempt + 1} - Erro ao gerar a resposta: {e}")

            if "overloaded" in str(e) and attempt < max_retries - 1:
                # Aguarda antes de tentar novamente se o serviço estiver sobrecarregado
                time.sleep(2**attempt)  # Backoff exponencial
                continue
            elif attempt == max_retries - 1:
                return "O serviço está temporariamente indisponível. Tente novamente em alguns minutos."

    return "Ocorreu um erro ao processar sua solicitação."
