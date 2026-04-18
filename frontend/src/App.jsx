import {BrowserRouter} from "react-router-dom";
import PageRoutes from "./Router";
import {Toaster} from "react-hot-toast";
import { AuthProvider } from "./contexts/authContext";
import Navbar from "./components/Navbar";

function App() {
  
  return (
    <>
    <Toaster/>
    <BrowserRouter>
    <AuthProvider>
    <Navbar/>
    <PageRoutes/>
    </AuthProvider>
    </BrowserRouter>
    
    </>
  )
}

export default App
