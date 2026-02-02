import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Comments from "./components/Comments";
import CommentsAdmin from "./pages/CommentsAdmin";

function App() {
  return (
    <Routes>
      {/* Pages WITH navbar */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/comments" element={<Comments />} />
      </Route>

      {/* Admin page (NO navbar) */}
      <Route path="/admin/comments" element={<CommentsAdmin />} />
    </Routes>
  );
}

export default App;
