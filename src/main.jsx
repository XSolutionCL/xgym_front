import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import { IoCloseSharp } from 'react-icons/io5';
import { ToastBar, Toaster, toast } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ConfigProvider, Button } from 'antd';
import locale from 'antd/locale/es_ES';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 30000,
      onError: (error) => {
        if (error.response) {
          const status = error.response.status;
          if (status === 400) {
            toast.error('Los datos enviados son inválidos.');
          } else if (status === 401) {
            console.log('Error: No estás autorizado para realizar esta acción.');
          } else if (status === 404) {
            toast.error('Error: No se encontró el recurso solicitado.');
          } else {
            toast.error('Ocurrió un error inesperado. Por favor, contáctenos.');
          }
        } else {
          toast.error('No se pudo conectar al servidor. Por favor, verifica tu conexión.');
        }
      }
    },
    mutations: {
      retry: false,
      onError: (error) => {
        if (error.response) {
          const status = error.response.status;
          if (status === 400) {
            toast.error('Los datos enviados son inválidos.');
          } else if (status === 401) {
            console.log('Error: No estás autorizado para realizar esta acción.');
          } else if (status === 404) {
            toast.error('Error: No se encontró el recurso solicitado.');
          } else {
            toast.error('Ocurrió un error inesperado. Por favor, contáctenos.');
          }
        } else {
          toast.error('No se pudo conectar al servidor. Por favor, verifica tu conexión.');
        }
      }
    }
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ConfigProvider locale={locale}>
        <App />
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: '',
            duration: 3000,
            style: {
              background: 'white',
              fontSize: '16px',
              width: '100%',
              minWidth: '450px',
              /* border: '1px solid #713200', */
              padding: '8px',
              color: '#212529',
            },
            /* success: {
              icon: <div className='flex items-center justify-center w-8 h-full'>
                <BsCheck2Circle size="1.2em" enableBackground className='w-full h-full bg-green-400' color='green'/>
              </div>
            } */
          }}
        >
          {(t) => (
            <ToastBar
              toast={t}
              style={{
                ...t.style,
                animation: t.visible ? 'custom-enter 1s ease' : 'custom-exit 1s ease',
              }}
            >
              {({ icon, message }) => (
                <div className='flex flex-row items-center justify-around w-full h-full'>
                  {icon}
                  {message}
                  {t.type !== 'loading' && (
                    <Button type="link" className="text-gray-900" onClick={() => toast.remove(t.id)}>
                      <IoCloseSharp size="1.2em" />
                    </Button>
                  )}
                </div>
              )}
            </ToastBar>
          )}
        </Toaster>
      </ConfigProvider>
    </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
