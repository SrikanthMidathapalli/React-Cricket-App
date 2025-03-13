import React, { useEffect, useState } from "react";
import axios from "axios";

function PlayerFormat() {
    const [player, setPlayer] = useState([]);

    const [plrFormat, setplrFormat] = useState({
        "id": "",
        "format": "",
        "runs": 0,
        "wickets": 0,
        "playerId": "" 
    });

    useEffect(() => {
        axios.get('http://localhost:3000/Player')
            .then(response => {
                setPlayer(response.data);
                console.log(response.data);
            })
            .catch(err => {
                console.error(err);
                alert(err);
            });
    }, []);

    const AddFormatInfo = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3000/GameFormat', plrFormat)
            .then(response => {
                alert("Data is Added: ");
            })
            .catch(err => {
                console.error(err);
                alert(err);
            });
    };

    return (
        <div>
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">
                            <b>Player Game Format</b>
                        </div>
                        <div className="card-body">
                            <form name="plrReg" method="post" onSubmit={AddFormatInfo}>
                            <label>Format ID</label>
                                <input type="text" name="format"
                                    className="form-control" value={plrFormat.id}
                                    onChange={(e) => { setplrFormat({ ...plrFormat, id: e.target.value }) }} />
                                <br />
                                <label>Player Name</label>
                                <select className="form-control" value={plrFormat.playerId}
                                    onChange={(e) => { setplrFormat({ ...plrFormat, playerId: e.target.value }) }}>
                                    <option value="-1">Select Player name</option>
                                    {
                                        player.map((plr) => (
                                            <option key={plr.id} value={plr.id}>{plr.playerName}</option> 
                                        ))
                                    }
                                </select>
                                <br />
                                <label>Game Format</label>
                                <select className="form-control" value={plrFormat.format}
                                    onChange={(e) => { setplrFormat({ ...plrFormat, format: e.target.value }) }}>
                                    <option value="-1">Select Game Format</option>
                                    <option value="T20">T20</option>
                                    <option value="Oneday">Oneday</option>
                                    <option value="Test">Test</option>
                                </select>
                                <br />
                                <label>Player Runs</label>
                                <input type="text" name="runs"
                                    className="form-control" value={plrFormat.runs}
                                    onChange={(e) => { setplrFormat({ ...plrFormat, runs: e.target.value }) }} />
                                <br />
                                <label>Wickets</label>
                                <input type="text" name="wkts"
                                    className="form-control" value={plrFormat.wickets}
                                    onChange={(e) => { setplrFormat({ ...plrFormat, wickets: e.target.value }) }} />
                                <br />
                                <input type="submit" value="Add Format Information" className="btn btn-success" />
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-4"></div>
            </div>
        </div>
    );
}

export default PlayerFormat;
