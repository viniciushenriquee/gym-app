from flask import Blueprint, request, jsonify, abort
from models import db, User, Exercise, Workout, WorkoutItem, SessionRecord, SessionEntry
from schemas import (
    UserSchema, ExerciseSchema, WorkoutSchema,
    WorkoutItemSchema, SessionRecordSchema
)

routes = Blueprint("routes", __name__)

user_schema = UserSchema()
exercise_schema = ExerciseSchema()
workout_schema = WorkoutSchema()
session_schema = SessionRecordSchema()


# ------------------------------
# EXERCISES
# ------------------------------
@routes.route("/exercises", methods=["GET"])
def list_exercises():
    exercises = Exercise.query.order_by(Exercise.name).all()
    return jsonify(ExerciseSchema(many=True).dump(exercises))


@routes.route("/exercises", methods=["POST"])
def create_exercise():
    data = request.get_json()

    if not data.get("name"):
        abort(400, description="Name is required")

    ex = Exercise(
        name=data["name"],
        description=data.get("description"),
        primary_muscle=data.get("primary_muscle")
    )

    db.session.add(ex)
    db.session.commit()
    return exercise_schema.jsonify(ex), 201


@routes.route("/exercises/<int:ex_id>", methods=["DELETE"])
def delete_exercise(ex_id):
    ex = Exercise.query.get_or_404(ex_id)
    db.session.delete(ex)
    db.session.commit()
    return jsonify({"message": "Exercise deleted"})


# ------------------------------
# WORKOUTS
# ------------------------------
@routes.route("/workouts", methods=["GET"])
def list_workouts():
    workouts = Workout.query.all()
    return jsonify(WorkoutSchema(many=True).dump(workouts))


@routes.route("/workouts/<int:w_id>", methods=["GET"])
def get_workout(w_id):
    workout = Workout.query.get_or_404(w_id)
    return workout_schema.jsonify(workout)


@routes.route("/workouts", methods=["POST"])
def create_workout():
    data = request.get_json()

    if not data.get("name") or not data.get("user_id"):
        abort(400, description="Name and user_id are required")

    workout = Workout(
        name=data["name"],
        user_id=data["user_id"]
    )

    db.session.add(workout)
    db.session.flush()

    # Criar itens do treino
    items = data.get("items", [])
    for idx, item in enumerate(items):
        wi = WorkoutItem(
            workout_id=workout.id,
            exercise_id=item["exercise_id"],
            sets=item.get("sets", 3),
            reps=item.get("reps", 10),
            order_index=idx,
            note=item.get("note")
        )
        db.session.add(wi)

    db.session.commit()
    return workout_schema.jsonify(workout), 201


# ------------------------------
# SESSIONS (EXECUÇÃO DO TREINO)
# ------------------------------
@routes.route("/sessions", methods=["POST"])
def create_session():
    data = request.get_json()

    if not data.get("workout_id"):
        abort(400, description="workout_id required")

    sess = SessionRecord(
        workout_id=data["workout_id"],
        notes=data.get("notes")
    )

    db.session.add(sess)
    db.session.flush()

    # entries (execução dos itens)
    for entry in data.get("entries", []):
        se = SessionEntry(
            session_id=sess.id,
            workout_item_id=entry["workout_item_id"],
            sets_done=entry["sets_done"],
            reps_done=entry["reps_done"],
            weight=entry.get("weight")
        )
        db.session.add(se)

    db.session.commit()
    return session_schema.jsonify(sess), 201


@routes.route("/sessions", methods=["GET"])
def list_sessions():
    sessions = SessionRecord.query.order_by(SessionRecord.performed_at.desc()).all()
    return jsonify(SessionRecordSchema(many=True).dump(sessions))