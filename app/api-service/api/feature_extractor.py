import numpy as np
from tensorflow.keras.applications.efficientnet import preprocess_input

class FeatureExtractor:
    def __init__(self, model):
        self.model = model

    def extract_features(self, image):
        # prepare image to pass through the model
        image = self.prepare_image(image)
        # get the features
        features = self.model(image)
        # convert to numpy and reshape
        features = features.numpy().reshape((-1,)) # reshape to (2048,)
        return features
        
    def prepare_image(self, image):
        # preprocess using model's preprocess_input func
        image = preprocess_input(image)
        # expand the dimension: (224, 224, 3) => (1, 224, 224, 3)
        image = np.expand_dims(image, axis=0)
        return image