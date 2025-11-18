from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, auto_field
from models import User, Exercise, Workout, WorkoutItem, SessionRecord, SessionEntry

# ------------------------------
# User Schema
# ------------------------------
class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True
        include_relationships = True


# ------------------------------
# Exercise Schema
# ------------------------------
class ExerciseSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Exercise
        load_instance = True
        include_fk = True


# ------------------------------
# WorkoutItem Schema
# ------------------------------
class WorkoutItemSchema(SQLAlchemyAutoSchema):
    exercise = auto_field()

    class Meta:
        model = WorkoutItem
        load_instance = True
        include_fk = True
        include_relationships = True


# ------------------------------
# Workout Schema
# ------------------------------
class WorkoutSchema(SQLAlchemyAutoSchema):
    items = auto_field()

    class Meta:
        model = Workout
        load_instance = True
        include_fk = True
        include_relationships = True


# ------------------------------
# SessionEntry Schema
# ------------------------------
class SessionEntrySchema(SQLAlchemyAutoSchema):
    workout_item = auto_field()

    class Meta:
        model = SessionEntry
        load_instance = True
        include_fk = True
        include_relationships = True


# ------------------------------
# SessionRecord Schema
# ------------------------------
class SessionRecordSchema(SQLAlchemyAutoSchema):
    entries = auto_field()
    workout = auto_field()

    class Meta:
        model = SessionRecord
        load_instance = True
        include_fk = True
        include_relationships = True
