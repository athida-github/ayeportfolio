import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Comments from "./components/Comments";
import CommentsAdmin from "./pages/CommentsAdmin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/comments" element={<Comments />} />

      {/* Admin page (hidden, URL-only) */}
      <Route path="/admin/comments" element={<CommentsAdmin />} />
    </Routes>
  );
}

export default App;
