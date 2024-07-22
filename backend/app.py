from flask import Flask, request, jsonify
import numpy as np
import cv2
from change_detection import detect_changes

app = Flask(__name__)

@app.route('/detect_changes', methods=['POST'])
def detect_changes_route():
    data = request.json
    image1 = np.array(data['image1'])
    image2 = np.array(data['image2'])
    
    change_mask = detect_changes(image1, image2)
    
    _, buffer = cv2.imencode('.png', change_mask)
    change_mask_encoded = buffer.tobytes()
    
    return jsonify({'change_mask': change_mask_encoded.decode('latin1')})

if __name__ == '__main__':
    app.run(debug=True)
