import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:5000";

export default function Workouts() {
  const [exercises, setExercises] = useState([]);
  const [workouts, setWorkouts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    user_id: 1,
    items: []
  });

  const [currentItem, setCurrentItem] = useState({
    exercise_id: "",
    sets: 3,
    reps: 10,
    note: ""
  });

  // Carregar exercícios e treinos
  const loadData = async () => {
    const ex = await axios.get(`${API}/exercises`);
    setExercises(ex.data);

    const wk = await axios.get(`${API}/workouts`);
    setWorkouts(wk.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Adicionar exercício ao treino (itens)
  const addItem = () => {
    if (!currentItem.exercise_id) return;

    setForm({
      ...form,
      items: [...form.items, { ...currentItem }]
    });

    setCurrentItem({
      exercise_id: "",
      sets: 3,
      reps: 10,
      note: ""
    });
  };

  // Criar treino
  const createWorkout = async (e) => {
    e.preventDefault();

    await axios.post(`${API}/workouts`, form);

    setForm({
      name: "",
      user_id: 1,
      items: []
    });

    loadData();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Workouts</h1>

      {/* Formulário de criação */}
      <form onSubmit={createWorkout}>

        <input
          placeholder="Workout Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <h3>Adicionar Itens ao Treino</h3>

        {/* Selecionar exercício */}
        <select
          value={currentItem.exercise_id}
          onChange={(e) =>
            setCurrentItem({ ...currentItem, exercise_id: e.target.value })
          }
        >
          <option value="">Selecione exercício</option>
          {exercises.map((ex) => (
            <option key={ex.id} value={ex.id}>
              {ex.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Sets"
          value={currentItem.sets}
          onChange={(e) =>
            setCurrentItem({ ...currentItem, sets: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Reps"
          value={currentItem.reps}
          onChange={(e) =>
            setCurrentItem({ ...currentItem, reps: e.target.value })
          }
        />

        <input
          placeholder="Note"
          value={currentItem.note}
          onChange={(e) =>
            setCurrentItem({ ...currentItem, note: e.target.value })
          }
        />

        <button type="button" onClick={addItem}>
          Adicionar Item
        </button>

        <h4>Itens do treino:</h4>
        <ul>
          {form.items.map((it, index) => (
            <li key={index}>
              Exercício {it.exercise_id} – {it.sets}x{it.reps}
            </li>
          ))}
        </ul>

        <button type="submit">Criar Treino</button>
      </form>

      <hr />

      {/* Lista de treinos */}
      <h2>Treinos Criados</h2>

      {workouts.map((wk) => (
        <div key={wk.id} style={{ padding: 10, border: "1px solid #ccc", marginBottom: 10 }}>
          <h3>{wk.name}</h3>
          <p>User: {wk.user_id}</p>
        </div>
      ))}

    </div>
  );
}
