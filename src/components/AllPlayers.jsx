import { useState, useEffect } from "react";
import { fetchAllPlayers } from "../api";
import PlayerListName from "./PlayerListName";
import CreatePlayerForm from "./CreatePlayerForm";

export default function AllPlayers() {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);
  const [searchParam, setSearchParam] = useState("");

  useEffect(() => {
    async function getAllPlayers() {
      const APIResponse = await fetchAllPlayers();
      if (APIResponse.success) {
        setPlayers(APIResponse.data.players);
      } else {
        setError(APIResponse.error.message);
      }
    }
    getAllPlayers();
  }, []);

  const playersToDisplay = searchParam
    ? players.filter((player) =>
        player.name.toLowerCase().includes(searchParam)
      )
    : players;
  return (
    <div>
      <div>
        <label>
          Search:{" "}
          <input
            type="text"
            placeholder="search"
            onChange={(e) => setSearchParam(e.target.value.toLowerCase())}
          />
        </label>
      </div>
      <CreatePlayerForm players={players} setPlayers={setPlayers} />
      {error && <p>{error}</p>}
      {playersToDisplay.map((player) => {
        return <PlayerListName key={player.id} player={player} />;
      })}
    </div>
  );
}