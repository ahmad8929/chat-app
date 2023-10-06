import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Join from "./component/Join/Join";
import Chat from "./component/Chat/Chat";
import Home from "./component/Home/Home";
import Signup from "./component/Templet/signup";
import Signin from "./component/Templet/signin";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/join" element={<Join />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/signin" element={<Signin/>} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;