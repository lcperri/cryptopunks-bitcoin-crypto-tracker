import { useLocation, useNavigate } from 'react-router-dom';
const BackButton = () => {
    const navigate = useNavigate()
    const location = useLocation();

  // Verifica si estamos en la página principal (ej. '/')
    const isHomePage = location.pathname === '/';

    const handleGoBack = () => {
        // Si no está en la página principal, navega hacia atrás
        if (!isHomePage) {
        navigate(-1); // Equivalente a history.goBack()
        }
        // Si está en la página principal, no hace nada
    };


      return (
    <button
      onClick={() => handleGoBack()} disabled={isHomePage}
      className="cursor-pointer fixed bottom-6 right-6 bg-gradient-to-r bg-emerald-600 to-cyan-600 hover:bg-cyan-600 text-white p-4 rounded-full shadow-lg
      transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center border-gray-700 mt-2 z-10 backdrop-blur-md" aria-label="Volver atrás"
      
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
    </button>
  )
}

export default BackButton