import React, { useState, useContext } from "react";
import UserContext from "./contexts/UserContext";
import { createPlaylist } from "./utils/spotify";

const CreatePlaylistButton = () => {
  const [playlistName, setName] = useState("");
  const userData = useContext(UserContext);

  const handleButtonClick = async () => {
    const data = await createPlaylist(
      userData.token,
      userData.id,
      playlistName
    );
    console.log(data);
  };

  return (
    <div>
      <input
        type="text"
        value={playlistName}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <button type="button" onClick={handleButtonClick}>
        Create playlist
      </button>
    </div>
  );
};

export default CreatePlaylistButton;
