
import datetime
from flask import *
from werkzeug.utils import secure_filename
import tensorflow as tf
import cv2
import wget
import os
import numpy as np


model = tf.keras.models.load_model("./imageclassifier.h5")


def newmain(PATH=""):
    img = cv2.imread(PATH)
    resize = tf.image.resize(img, (256, 256))
    yhat = model.predict(np.expand_dims(resize/255, 0))
    if yhat > 0.5:
        return True
    else:
        return False


print("\033[96m\033[1m\033[4m model Trained \033[0m")

app = Flask(__name__)


@app.route('/', methods=['GET'])
def home():
    return """
    <body style='text-align: center;'>
        <h1 style=''>AiModelTest</h1>
        <form method="post" action="/" enctype = "multipart/form-data">
            <input name="file" type="file"/>
            <button>Submit</button>
        </form>
    </body>
    """


@app.route('/', methods=['POST'])
def third():
    try:
        if 'file' in request.files and request.files['file'] and request.files['file'].filename != '':
            file = request.files['file']
            uid = 123456789

            filename = secure_filename(file.filename)
            file.save(filename)
            result = newmain(filename)
            os.remove(filename)
            return jsonify({"result": result})
        else:
            return jsonify({"error": "file not found"})
    except Exception as e:
        return jsonify({"error": e})


if __name__ == "__main__":
    app.run(port=8080, debug=True, host="0.0.0.0", threaded=True,
            use_reloader=True, passthrough_errors=True)
