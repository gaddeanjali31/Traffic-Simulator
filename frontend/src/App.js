import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Map from "./pages/Map";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

import { Routes, Route } from "react-router-dom";

function App() {

    return (

        <>

            <Navbar />

            <div className="container">

                <Sidebar />

                <div className="content">

                    <Routes>

                        <Route path="/" element={<Home />} />

                        <Route path="/dashboard" element={<Dashboard />} />

                        <Route path="/map" element={<Map />} />

                        <Route path="/analytics" element={<Analytics />} />

                        <Route path="/settings" element={<Settings />} />

                    </Routes>

                </div>

            </div>

        </>

    );

}

export default App;