import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Workouts from "./pages/Workouts";
import Sessions from "./pages/Sessions";

import Exercises from "./pages/Exercises";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/exercises" element={<Exercises />} />
          
          {/* Páginas futuras */}
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/sessions" element={<Sessions />} />

          {/* Página inicial */}
          <Route path="/" element={<h1>Welcome to GymApp</h1>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}