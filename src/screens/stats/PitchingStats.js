import React, { useEffect, useReducer } from "react";
import logger from "use-reducer-logger";
import PitchingStatsTable from "../../components/stats_tables/PitchingStatsTable";
import './stats.scss';

const MLBStatsAPI = require("mlb-stats-api");
const mlbStats = new MLBStatsAPI();

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state };
    case "FETCH_SUCCESS":
      return { ...state, stats: action.payload };
    case "FETCH_FAIL":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

function PitchingStats() {
  const [{ stats }, dispatch] = useReducer(logger(reducer), {
    stats: [],
  });

  useEffect(() => {
      fetchData();
    
  }, []);

  const fetchData = async () => {
    try {
      dispatch({ type: "FETCH_REQUEST" });
      const response = await mlbStats.getStats({
        params: {
          stats: "season",
          group: "pitching",
          limit: 1000,
        },
      });
      dispatch({
        type: "FETCH_SUCCESS",
        payload: response.data.stats[0].splits,
      });
    } catch (error) {
      dispatch({
        type: "FETCH_FAIL",
        payload: error.message,
      });
    }
  };

  return (
    <div>
     <PitchingStatsTable pitchingStats={stats} />
    </div>
  );
}

export default PitchingStats;
