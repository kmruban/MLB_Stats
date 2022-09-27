import React, { useEffect, useReducer } from "react";
import logger from "use-reducer-logger";
import './scores.scss';
import { scoresHelper } from "../../helpers/stats/StatsHelpers";
const MLBStatsAPI = require("mlb-stats-api");
const mlbStats = new MLBStatsAPI();

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state };
    case "FETCH_SUCCESS":
      return { ...state, scores: action.payload };
    case "FETCH_FAIL":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

function Scores() {
  const current = new Date();
  const currentDate = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`;

  const [{ scores }, dispatch] = useReducer(logger(reducer), {
    scores: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const response = await mlbStats.getSchedule({
          params: {
            sportId: 1,
            date: currentDate,
          },
        });
        
        scoresHelper(response);
      
        dispatch({
          type: "FETCH_SUCCESS",
          payload: response.data.dates[0].games,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [currentDate]);

  return (
    <div className="scores_page">
      <h1>Scores</h1>
      <p>{currentDate}</p>
      <div className="games">
      <ul>
        {scores?.map((i) => (
          <li key={i.gamePk}>
            <div className="game_item">
              <div className="game_details">
                <ul>
                  <li>
                    <img
                      src={`https://www.mlbstatic.com/team-logos/team-cap-on-light/${i.teams.away.team.id}.svg`}
                      alt=""
                      className="logo"
                    />
                    <div className="team">
                      <a href={`/gameday/${i.gamePk}`}>
                        {i.teams.away.team.name}
                      </a>
                      <p>
                        (
                        {i.teams.away.leagueRecord.wins +
                          "-" +
                          i.teams.away.leagueRecord.losses}
                        )
                      </p>
                    </div>
                  </li>
                  <li>
                    <img
                      src={`https://www.mlbstatic.com/team-logos/team-cap-on-light/${i.teams.home.team.id}.svg`}
                      alt=""
                      className="logo"
                    />
                    <div className="team">
                      <a href={`/gameday/${i.gamePk}`}>
                        {i.teams.home.team.name}
                      </a>
                      <p>
                        (
                        {i.teams.home.leagueRecord.wins +
                          "-" +
                          i.teams.home.leagueRecord.losses}
                        )
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="game_location">{i.venue.name}</div>            
              <div className="game_status">{i.gameDate}</div>
            </div>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default Scores;