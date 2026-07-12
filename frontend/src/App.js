import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import "./App.css";

function App() {

    return (

        <>

            <Navbar/>

            <div className="container">

                <Sidebar/>

                <div className="content">

                    <h1>Welcome to AI Smart Traffic Simulator</h1>

                </div>

            </div>

        </>

    );

}

export default App;