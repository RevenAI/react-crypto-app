import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Coin from "./pages/coin/Coin";
import Profile from "./pages/profile/Profile";
import Pricing from "./pages/pricing/Pricing";
import Features from "./pages/features/Features";
import NotFound from "./pages/notFound/NotFound";
import About from "./pages/about/About";

const App = () => {
  return (
    <div className="app">
      <div className="app-container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:coinID" element={<Coin />} />
        <Route path="/profile/:userID" element={<Profile />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      </div>
    </div>
  );
};

export default App;

