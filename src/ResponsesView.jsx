import PropTypes from "prop-types";
import React from "react";
import "./css/TrackView.css";

const trackType = PropTypes.shape({
  trackId: PropTypes.string,
  artist: PropTypes.string,
  name: PropTypes.string,
  album: PropTypes.string,
  albumCover: PropTypes.string,
  hasError: PropTypes.bool,
  id: PropTypes.string,
  duration: PropTypes.number,
});

const errorType = PropTypes.shape({
  message: PropTypes.string,
  hasError: PropTypes.bool,
  id: PropTypes.string,
});

const responsesType = PropTypes.oneOfType([trackType, errorType]);

const parseDuration = (durationInMs) => {
  const durationInSec = Math.floor(durationInMs / 1000);
  const minutes = Math.floor(durationInSec / 60);
  const seconds = durationInSec % 60;

  return `${minutes}:${seconds}`;
};

const TrackView = ({ track, idx }) => {
  const durationStr = parseDuration(track.duration);
  return (
    <div className="trackContainer">
      <h1 className="idx">{idx}</h1>
      <img className="albumCover" src={track.albumCover} alt="" />
      <div className="trackDataContainer">
        <p>{track.artist}</p>
        <p>{track.name}</p>
      </div>
      <p className="trackDataContainer">{track.album}</p>
      <p className="trackDataContainer">{durationStr}</p>
    </div>
  );
};

TrackView.propTypes = {
  track: trackType,
  idx: PropTypes.number,
};

TrackView.defaultProps = {
  track: null,
  idx: -1,
};

const ErrorView = ({ error, idx }) => {
  return (
    <div className="trackContainer errorIndicator" color="red">
      <h1 className="idx">{idx}</h1>
      <p>There was an error: {error.message}</p>
    </div>
  );
};

ErrorView.propTypes = {
  error: errorType,
  idx: PropTypes.number,
};

ErrorView.defaultProps = {
  error: null,
  idx: -1,
};

const ResponsesView = ({ responses }) => {
  const views = responses.map((response, idx) => {
    if (!response.hasError)
      return <TrackView track={response} idx={idx + 1} key={response.id} />;
    return <ErrorView error={response} idx={idx + 1} key={response.id} />;
  });

  return <div className="responseContainer">{views}</div>;
};

ResponsesView.propTypes = {
  responses: PropTypes.arrayOf(responsesType),
};

ResponsesView.defaultProps = {
  responses: [],
};

export default ResponsesView;
