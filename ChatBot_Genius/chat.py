import os
import time
from flask import Flask, request, jsonify
import openai
from flask_cors import CORS
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from moviepy.editor import VideoFileClip
import speech_recognition as sr
from threading import Thread

app = Flask(__name__)
CORS(app)

api_key = os.environ.get("OPENAI_API_KEY")

def carregar_conteudos():
    conteudos = {}
    base_dir = "conteudos"

    for root, dirs, files in os.walk(base_dir):
        for file in files:
            if file.endswith(".txt"):
                caminho_relativo = os.path.relpath(os.path.join(root, file), base_dir)
                with open(os.path.join(root, file), 'r', encoding='utf-8') as f:
                    conteudos[caminho_relativo] = f.read()
    return conteudos


def enviar_mensagem(mensagem, conteudos):
    contexto = "\n\n".join([f"{k}:\n{v}" for k, v in conteudos.items()])
    prompt = f"Baseado no seguinte conteúdo:\n{contexto}\n\nPergunta: {mensagem}\nResposta:"

    resposta = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )
    return resposta['choices'][0]['message']['content']


def transcrever_video(video_path, output_path):
    recognizer = sr.Recognizer()
    clip = VideoFileClip(video_path)
    audio_path = video_path.replace('.mp4', '.wav')
    
    
    clip.audio.write_audiofile(audio_path)
    
    with sr.AudioFile(audio_path) as source:
        audio_data = recognizer.record(source)
        try:
            
            texto = recognizer.recognize_google(audio_data, language='pt-BR')
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(texto)
            print(f"Transcrição concluída e salva em {output_path}")
        except sr.UnknownValueError:
            print("Não foi possível entender o áudio.")
        except sr.RequestError as e:
            print(f"Erro no serviço de reconhecimento de fala: {e}")
    
    
    os.remove(audio_path)


class MonitoramentoHandler(FileSystemEventHandler):
    def on_created(self, event):
        if event.is_directory:
            return
        if event.src_path.endswith(".mp4"):
            modulo_path = os.path.dirname(event.src_path)
            transcricao_path = os.path.join(modulo_path, "transcricao_video.txt")
            
            print(f"Novo vídeo detectado: {event.src_path}")
            transcrever_video(event.src_path, transcricao_path)


def iniciar_monitoramento():
    observer = Observer()
    event_handler = MonitoramentoHandler()
    observer.schedule(event_handler, path="conteudos", recursive=True)
    observer.start()
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()


@app.route('/chat', methods=['POST'])
def chat():
    dados = request.json
    mensagem = dados['message'].strip().lower()
    
    
    saudacoes = ["oi", "ola", "ola chat", "oii"]
    resposta_padrao = "Olá, sou o Genius, em que posso te ajudar?"

    if mensagem in saudacoes:
        resposta = resposta_padrao
    else:
        conteudos = carregar_conteudos()
        resposta = enviar_mensagem(mensagem, conteudos)
    
    return jsonify({"response": resposta})

if __name__ == '__main__':
    monitoramento_thread = Thread(target=iniciar_monitoramento)
    monitoramento_thread.start()
    
    
    app.run(debug=True)
