import os
import cv2
import pandas as pd
import numpy as np
from fastapi import FastAPI, File
from fastapi.middleware.cors import CORSMiddleware
from api.get_data import get_dogs, get_similar_ids
from api.get_data import get_similar_dogs
from api.chat_helper import chat_utils
from tempfile import TemporaryDirectory


local_storage_path = "./persistent-folder/data/"

# load the dataset
def load_full_dogs():
    df = pd.read_csv(local_storage_path + "full_dogs_data.csv")
    return df

messages_received = []
current_dog_id = 0
prev_dog_id = 0

# initialize FastAPI
app = FastAPI()

# origins = [
#     "http://localhost",
#     "http://localhost:3000",
# ]
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Application start/stop hooks
# @app.on_event("startup")
# async def startup():
#     ensure_data_loaded()
#     pass

# load data
df = load_full_dogs()

@app.get('/test')
def test():
    return {"total dogs": df.shape[0]}

@app.get("/dogs/{total}")
def home(total: int):
    dogs = get_dogs(df, total)
    return dogs

@app.get("/dogs/similar/{dog_id}")
def get_similar(dog_id: int):
    similar_ids = get_similar_ids(dog_id)
    similar_df = df[df['AnimalInternal-ID'].isin(similar_ids)]
    similar_dogs = get_dogs(similar_df, 20)
    return {'data': similar_dogs[1:7]}

# @app.post("/file")
@app.post("/file")
async def predict(
        file: bytes = File(...)
):
    print("File information received!")
    print("file:", len(file), type(file))
    # Save the image
    with TemporaryDirectory() as image_dir:
        image_path = os.path.join(image_dir, "test.png")
        with open(image_path, "wb") as output:
            output.write(file)

        print("image_path: ", image_path)
        # read the image
        image = cv2.imread(image_path)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        similar_ids = get_similar_dogs(image)
        similar_df = df[df['AnimalInternal-ID'].isin(similar_ids)]
        similar_dogs = get_dogs(similar_df, 10)
        return {'data': similar_dogs}

# this route will handle chatbot messages
@app.get("/chat/{dog_id}/{question}")
def respond(dog_id : int, question):
    global prev_dog_id
    global current_dog_id
    global messages_received
    current_dog_id = dog_id
    # get dog's information
    dog = df[df["AnimalInternal-ID"] == dog_id]

    if ("gender" in question.lower()) or ("sex" in question.lower()) \
    or ("boy" in question.lower()) or ("girl" in question.lower()):
        gender = "boy." if dog.AnimalSex.values[0] == 'Male' else 'girl'
        return {"data": f"I am a {gender}"}
    
    print(current_dog_id, prev_dog_id)
    if (current_dog_id != prev_dog_id):
        messages_received = ["hi", "woof woof"]
    print(messages_received)
    
    chat = {
        "dog": dog.squeeze(),
        "history": messages_received,
        "input_message": question
    }
    response = chat_utils.chat_with_dog(chat)
    answer = response['response_message']
    messages_received.extend([question, answer])
    prev_dog_id = current_dog_id
    
    return {"data": answer}