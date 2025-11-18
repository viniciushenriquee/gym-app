from flask import Flask, jsonify
from flask_cors import CORS
from models import db

def create_app():
    app = Flask(__name__)

    # Configuração do banco
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///gym.db"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Inicia extensões
    CORS(app)
    db.init_app(app)

    from routes import routes
    app.register_blueprint(routes)

    # Rota simples para ver se está funcionando
    @app.route("/health")
    def health():
        return jsonify({"status": "ok"})

    return app


if __name__ == "__main__":
    app = create_app()

    # Criar tabelas caso não existam
    with app.app_context():
        db.create_all()

    app.run(debug=True, port=5000)
