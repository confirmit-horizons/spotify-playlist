const parseArtistsTracks = (text) => {
  return text
    .split("\n")
    .filter((artistTrackStr) => artistTrackStr.trim().length)
    .map((artistTrackStr) => {
      const splitArtistTrack = artistTrackStr.split(" - ");

      if (splitArtistTrack.length < 2)
        return { artist: splitArtistTrack[0].trim(), track: "" };

      return {
        artist: splitArtistTrack[0].trim(),
        track: splitArtistTrack[1].trim(),
      };
    });
};

export default parseArtistsTracks;
