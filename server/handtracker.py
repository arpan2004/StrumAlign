import cv2
import mediapipe as mp
from flask import Flask, Response, request
from flask_cors import CORS;
import numpy as np
import threading

app = Flask(__name__)
CORS(app)

mp_drawing = mp.solutions.drawing_utils
mp_hands = mp.solutions.hands.Hands()

def gen_frames():
    cap = cv2.VideoCapture(0)  # Use the default webcam

    while True:
        success, frame = cap.read()
        if not success:
            break

        # Convert the frame to RGB (MediaPipe uses RGB images)
        RGB_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        # Process the frame to detect hands
        result = mp_hands.process(RGB_frame)

        # If hand landmarks are detected, draw them
        if result.multi_hand_landmarks:
            for hand_landmarks in result.multi_hand_landmarks:
                mp_drawing.draw_landmarks(frame, hand_landmarks, mp.solutions.hands.HAND_CONNECTIONS)

                hand_curvature = analyze_curves(hand_landmarks)
                threshold = 2.2
                if hand_curvature < threshold:
                    cv2.putText(frame, "Hands not curved enough!", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

        # Encode the frame as JPEG
        ret, buffer = cv2.imencode('.jpg', frame)
        if not ret:
            break
        frame = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    cap.release()

def analyze_curves(hand_landmarks):
    landmarks = [(lm.x, lm.y, lm.z) for lm in hand_landmarks.landmark]

    index_tip = np.array(landmarks[8])
    middle_tip = np.array(landmarks[12])
    ring_tip = np.array(landmarks[16])
    pinky_tip = np.array(landmarks[20])

    def angle_between_points(p1, p2, p3):
        v1 = p1 - p2
        v2  = p3 - p2
        dot_product = np.dot(v1, v2)
        norm_v1 = np.linalg.norm(v1)
        norm_v2 = np.linalg.norm(v2)
        return np.arccos(dot_product / (norm_v1 * norm_v2))
    
    index_middle_angle = angle_between_points(index_tip, middle_tip, ring_tip)
    middle_ring_angle = angle_between_points(middle_tip, ring_tip, pinky_tip)

    threshold_angles = {
        'index_middle': 1.5,
        'middle_ring': 1.5
    }

    return min(index_middle_angle, middle_ring_angle)

@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)