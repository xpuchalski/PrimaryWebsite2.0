import { Navigate, Route, Routes } from "react-router-dom";
import SiteLayout from "./components/SiteLayout";
import { pages } from "./pages/registry";

function App() {
  const firstPath = pages[0]?.path ?? "/";

  return (
    <SiteLayout pages={pages}>
      <Routes>
        {pages.map((page) => (
          <Route key={page.path} path={page.path} element={<page.Component />} />
        ))}
        <Route path="*" element={<Navigate to={firstPath} replace />} />
      </Routes>
    </SiteLayout>
  );
}

export default App;
