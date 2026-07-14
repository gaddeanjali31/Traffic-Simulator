import { useState } from "react";
import "./Map.css";

function Map() {

    const [junctionName, setJunctionName] = useState("");
    const [junctions, setJunctions] = useState([]);

    function addJunction() {

        if (junctionName.trim() === "") {
            alert("Please enter a junction name.");
            return;
        }

        const newJunction = {
            id: Date.now(),
            name: junctionName,
            status: "Active"
        };

        setJunctions([...junctions, newJunction]);
        setJunctionName("");
    }

    function deleteJunction(id) {

        setJunctions(
            junctions.filter(j => j.id !== id)
        );

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

            <div className="junction-list">

                {

                    junctions.map((junction) => (

                        <div
                            className="junction-card"
                            key={junction.id}
                        >

                            <h3>📍 {junction.name}</h3>

                            <p><strong>ID:</strong> {junction.id}</p>

                            <p><strong>Status:</strong> {junction.status}</p>

                            <button
                                className="delete-btn"
                                onClick={() => deleteJunction(junction.id)}
                            >
                                🗑 Delete
                            </button>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default Map;