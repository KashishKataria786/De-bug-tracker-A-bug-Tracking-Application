import './App.css'
import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import AnalyticsPage from './pages/AnalyticsPage.jsx'
import NotFound from './pages/NotFound.jsx'
import Dashboard from './pages/Dashboard.jsx'
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/analytics' element={<AnalyticsPage/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </>
  )
}

export default App
