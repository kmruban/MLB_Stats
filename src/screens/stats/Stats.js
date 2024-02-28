import React, { useEffect, useReducer, useState } from "react";
import logger from "use-reducer-logger";
import StatsFilters from "../../components/stats/filters/StatsFilters";
import HittingStatsTable from "../../components/stats/tables/HittingStatsTable";
import PitchingStatsTable from "../../components/stats/tables/PitchingStatsTable";
import "./stats.scss";

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

function Stats() {
  const [statType, setStatType] = useState("Hitting");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedLeague, setSelectedLeague] = useState();
  const [selectedLeagueLabel, setSelectedLeagueLabel] = useState("MLB");

  const [{ stats }, dispatch] = useReducer(logger(reducer), {
    stats: [],
  });

  useEffect(() => {
    var activeAlready;
    var newActive;
    if (statType === "Hitting") {
      fetchHittingData();
      activeAlready = document.getElementById("pitching_stats");
      activeAlready.classList.remove("active");
      newActive = document.getElementById("hitting_stats");
      newActive.classList.add("active");
    }
    if (statType === "Pitching") {
      fetchPitchingData();
      activeAlready = document.getElementById("hitting_stats");
      activeAlready.classList.remove("active");
      newActive = document.getElementById("pitching_stats");
      newActive.classList.add("active");
    }
  }, [statType, selectedYear, selectedLeague]);

  const fetchHittingData = async () => {
            //   gameType: "S",
    try {
      dispatch({ type: "FETCH_REQUEST" });
      const response = await mlbStats.getStats({
        params: {
          stats: "season",
          group: "hitting",
          limit: 1000,
          season: selectedYear,
          sortStat: "onBasePlusSlugging",
          order: "desc",
          leagueIds: selectedLeague
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

  const fetchPitchingData = async () => {
    try {
      dispatch({ type: "FETCH_REQUEST" });
      const response = await mlbStats.getStats({
        params: {
          stats: "season",
          group: "pitching",
          limit: 1000,
          season: selectedYear,
          sortStat: "earnedRunAverage",
          order: "asc",
          leagueIds: selectedLeague
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
    <div className="stats_page">
      <h1 className="title">MLB Stats</h1>
      <div className="stats_routes">
        <button
          className="active"
          id="hitting_stats"
          onClick={() => setStatType("Hitting")}
        >
          Hitting
        </button>
        <button id="pitching_stats" onClick={() => setStatType("Pitching")}>
          Pitching
        </button>
      </div>
      <StatsFilters
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedLeague={selectedLeague}
        setSelectedLeague={setSelectedLeague}
        selectedLeagueLabel={selectedLeagueLabel}
        setSelectedLeagueLabel={setSelectedLeagueLabel}
      />
      {statType === "Hitting" && <HittingStatsTable hittingStats={stats} />}
      {statType === "Pitching" && <PitchingStatsTable pitchingStats={stats} />}
    </div>
  );
}

export default Stats;
