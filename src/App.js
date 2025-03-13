import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { useEffect, useState } from 'react';
import GenNavBar from './menus/GenNavBar';
import NavBar from './menus/NavBar';
import PlayerNavBar from './menus/PlayerNavBar';
import Login from './Login';
import Logout from './menus/Logout';
import PlayerInfo from './admin/PlayerInfo';
import AddPlayer from './admin/AddPlayer';
import PlayerFormat from './admin/PlayerFormat';
import PlayerBio from './player/PlayerBio';
import ChangePassword from './player/ChangePassword';
import SearchPlayersBasedOnFormat from './admin/SearchPlayersBasedOnFormat';
import SearchPlayersBasedOnType from './admin/SearchPlayersBasedOnType';
import Footer from './menus/Footer';
import EditPlayer from './admin/EditPlayer';
import DeletePlayer from './admin/DeletePlayer';
import PlayerList from './admin/PlayerSearchCardView';
import PlayerSearch from './admin/PlayerSearchCardView';
import PlayerSearchCardView from './admin/PlayerSearchCardView';
import PlayerSearchExactMatchCardView from './admin/PlayerSearchExactMatchCardView';
import Home from './Home';
import About from './About';
import Contact from './Contact';

const ProtectedRoute = ({ children }) => {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  if (!loggedInUser) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  const [loginStatus, setLoginStatus] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      if (loggedInUser.role === "Player") {
        setLoginStatus("player");
      } else if (loggedInUser.role === "Admin") {
        setLoginStatus("admin");
      }
    } else {
      setLoginStatus("gen");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setLoginStatus("gen");
  };

  const renderNavbar = () => {
    if (loginStatus === "player") {
      return <PlayerNavBar />;
    } else if (loginStatus === "admin") {
      return <NavBar />;
    } else {
      return <GenNavBar />;
    }
  };

  if (loginStatus === null) {
    return <div>Loading...</div>;  // Optional: add more advanced loading handling if needed
  }

  return (
    <BrowserRouter>
      {renderNavbar()}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<Login setLoginstatus={setLoginStatus} />} />
        <Route path="/search1" element={<SearchPlayersBasedOnFormat />} />
        <Route path="/search2" element={<SearchPlayersBasedOnType />} />

        <Route path="/viewplayers" element={<ProtectedRoute><PlayerInfo /></ProtectedRoute>} />
        <Route path="/addplr" element={<ProtectedRoute><AddPlayer /></ProtectedRoute>} />
        <Route path="/editplayer/:id" element={<ProtectedRoute><EditPlayer /></ProtectedRoute>} />
        <Route path="/deleteplayer/:id" element={<ProtectedRoute><DeletePlayer /></ProtectedRoute>} />
        <Route path="/addgame" element={<ProtectedRoute><PlayerFormat /></ProtectedRoute>} />
        <Route path="/player" element={<ProtectedRoute><PlayerBio /></ProtectedRoute>} />
        <Route path="/changepassword" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
        <Route path="/logout" element={<Logout setLoginstatus={setLoginStatus} handleLogout={handleLogout} />} />
        <Route path="/searchplayername" element={<PlayerSearchExactMatchCardView />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
