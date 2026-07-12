import { NavLink } from "react-router-dom";

function Sidebar() {

    return (

        <div className="sidebar">

            <NavLink to="/">🏠 Home</NavLink>

            <NavLink to="/dashboard">📊 Dashboard</NavLink>

            <NavLink to="/map">🗺 Map</NavLink>

            <NavLink to="/analytics">📈 Analytics</NavLink>

            <NavLink to="/settings">⚙ Settings</NavLink>

        </div>

    );

}

export default Sidebar;