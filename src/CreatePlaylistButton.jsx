import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import UserContext from "./contexts/UserContext";
import { addTracksToPlaylist, createPlaylist } from "./utils/spotify";

const CreatePlaylistButton = ({ tracksUris }) => {
  const [playlistName, setName] = useState("");
  const userData = useContext(UserContext);

  const handleButtonClick = async () => {
    const data = await createPlaylist(
      userData.token,
      userData.id,
      playlistName
    );

    const playlistId = data.id;

    addTracksToPlaylist(userData.token, playlistId, tracksUris);
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

CreatePlaylistButton.propTypes = {
  tracksUris: PropTypes.arrayOf(PropTypes.string),
};

CreatePlaylistButton.defaultProps = {
  tracksUris: [],
};

export default CreatePlaylistButton;
