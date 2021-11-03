#!/usr/bin/env python
# coding: utf-8

import numpy as np
import torch
from torch.cuda import amp
import random
from transformers import GPT2Config, GPT2DoubleHeadsModel, GPT2Tokenizer
from api.chat_helper import model_utils

trained_model_path = "./persistent-folder/data/final_gpt2doublehead"
model = None
tokenizer = None
dogs_memos = None


def get_model_tokenizer():
    global model
    global tokenizer
    if model is None:
        # Load trained model
        model = GPT2DoubleHeadsModel.from_pretrained(trained_model_path)
        # Convert model parameter tensors to device
        model.to("cpu")
        # Load trained Tokenizer
        tokenizer = GPT2Tokenizer.from_pretrained(trained_model_path)

    return model, tokenizer


def generate_persona(dog_data):
    house_trained = random.randint(0, 3)
    if house_trained == 0:
        dog_data["trained"] = False
    else:
        dog_data["trained"] = True

    personality = ['My name is {}.'.format(dog_data["AnimalName"]),
    'My gender is {}.'.format(dog_data["AnimalSex"]),
    'My weight is {}.'.format(dog_data["AnimalCurrentWeightPounds"]),
    'I am {} years old.'.format(dog_data["Age"]),
    'My age is {}.'.format(dog_data["Age"]),
    'My breed is {}.'.format(dog_data["AnimalBreed"]),
    'My color is {}.'.format(dog_data["AnimalColor"]),
    ]
    if dog_data["trained"]:
        personality.append("I am house trained")
    else:
        personality.append("I am not house trained")   

    return personality


def chat_with_dog(chat: dict):

    # Get model/ tokenizer
    model, tokenizer = get_model_tokenizer()
    personality = generate_persona(chat["dog"])
    # create memos
    memo = [
        "I have the prettiest little puppy face.",
        "I am sweet.",
        "I have stunning grey eyes that will win you over instantly, and have the cutest floppy ears.",
        "I am still learning what my crate is for, and working hard to master house training.",
        "I love crinkly stuffed toys.",
        "I am very low key and relaxed.",
        "I love to be held, and will cuddle in your lap to take a snooze.",
    ]
    personality.extend(memo)
    # History
    history = chat["history"]
    # New chat message
    input_message = chat["input_message"]

    # Tokenize inputs
    personality = [tokenizer.encode(s.lower()) for s in personality]
    history = [tokenizer.encode(s) for s in history]
    history.append(tokenizer.encode(input_message))

    with torch.no_grad():
        with amp.autocast():
            out_ids = model_utils.sample_sequence(personality, history, tokenizer, model)
    out_text = tokenizer.decode(out_ids, skip_special_tokens=True)

    return {
        "response_message": out_text
    }

