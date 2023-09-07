import './App.css'
import Login from './pages/Login'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useAuthStore } from './common/store/authStore'
import { ProtectedRoute } from './middleware/ProtectedRoutes';
import routes from './routes'
import Layer from './common/Layout'

function App() {

  const isAuth = useAuthStore((state) => state.isAuth);

  return (
    <Routes>
        <Route path="/" element={<Login/>} exact/>
        <Route element={<ProtectedRoute isAllowed={isAuth} />}>
            {
              routes.map((route, index) => (
                <Route path={route.path} element={<Layer>{<route.component/>}</Layer>} key={index} exact/>
              ))
            }
        </Route>  
        <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

function NotFound() {
  const navigate = useNavigate();
  return (
      <div className="flex flex-col items-center justify-center w-screen h-screen">
          <h1 className="text-6xl font-bold">404</h1>
          <p className="text-2xl text-gray-500">Página no encontrada!!!</p>
          <button
              type='button'
              onClick={() => navigate(-1)}
              className="px-4 py-2 mt-8 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
              Regresar a página anterior
          </button>
      </div>
  );
}

export default App
