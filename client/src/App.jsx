import { Route, Routes } from "react-router-dom";
import Blogs from "./pages/Blogs";
import Profile from "./pages/Profile";
import UploadBlog from "./pages/UploadBlog";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import BlogInfo from "./Components/BlogInfo";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/upload" element={<UploadBlog />} />
        <Route path="/blog/:id" element={<BlogInfo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
