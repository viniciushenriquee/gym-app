from flask import Flask, jsonify
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///gym.db"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    CORS(app)

    @app.route("/health")
    def health():
        return jsonify({"status": "ok"})

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, port=5000)
