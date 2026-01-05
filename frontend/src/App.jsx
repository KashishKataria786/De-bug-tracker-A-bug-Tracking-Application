import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoadingSpinner from "./components/ui/LoadingSpinner.jsx";
import { useEffect ,useState,lazy, Suspense } from "react";

const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const AnalyticsPage = lazy(() => import("./pages/AnalyticsPage.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const KanbanPage= lazy(()=>import('./pages/KanbanPage.jsx'));
const NotResponsive = lazy(()=>import('./components/ui/NotResponsive.jsx'));

function App() {
  const [screenWidth,setScreenWidth] = useState(window.innerWidth);
  useEffect(()=>{
  function handleResize (){
    setScreenWidth(window.innerWidth);
  }
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
  },[])

  if(screenWidth < 768)return <NotResponsive/>
  
  return (
    <>
      <Suspense
        fallback={
          <div className="w-screen h-screen flex items-center justify-center">
            <LoadingSpinner />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path ='/kanban' element={<KanbanPage/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
