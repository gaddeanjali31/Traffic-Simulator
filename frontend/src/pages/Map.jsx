import { useState } from "react";
import "./Map.css";

function Map() {

    const [junctionName, setJunctionName] = useState("");
    const [junctions, setJunctions] = useState([]);

    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [distance, setDistance] = useState("");
    const [roads, setRoads] = useState([]);
    const [start, setStart] = useState("");
const [destination, setDestination] = useState("");
const [routeResult, setRouteResult] = useState(null);

    function addJunction() {

        if (junctionName.trim() === "") {
            alert("Please enter a junction name.");
            return;
        }

       const newJunction = {
    id: Date.now(),
    name: junctionName,
    status: "Active",
    signal: "Red",
    vehicles: 0,
    traffic: "Low",
emergency: "None"
};

        setJunctions([...junctions, newJunction]);
        setJunctionName("");
    }

    function deleteJunction(id) {
        setJunctions(junctions.filter((j) => j.id !== id));
    }
    function changeSignal(id) {

    setJunctions(

        junctions.map((junction) => {

            if (junction.id === id) {

                let nextSignal = "";

                if (junction.signal === "🔴 Red")
                    nextSignal = "🟡 Yellow";

                else if (junction.signal === "🟡 Yellow")
                    nextSignal = "🟢 Green";

                else
                    nextSignal = "🔴 Red";

                return {
                    ...junction,
                    signal: nextSignal
                };
            }

            return junction;

        })

    );

}
function addTraffic(id) {

    setJunctions(

        junctions.map((junction) => {

            if (junction.id === id) {

                let vehicles = junction.vehicles + 20;

                let traffic = "Low";

                if (vehicles >= 60)
                    traffic = "High";
                else if (vehicles >= 30)
                    traffic = "Medium";

                return {
                    ...junction,
                    vehicles,
                    traffic
                };
            }

            return junction;

        })

    );

}
function dispatchEmergency(id, type) {

    setJunctions(

        junctions.map((junction) => {

            if (junction.id === id) {

                return {
                    ...junction,
                    emergency: type,
                    signal: "🟢 Green"
                };

            }

            return junction;

        })

    );

}
function findRoute() {

    if (start === "" || destination === "") {
        alert("Please select both junctions.");
        return;
    }

    if (start === destination) {
        alert("Start and Destination cannot be the same.");
        return;
    }

    const road = roads.find(
        (r) =>
            (r.from === start && r.to === destination) ||
            (r.from === destination && r.to === start)
    );

    if (road) {
        setRouteResult({
            route: `${start} ➜ ${destination}`,
            distance: road.distance
        });
    } else {
        setRouteResult({
            route: "No Direct Road Found",
            distance: "-"
        });
    }
}
function changeTraffic(id) {

    setJunctions(

        junctions.map((junction) => {

            if (junction.id === id) {

                let nextTraffic = "";

                if (junction.traffic === "🟢 Low")
                    nextTraffic = "🟡 Medium";

                else if (junction.traffic === "🟡 Medium")
                    nextTraffic = "🔴 High";

                else
                    nextTraffic = "🟢 Low";

                return {
                    ...junction,
                    traffic: nextTraffic
                };
            }

            return junction;

        })

    );

}

    function addRoad() {

        if (from === "" || to === "" || distance === "") {
            alert("Fill all road details.");
            return;
        }

        if (from === to) {
            alert("Choose two different junctions.");
            return;
        }

        const newRoad = {
            id: Date.now(),
            from,
            to,
            distance
        };

        setRoads([...roads, newRoad]);

        setFrom("");
        setTo("");
        setDistance("");
    }

    return (

        <div className="map-page">

            <h1>🗺 City Map</h1>

            <p className="subtitle">
                Build and manage your city's road network.
            </p>

            <input
                type="text"
                placeholder="Enter Junction Name"
                value={junctionName}
                onChange={(e) => setJunctionName(e.target.value)}
                className="input-box"
            />

            <button
                className="add-btn"
                onClick={addJunction}
            >
                Add Junction
            </button>

            <hr />

            <h2>Connect Junctions</h2>

            <select
                value={from}
                onChange={(e) => setFrom(e.target.value)}
            >
                <option value="">Select From</option>

                {junctions.map((j) => (
                    <option key={j.id} value={j.name}>
                        {j.name}
                    </option>
                ))}

            </select>

            <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
            >
                <option value="">Select To</option>

                {junctions.map((j) => (
                    <option key={j.id} value={j.name}>
                        {j.name}
                    </option>
                ))}

            </select>

            <input
                type="number"
                placeholder="Distance (km)"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
            />

            <button
                className="add-btn"
                onClick={addRoad}
            >
                Connect Road
            </button>

            <hr />

            <h2>Junctions</h2>

            <div className="junction-list">

                {junctions.map((junction) => (

                    <div
                        key={junction.id}
                        className="junction-card"
                    >

                        <h3>📍 {junction.name}</h3>

                        <p><strong>ID:</strong> {junction.id}</p>

<p><strong>Status:</strong> {junction.status}</p>

<p><strong>Signal:</strong> {junction.signal}</p>

<p><strong>Vehicles:</strong> {junction.vehicles}</p>

<p><strong>Traffic:</strong> {junction.traffic}</p>
<p>
    <strong>Emergency:</strong> {junction.emergency}
</p>
<button
    className="signal-btn"
    onClick={() => changeSignal(junction.id)}
>
    Change Signal
</button>
<button
    className="traffic-btn"
    onClick={() => changeTraffic(junction.id)}
>
    🚗 Change Traffic
</button>
<div className="emergency-buttons">

<button
className="ambulance-btn"
onClick={() => dispatchEmergency(junction.id,"🚑 Ambulance")}
>
🚑 Ambulance
</button>

<button
className="fire-btn"
onClick={() => dispatchEmergency(junction.id,"🚒 Fire Truck")}
>
🚒 Fire
</button>

<button
className="police-btn"
onClick={() => dispatchEmergency(junction.id,"🚓 Police")}
>
🚓 Police
</button>

</div>

                        <button
                            className="delete-btn"
                            onClick={() => deleteJunction(junction.id)}
                        >
                            🗑 Delete
                        </button>

                    </div>

                ))}

            </div>

            <hr />

            <h2>Road Network</h2>
            <hr />

<h2>🛣 Shortest Route Finder</h2>

<select
    value={start}
    onChange={(e) => setStart(e.target.value)}
>
    <option value="">Start Junction</option>

    {junctions.map((j) => (
        <option key={j.id} value={j.name}>
            {j.name}
        </option>
    ))}
</select>

<select
    value={destination}
    onChange={(e) => setDestination(e.target.value)}
>
    <option value="">Destination Junction</option>

    {junctions.map((j) => (
        <option key={j.id} value={j.name}>
            {j.name}
        </option>
    ))}
</select>

<button
    className="route-btn"
    onClick={findRoute}
>
    Find Route
</button>
{routeResult && (

<div className="route-card">

<h3>Shortest Route</h3>

<p>
<strong>Route:</strong> {routeResult.route}
</p>

<p>
<strong>Distance:</strong> {routeResult.distance} km
</p>

</div>

)}

            {roads.length === 0 ? (

                <p>No roads connected yet.</p>

            ) : (

                roads.map((road) => (

                    <div
                        key={road.id}
                        className="junction-card"
                    >

                        <p>
                            🚗 <strong>{road.from}</strong> ➜ <strong>{road.to}</strong>
                        </p>

                        <p>
                            Distance: {road.distance} km
                        </p>

                    </div>

                ))

            )}

        </div>

    );

}

export default Map;