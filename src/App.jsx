import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import SearchVideo from "./pages/SearchVideo";
// import SearchVideo from "./pages/SearchVideo";
import FindVideo from "./components/FindVideo";
import AnalyzedData from "./components/AnalyzedData";
import "./index.css";
import Library from "./pages/Library";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="searchVideos" element={<SearchVideo />}>
            <Route index element={<Navigate to="findVideo" replace />} />
            <Route path="findVideo" element={<FindVideo />} />

            <Route path="ai" element={<AnalyzedData />} />
            <Route path="ai/:rank" element={<AnalyzedData />} />
          </Route>
          <Route path="library" element={<Library />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
