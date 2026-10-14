import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Feedback from "./pages/Feedback";
import FeedbackComentario from "./pages/FeedbackComentario";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home></Home>}/>
        <Route path="/feedback" element={<Feedback></Feedback>}/>
        <Route path="/feedbackcomentario/:id" element={<FeedbackComentario></FeedbackComentario>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
