import React, { useEffect, useReducer } from "react";
import logger from "use-reducer-logger";
const MLBStatsAPI = require("mlb-stats-api");
const mlbStats = new MLBStatsAPI();

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state };
    case "FETCH_SUCCESS":
      return { ...state, teams: action.payload };
    case "FETCH_FAIL":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

function Teams() {
  const [{ teams }, dispatch] = useReducer(logger(reducer), {
    teams: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const response = await mlbStats.getTeams({
          params: {
            sportId: 1,
          },
        });

        console.log(response);

        dispatch({
          type: "FETCH_SUCCESS",
          payload: response.data.teams,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {teams?.map((i) => (
        <div key={i.id}>{i.name}</div>
      ))}
    </div>
  );
}

export default Teams;
