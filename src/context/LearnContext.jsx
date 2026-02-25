import { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";

const LearnContext = createContext();

export const LearnProvider = ({ children }) => {
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);

  const { token } = useContext(AuthContext);

  const fetchTracks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/tracks");
      setTracks(res.data.data.tracks);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTrackById = useCallback(
    async (trackId) => {
      if (!trackId) return;
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/api/tracks/${trackId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCurrentTrack(res.data.data.track);
        setLessons(res.data.data.lessons);
      } catch (err) {
        console.error("Error fetching track:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  return (
    <LearnContext.Provider
      value={{
        tracks,
        currentTrack,
        lessons,
        loading,
        fetchTracks,
        fetchTrackById,
      }}
    >
      {children}
    </LearnContext.Provider>
  );
};

export default LearnContext