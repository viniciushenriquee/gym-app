import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://automatic-rotary-phone-9rwg5xqprvqc74xq-5000.app.github.dev";

export default function Exercises() {
  const [exercises, setExercises] = useState([]);
  const [form, setForm] = useState({
    name: "",
    primary_muscle: "",
    description: ""
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
    <div style={{ padding: "20px" }}>
      <h1>Exercises</h1>

      <form onSubmit={createExercise} style={{ marginBottom: "20px" }}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Primary Muscle"
          value={form.primary_muscle}
          onChange={(e) => setForm({ ...form, primary_muscle: e.target.value })}
        />

        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <button type="submit">Adicionar</button>
      </form>

      <ul>
        {exercises.map((ex) => (
          <li key={ex.id}>
            <b>{ex.name}</b> — {ex.primary_muscle}
            <button onClick={() => deleteExercise(ex.id)} style={{ marginLeft: 10 }}>
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
