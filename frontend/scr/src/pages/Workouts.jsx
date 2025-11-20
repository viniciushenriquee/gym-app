import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:5000";

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    user_id: 1,
  });

  const [exerciseList, setExerciseList] = useState([]);

  const loadExercises = async () => {
    const res = await axios.get(`${API}/exercises`);
    setExerciseList(res.data);
  };

  const loadWorkouts = async () => {
    const res = await axios.get(`${API}/workouts`);
    setWorkouts(res.data);
  };

  useEffect(() => {
    loadExercises();
    loadWorkouts();
  }, []);

  const addItem = () => {
    if (!current.exercise_id) return;

    setItems([
      ...items,
      {
        exercise_id: current.exercise_id,
        sets: current.sets || 3,
        reps: current.reps || 10,
        note: current.note || "",
      },
    ]);

    setCurrent({
      exercise_id: "",
      sets: "",
      reps: "",
      note: "",
    });
  };

  const [current, setCurrent] = useState({
    exercise_id: "",
    sets: "",
    reps: "",
    note: "",
  });

  const createWorkout = async () => {
    if (!form.name) return alert("Nome do treino é obrigatório!");

    await axios.post(`${API}/workouts`, {
      name: form.name,
      user_id: 1,
      items,
    });

    setForm({ name: "", user_id: 1 });
    setItems([]);

    loadWorkouts();
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "25px" }}>Workouts</h1>

      {/* FORM PRINCIPAL */}
      <div
        style={{
          background: "#1d1d1d",
          padding: "20px",
          borderRadius: "12px",
          border: "1px solid #333",
          marginBottom: "25px",
        }}
      >
        <input
          placeholder="Nome do treino"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={inputStyleBig}
        />

        <h3 style={{ marginTop: "20px" }}>Adicionar Itens</h3>

        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <select
            value={current.exercise_id}
            onChange={(e) =>
              setCurrent({ ...current, exercise_id: e.target.value })
            }
            style={selectStyle}
          >
            <option value="">Selecione exercício</option>
            {exerciseList.map((ex) => (
              <option key={ex.id} value={ex.id}>
                {ex.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Sets"
            value={current.sets}
            onChange={(e) => setCurrent({ ...current, sets: e.target.value })}
            style={inputStyleSmall}
          />

          <input
            type="number"
            placeholder="Reps"
            value={current.reps}
            onChange={(e) => setCurrent({ ...current, reps: e.target.value })}
            style={inputStyleSmall}
          />

          <input
            placeholder="Note"
            value={current.note}
            onChange={(e) => setCurrent({ ...current, note: e.target.value })}
            style={inputStyleMedium}
          />

          <button onClick={addItem} style={buttonPrimary}>
            + Item
          </button>
        </div>

        {/* ITENS ADICIONADOS */}
        {items.length > 0 && (
          <div style={{ marginTop: "15px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {items.map((it, idx) => {
              const exercise = exerciseList.find((e) => e.id == it.exercise_id);
              return (
                <div
                  key={idx}
                  style={{
                    background: "#2b2b2b",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1px solid #444",
                  }}
                >
                  <strong>{exercise?.name}</strong>  
                  — {it.sets}x{it.reps}
                </div>
              );
            })}
          </div>
        )}

        <button
          onClick={createWorkout}
          style={{ ...buttonPrimary, marginTop: "25px", width: "100%" }}
        >
          Criar Treino
        </button>
      </div>

      {/* LISTA DE TREINOS */}
      <h2 style={{ marginBottom: "15px" }}>Treinos Criados</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {workouts.map((w) => (
          <div
            key={w.id}
            style={{
              background: "#1d1d1d",
              padding: "20px",
              borderRadius: "12px",
              border: "1px solid #333",
            }}
          >
            <h3>{w.name}</h3>
            <p style={{ color: "#aaa" }}>User: {w.user_id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

//
// ESTILOS
//

const inputStyleBig = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #444",
  background: "#2c2c2c",
  color: "white",
};

const inputStyleMedium = {
  padding: "10px",
  width: "150px",
  borderRadius: "8px",
  background: "#2c2c2c",
  border: "1px solid #444",
  color: "white",
};

const inputStyleSmall = {
  padding: "10px",
  width: "80px",
  borderRadius: "8px",
  background: "#2c2c2c",
  border: "1px solid #444",
  color: "white",
};

const selectStyle = {
  padding: "10px",
  background: "#2c2c2c",
  border: "1px solid #444",
  borderRadius: "8px",
  color: "white",
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