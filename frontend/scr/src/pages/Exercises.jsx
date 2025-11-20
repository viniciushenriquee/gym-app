import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:5000";

export default function Exercises() {
  const [exercises, setExercises] = useState([]);
  const [form, setForm] = useState({
    name: "",
    primary_muscle: "",
    description: "",
  });

  const loadExercises = async () => {
    const res = await axios.get(`${API}/exercises`);
    setExercises(res.data);
  };

  useEffect(() => {
    loadExercises();
  }, []);

  const createExercise = async (e) => {
    e.preventDefault();
    await axios.post(`${API}/exercises`, form);
    setForm({ name: "", primary_muscle: "", description: "" });
    loadExercises();
  };

  const deleteExercise = async (id) => {
    await axios.delete(`${API}/exercises/${id}`);
    loadExercises();
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>

      <h1 style={{ marginBottom: "25px" }}>Exercises</h1>

      {/* FORM */}
      <form
        onSubmit={createExercise}
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={inputStyle}
        />

        <input
          placeholder="Primary Muscle"
          value={form.primary_muscle}
          onChange={(e) => setForm({ ...form, primary_muscle: e.target.value })}
          style={inputStyle}
        />

        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          style={inputStyle}
        />

        <button type="submit" style={buttonPrimary}>
          Adicionar
        </button>
      </form>

      {/* LISTA */}
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {exercises.map((ex) => (
          <div
            key={ex.id}
            style={{
              background: "#1d1d1d",
              padding: "18px 20px",
              borderRadius: "10px",
              border: "1px solid #333",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <strong style={{ fontSize: "18px" }}>{ex.name}</strong>
              <p style={{ margin: "5px 0", color: "#aaa" }}>
                {ex.primary_muscle} — {ex.description}
              </p>
            </div>

            <button
              onClick={() => deleteExercise(ex.id)}
              style={buttonDanger}
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #444",
  background: "#2c2c2c",
  color: "white",
  width: "150px",
};

const buttonPrimary = {
  background: "#00e676",
  border: "none",
  padding: "10px 18px",
  color: "black",
  fontWeight: "bold",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "0.2s",
};

const buttonDanger = {
  background: "#ff5252",
  border: "none",
  padding: "10px 16px",
  fontWeight: "bold",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer",
  transition: "0.2s",
};