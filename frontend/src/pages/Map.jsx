import { useState } from "react";
import "./Map.css";

function Map() {

    const [junctions, setJunctions] = useState([]);

    function addJunction() {

        const newJunction = {
            id: Date.now(),
            name: "Junction " + (junctions.length + 1),
            status: "Active"
        };

        setJunctions([...junctions, newJunction]);
    }

    function deleteJunction(id) {

        setJunctions(
            junctions.filter((junction) => junction.id !== id)
        );

    }

    return (

        <div className="map-page">

            <h1>🗺 City Map</h1>

            <p className="subtitle">
                Build and manage your city's road network.
            </p>

            <button
                className="add-btn"
                onClick={addJunction}
            >
                + Add New Junction
            </button>

            <div className="junction-list">

                {

                    junctions.map((junction) => (

                        <div
                            className="junction-card"
                            key={junction.id}
                        >

                            <h3>📍 {junction.name}</h3>

                            <p>
                                <strong>ID:</strong> {junction.id}
                            </p>

                            <p>
                                <strong>Status:</strong> {junction.status}
                            </p>

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