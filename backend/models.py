from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# ------------------------------
# User
# ------------------------------
class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    workouts = db.relationship("Workout", back_populates="user")


# ------------------------------
# Exercise
# ------------------------------
class Exercise(db.Model):
    __tablename__ = "exercises"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=True)
    primary_muscle = db.Column(db.String(80), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


# ------------------------------
# Workout
# ------------------------------
class Workout(db.Model):
    __tablename__ = "workouts"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship("User", back_populates="workouts")
    items = db.relationship("WorkoutItem", back_populates="workout", cascade="all, delete-orphan", order_by="WorkoutItem.order_index")


# ------------------------------
# WorkoutItem
# ------------------------------
class WorkoutItem(db.Model):
    __tablename__ = "workout_items"
    id = db.Column(db.Integer, primary_key=True)
    workout_id = db.Column(db.Integer, db.ForeignKey("workouts.id"), nullable=False)
    exercise_id = db.Column(db.Integer, db.ForeignKey("exercises.id"), nullable=False)
    sets = db.Column(db.Integer, default=3)
    reps = db.Column(db.Integer, default=10)
    order_index = db.Column(db.Integer, default=0)
    note = db.Column(db.String(255), nullable=True)

    workout = db.relationship("Workout", back_populates="items")
    exercise = db.relationship("Exercise")


# ------------------------------
# SessionRecord
# ------------------------------
class SessionRecord(db.Model):
    __tablename__ = "sessions"
    id = db.Column(db.Integer, primary_key=True)
    workout_id = db.Column(db.Integer, db.ForeignKey("workouts.id"), nullable=False)
    performed_at = db.Column(db.DateTime, default=datetime.utcnow)
    notes = db.Column(db.Text, nullable=True)

    workout = db.relationship("Workout")
    entries = db.relationship("SessionEntry", back_populates="session", cascade="all, delete-orphan")


# ------------------------------
# SessionEntry
# ------------------------------
class SessionEntry(db.Model):
    __tablename__ = "session_entries"
    id = db.Column(db.Integer, primary_key=True)
    session_id = db.Column(db.Integer, db.ForeignKey("sessions.id"), nullable=False)
    workout_item_id = db.Column(db.Integer, db.ForeignKey("workout_items.id"), nullable=False)
    sets_done = db.Column(db.Integer, nullable=False)
    reps_done = db.Column(db.Integer, nullable=False)
    weight = db.Column(db.Float, nullable=True)

    session = db.relationship("SessionRecord", back_populates="entries")
    workout_item = db.relationship("WorkoutItem")
