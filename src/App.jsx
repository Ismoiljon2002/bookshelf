import NotFoundPage from "./assets/pages/NotFound";
import SignInPage from "./assets/pages/SignIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from "./assets/pages/SignUp";
import Home from "./assets/pages/Home";

function App() {

  return (
        // <SignUpPage />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/sign-in" element={<SignInPage />} /> 
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
