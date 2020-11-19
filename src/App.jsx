import React, { useEffect, useState } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import SpotifyLogin from "./SpotifyLogin";
import SpotifyPlaylists from "./SpotifyPlaylists";
import SpotifySongSearch from "./SpotifySongSearch";
import { getToken, setToken } from "./utils/tokenStorage";
import {
  getAccessTokenFromLocationHash,
  fetchSpotifyUsername,
} from "./utils/spotify";
import "./css/App.css";
import UserContext from "./contexts/UserContext";

const App = () => {
  const [authorized, setAuthorized] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!getToken()) {
      const token = getAccessTokenFromLocationHash(window.location.hash);
      if (!token) return;
      setToken(token);
    }

    const authorize = async () => {
      const token = getToken();
      const user = await fetchSpotifyUsername(token);

      setUserData({ token, ...user });
    };

    authorize();
    setAuthorized(true);
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/">
          <UserContext.Provider value={userData}>
            <div className="container">
              <div className="headContainer">
                <h1>Spotify playlist generator</h1>
                <SpotifyLogin authorized={authorized} />
              </div>
              <SpotifySongSearch authorized={authorized} />
              <SpotifyPlaylists />
            </div>
          </UserContext.Provider>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
