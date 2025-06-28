import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './store/store.js'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from "./screens/Login.jsx"
import HomeDashboard from "./screens/HomeDashboard.jsx"
import SignUp from "./screens/SignUp.jsx"
import IncomePage from "./screens/IncomePage.jsx"
import ExpensesPage from "./screens/ExpensesPage.jsx"

createRoot(document.getElementById('root')).render(
  
<Provider store={store}>
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/signup' element={<SignUp/>}/>
        <Route path='/' element={<App/>}>
          <Route path='/dashboard' element={<HomeDashboard />}/>
          <Route path='/income' element={<IncomePage/>}/>
          <Route path='/expenses' element={<ExpensesPage/>}/>
          <Route />
        </Route>
      </Routes>
    </BrowserRouter>
</Provider>,
)
