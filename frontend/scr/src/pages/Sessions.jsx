import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

export default function Sessions() {
  const [workouts, setWorkouts] = useState([]);
  const [form, setForm] = useState({
    workout_id: "",
    notes: "",
    entries: []
  });

  const [currentEntry, setCurrentEntry] = useState({
    workout_item_id: "",
    sets_done: "",
    reps_done: "",
    weight: ""
  });

  const [itemsFromWorkout, setItemsFromWorkout] = useState([]);

  // Carregar treinos existentes
  const loadWorkouts = async () => {
    const res = await axios.get(`${API}/workouts`);
    setWorkouts(res.data);
  };

  // Quando escolher um treino, carregar seus itens
  const loadWorkoutItems = async (id) => {
    if (!id) return;
    const res = await axios.get(`${API}/workouts/${id}`);
    setItemsFromWorkout(res.data.items || []);
  };

  useEffect(() => {
    loadWorkouts();
  }, []);

  const addEntry = () => {
    setForm({
      ...form,
      entries: [...form.entries, currentEntry]
    });

    setCurrentEntry({
      workout_item_id: "",
      sets_done: "",
      reps_done: "",
      weight: ""
    });
  };

  const createSession = async () => {
    await axios.post(`${API}/sessions`, form);
    alert("Sessão registrada!");
    setForm({ workout_id: "", notes: "", entries: [] });
    setItemsFromWorkout([]);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Sessions</h1>

      {/* Selecionar treino */}
      <select
        value={form.workout_id}
        onChange={(e) => {
          setForm({ ...form, workout_id: e.target.value });
          loadWorkoutItems(e.target.value);
        }}
      >
        <option value="">Selecione um treino</option>
        {workouts.map((w) => (
          <option key={w.id} value={w.id}>
            {w.name}
          </option>
        ))}
      </select>

      <br />

      {/* Anotações */}
      <textarea
        placeholder="Notes"
        value={form.notes}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
      />

      <h3>Registrar Execução</h3>

      <select
        value={currentEntry.workout_item_id}
        onChange={(e) =>
          setCurrentEntry({ ...currentEntry, workout_item_id: e.target.value })
        }
      >
        <option value="">Item do treino</option>
        {itemsFromWorkout.map((item) => (
          <option key={item.id} value={item.id}>
            {item.exercise.name}
          </option>
        ))}
      </select>

      <input
        placeholder="Sets feitos"
        value={currentEntry.sets_done}
        onChange={(e) =>
          setCurrentEntry({ ...currentEntry, sets_done: e.target.value })
        }
      />

      <input
        placeholder="Reps feitas"
        value={currentEntry.reps_done}
        onChange={(e) =>
          setCurrentEntry({ ...currentEntry, reps_done: e.target.value })
        }
      />

      <input
        placeholder="Peso usado (kg)"
        value={currentEntry.weight}
        onChange={(e) =>
          setCurrentEntry({ ...currentEntry, weight: e.target.value })
        }
      />

      <button onClick={addEntry}>Adicionar Execução</button>

      <h3>Entradas adicionadas</h3>
      <ul>
        {form.entries.map((en, i) => (
          <li key={i}>
            Item: {en.workout_item_id} | Sets: {en.sets_done} | Reps:{" "}
            {en.reps_done} | Peso: {en.weight}
          </li>
        ))}
      </ul>

      <button onClick={createSession}>Finalizar Sessão</button>
    </div>
  );
}