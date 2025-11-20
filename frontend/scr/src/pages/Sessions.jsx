import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:5000";

export default function Sessions() {
  const [workouts, setWorkouts] = useState([]);
  const [form, setForm] = useState({
    workout_id: "",
    notes: "",
    entries: [],
  });

  const [currentEntry, setCurrentEntry] = useState({
    workout_item_id: "",
    sets_done: "",
    reps_done: "",
    weight: "",
  });

  const [itemsFromWorkout, setItemsFromWorkout] = useState([]);

  // Carregar treinos
  const loadWorkouts = async () => {
    const res = await axios.get(`${API}/workouts`);
    setWorkouts(res.data);
  };

  // Carregar itens do treino selecionado
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
      entries: [...form.entries, currentEntry],
    });

    setCurrentEntry({
      workout_item_id: "",
      sets_done: "",
      reps_done: "",
      weight: "",
    });
  };

  const createSession = async () => {
    await axios.post(`${API}/sessions`, form);
    alert("Sessão registrada!");

    setForm({ workout_id: "", notes: "", entries: [] });
    setItemsFromWorkout([]);
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "25px" }}>Sessions</h1>

      {/* Card principal */}
      <div
        style={{
          background: "#1d1d1d",
          padding: "20px",
          borderRadius: "12px",
          border: "1px solid #333",
        }}
      >
        {/* Selecionar treino */}
        <label style={labelStyle}>Selecione um treino</label>
        <select
          value={form.workout_id}
          onChange={(e) => {
            setForm({ ...form, workout_id: e.target.value });
            loadWorkoutItems(e.target.value);
          }}
          style={selectStyle}
        >
          <option value="">Selecione...</option>
          {workouts.map((w) => (
            <option key={w.id} value={w.id}>
              {w.name}
            </option>
          ))}
        </select>

        {/* Anotações */}
        <label style={{ ...labelStyle, marginTop: "20px" }}>Anotações</label>
        <textarea
          placeholder="Notas da sessão..."
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          style={textareaStyle}
        />

        <h3 style={{ marginTop: "25px" }}>Registrar Execução</h3>

        {/* Registrar execução */}
        <div style={rowStyle}>
          <select
            value={currentEntry.workout_item_id}
            onChange={(e) =>
              setCurrentEntry({
                ...currentEntry,
                workout_item_id: e.target.value,
              })
            }
            style={selectStyle}
          >
            <option value="">Selecione um exercício</option>
            {itemsFromWorkout.map((item) => (
              <option key={item.id} value={item.id}>
                {item.exercise.name}
              </option>
            ))}
          </select>

          <input
            placeholder="Sets"
            value={currentEntry.sets_done}
            onChange={(e) =>
              setCurrentEntry({ ...currentEntry, sets_done: e.target.value })
            }
            style={inputSmall}
          />

          <input
            placeholder="Reps"
            value={currentEntry.reps_done}
            onChange={(e) =>
              setCurrentEntry({ ...currentEntry, reps_done: e.target.value })
            }
            style={inputSmall}
          />

          <input
            placeholder="Peso (kg)"
            value={currentEntry.weight}
            onChange={(e) =>
              setCurrentEntry({ ...currentEntry, weight: e.target.value })
            }
            style={inputSmall}
          />

          <button onClick={addEntry} style={buttonPrimary}>
            + Adicionar
          </button>
        </div>

        {/* Lista de execuções adicionadas */}
        <h3 style={{ marginTop: "25px" }}>Execuções adicionadas</h3>
        {form.entries.length === 0 && (
          <p style={{ color: "#777" }}>Nenhuma execução adicionada ainda.</p>
        )}

        <ul style={{ marginTop: "10px" }}>
          {form.entries.map((en, i) => (
            <li
              key={i}
              style={{
                background: "#2b2b2b",
                padding: "10px 14px",
                borderRadius: "8px",
                border: "1px solid #444",
                marginBottom: "10px",
              }}
            >
              <strong>Item:</strong> {en.workout_item_id} —{" "}
              <strong>{en.sets_done}x{en.reps_done}</strong> —{" "}
              <span style={{ color: "#aaa" }}>{en.weight} kg</span>
            </li>
          ))}
        </ul>

        {/* Botão Finalizar */}
        <button
          onClick={createSession}
          style={{ ...buttonPrimary, marginTop: "20px", width: "100%" }}
        >
          Finalizar Sessão
        </button>
      </div>
    </div>
  );
}

//
// ESTILOS
//

const labelStyle = {
  color: "#ccc",
  fontSize: "14px",
  marginBottom: "5px",
  display: "block",
};

const selectStyle = {
  padding: "12px",
  background: "#2c2c2c",
  border: "1px solid #444",
  borderRadius: "8px",
  color: "white",
  width: "100%",
  marginBottom: "15px",
};

const textareaStyle = {
  width: "100%",
  padding: "12px",
  background: "#2c2c2c",
  border: "1px solid #444",
  borderRadius: "8px",
  color: "white",
  minHeight: "80px",
};

const rowStyle = {
  display: "flex",
  gap: "10px",
  alignItems: "center",
  flexWrap: "wrap",
};

const inputSmall = {
  padding: "10px",
  width: "90px",
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