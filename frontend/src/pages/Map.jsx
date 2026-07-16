import { useState } from "react";
import "./Map.css";

function Map() {

    const [junctionName, setJunctionName] = useState("");
    const [junctions, setJunctions] = useState([]);

    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [distance, setDistance] = useState("");
    const [roads, setRoads] = useState([]);

    function addJunction() {

        if (junctionName.trim() === "") {
            alert("Please enter a junction name.");
            return;
        }

       const newJunction = {
    id: Date.now(),
    name: junctionName,
    status: "Active",
    signal: "🔴 Red",
    traffic: "🟢 Low"
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
                        <p>
    <strong>Signal:</strong> {junction.signal}
    <p>
    <strong>Traffic:</strong> {junction.traffic}
</p>
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