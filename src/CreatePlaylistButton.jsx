import React, { useState } from "react";

const CreatePlaylistButton = () => {
  const [playlistName, setName] = useState("");

  const handleButtonClick = () => {
    console.log("creating...");
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
