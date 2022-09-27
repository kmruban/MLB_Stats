import React, { useEffect, useReducer, useState } from "react";
import logger from "use-reducer-logger";
import moment from "moment";
import './scores.scss';
const MLBStatsAPI = require("mlb-stats-api");
const mlbStats = new MLBStatsAPI();

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state };
    case "FETCH_SUCCESS":
      return { ...state, schedule: action.payload };
    case "FETCH_FAIL":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

function Schedule() {
  const [gameOver, setGameOver] = useState(false);
  const current = new Date();
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];


  //today
  const currentDateNumber = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`;
  console.log(currentDateNumber);

  let day = weekday[current.getDay()];
  let month = months[current.getMonth()];
  const currentDateName = `${day} ${month} ${current.getDate()}`;

 /*
  //tomorrow
  const tomorrow = `${current.getFullYear()}-${current.getMonth() + 1}-${
    current.getDate() + 1
  }`;

  let tomorrowDay = weekday[current.getDay() + 1];
  let tomorrowMonth = months[current.getMonth()];
  const tomorrowName = `${tomorrowDay} ${tomorrowMonth} ${
    current.getDate() + 1
  }`;

  //yesterday
  const yesterday = `${current.getFullYear()}-${current.getMonth() + 1}-${
    current.getDate() - 1
  }`;

  let yestedayDay = weekday[current.getDay() - 1];
  let yesterdayMonth = months[current.getMonth()];
  const yesterdayName = `${yestedayDay} ${yesterdayMonth} ${
    current.getDate() - 1
  }`;
*/

  const [{ schedule }, dispatch] =
    useReducer(logger(reducer), {
      schedule: [],
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const response = await mlbStats.getSchedule({
          params: {
            sportId: 1,
            date: currentDateNumber,
            //date: "2022-06-10",
          },
        });

        for (var i = 0; i < response.data.dates[0].games.length; i++) {
          if (
            response.data.dates[0].games[i].teams.away.score === undefined ||
            response.data.dates[0].games[i].teams.home.score === undefined
          ) {
            response.data.dates[0].games[i].teams.away.score = "";
            response.data.dates[0].games[i].teams.home.score = "";
          }
          if (
            response.data.dates[0].games[i].status.detailedState !== "Final"
          ) {
            response.data.dates[0].games[i].status.detailedState = "";
          }
          if (
            response.data.dates[0].games[i].status.detailedState === "Final"
          ) {
            setGameOver(true);
            response.data.dates[0].games[i].gameDate = "";
          }

          var date = response.data.dates[0].games[i].gameDate;
          let newDate = moment.utc(date).subtract(4, "h").format("h:mm a");
          response.data.dates[0].games[i].gameDate = newDate;
        }

        dispatch({
          type: "FETCH_SUCCESS",
          payload: response.data.dates[0].games,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [currentDateNumber]);

  return (
    <div className="schedule_page">
      <h1>Schedule</h1>
      <p>{currentDateName}</p>
      <div className="schedule_games">
        <ul>
          {schedule?.map((i) => (
            <li key={i.gamePk}>
              <span className="team">
                <a href={`/gameday/${i.gamePk}`} className="team_link">
                  <img
                    className="logo"
                    src={`https://www.mlbstatic.com/team-logos/team-cap-on-light/${i.teams.away.team.id}.svg`}
                    alt=""
                  />
                  <span>{i.teams.away.team.name}</span>
                </a>
              </span>
              @
              <span className="team">
                <a href={`/gameday/${i.gamePk}`} className="team_link">
                  <img
                    className="logo"
                    src={`https://www.mlbstatic.com/team-logos/team-cap-on-light/${i.teams.home.team.id}.svg`}
                    alt=""
                  />
                  <span>{i.teams.home.team.name}</span>
                </a>
              </span>
              <span className="status">{i.status.detailedState}</span>
              <span className="item">
                {i.teams.away.score + "-" + i.teams.home.score}
              </span>
              {gameOver ? (
                <div className="time">
                  <p></p>
                </div>
              ) : (
                <p>{i.gameDate}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Schedule;
