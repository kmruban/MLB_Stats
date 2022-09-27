import { useParams } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import "./gameday.scss";
import {
  getIninngsHelper,
  getExtraIninngsHelper,
  getAwayLineupNames,
  getHomeLineupNames,
  getPitchersStats,
} from "../../helpers/gameday/GameDayHelpers";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, data: action.payload, loading: false };
    case "FETCH_SUCCESS_":
      return { ...state, loading: true };
    case "FETCH_SUCCESS_INNINGS":
      return { ...state, innings: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false };
    default:
      return state;
  }
};

function GameDay() {
  const params = useParams();
  const { gamePk } = params;

  const [awayOrder, setAwayOrder] = useState([{ id: "", name: "" }]);
  const [homeOrder, setHomeOrder] = useState([{ id: "", name: "" }]);
  var awayBattingOrderArray = [{}];
  var homeBattingOrderArray = [{}];

  const [extraInnings, setExtraInnings] = useState([]);
  const [inning, setInning] = useState([]);

  const [currentInning, setCurrentInning] = useState();
  const [gameStatus, setGameStatus] = useState();
  const [gameOver, setGameOver] = useState(false);
  const [gameLive, setGameLive] = useState(false);

  const [awayName, setAwayName] = useState();
  const [homeName, setHomeName] = useState();
  const [awayAbbv, setAwayAbbv] = useState();
  const [homeAbbv, setHomeAbbv] = useState();
  const [awayId, setAwayId] = useState();
  const [homeId, setHomeId] = useState();
  const [startTime, setStartTime] = useState();
  const [awayRecord, setAwayRecord] = useState();
  const [homeRecord, setHomeRecord] = useState();
  const [awayScore, setAwayScore] = useState();
  const [homeScore, setHomeScore] = useState();
  const [awayHits, setAwayHits] = useState();
  const [homeHits, setHomeHits] = useState();
  const [awayErrors, setAwayErrors] = useState();
  const [homeErrors, setHomeErrors] = useState();

  const [awayProbablePitcher, setAwayProbablePitcher] = useState();
  const [homeProbablePitcher, setHomeProbablePitcher] = useState();
  const [awayProbablePitcherID, setAwayProbablePitcherID] = useState();
  const [homeProbablePitcherID, setHomeProbablePitcherID] = useState();

  const [statsList, setList] = useState([]);


  const [{ data, innings, loading }, dispatch] = useReducer(reducer, {
    data: [],
    innings: [],
    loading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const response = await axios.get(
          `https://statsapi.mlb.com/api/v1.1/game/${gamePk}/feed/live`
        );

        console.log(response);

        if (response.data.gameData.status.codedGameState === "F") {
          setCurrentInning("");
          setGameOver(true);
          setGameLive(false);
          setGameStatus(response.data.gameData.status.abstractGameState);
        } else if (response.data.gameData.status.abstractGameState !== "Live") {
          setCurrentInning("");
          setGameOver(false);
          setGameLive(true);
          setGameStatus(startTime);
        } else {
          setCurrentInning(
            response.data.liveData.linescore.inningState +
              " " +
              response.data.liveData.linescore.currentInningOrdinal
          );
          setGameOver(false);
          setGameLive(false);
        }
        setAwayId(response.data.gameData.teams.away.id);
        setHomeId(response.data.gameData.teams.home.id);
        setAwayName(response.data.gameData.teams.away.clubName);
        setHomeName(response.data.gameData.teams.home.clubName);
        setAwayAbbv(response.data.gameData.teams.away.abbreviation);
        setHomeAbbv(response.data.gameData.teams.home.abbreviation);
        setStartTime(
          response.data.gameData.datetime.time +
            " " +
            response.data.gameData.datetime.ampm
        );
        setAwayRecord(
          response.data.gameData.teams.away.record.leagueRecord.wins +
            "-" +
            response.data.gameData.teams.away.record.leagueRecord.losses
        );
        setHomeRecord(
          response.data.gameData.teams.home.record.leagueRecord.wins +
            "-" +
            response.data.gameData.teams.home.record.leagueRecord.losses
        );
        setStartTime(
          response.data.gameData.datetime.time +
            " " +
            response.data.gameData.datetime.ampm
        );
        setAwayScore(response.data.liveData.linescore.teams.away.runs);
        setHomeScore(response.data.liveData.linescore.teams.home.runs);
        setAwayHits(response.data.liveData.linescore.teams.away.hits);
        setHomeHits(response.data.liveData.linescore.teams.home.hits);
        setAwayErrors(response.data.liveData.linescore.teams.away.errors);
        setHomeErrors(response.data.liveData.linescore.teams.home.errors);
        if (response.data.gameData.hasOwnProperty("probablePitchers")) {
          if (response.data.gameData.probablePitchers.hasOwnProperty("away")) {
            setAwayProbablePitcher(
              response.data.gameData.probablePitchers.away.fullName
            );
            setAwayProbablePitcherID(
              response.data.gameData.probablePitchers.away.id
            );
          } else {
            setAwayProbablePitcher("TBD");
          }
          if (response.data.gameData.probablePitchers.hasOwnProperty("home")) {
            setHomeProbablePitcher(
              response.data.gameData.probablePitchers.home.fullName
            );
            setHomeProbablePitcherID(
              response.data.gameData.probablePitchers.home.id
            );
          } else {
            setHomeProbablePitcher("TBD");
          }
        }

        dispatch({
          type: "FETCH_SUCCESS",
          payload: response.data,
        });
        dispatch({
          type: "FETCH_SUCCESS_INNINGS",
          payload: response.data.liveData.linescore.innings,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [gamePk, gameOver, startTime]);

  const fetchIninngs = async () => {
    const inn = getIninngsHelper(innings);
    setInning(inn);
    const extraInn = getExtraIninngsHelper(innings);
    setExtraInnings(extraInn);
  };

var list;
  var fetchPitchersStats = async () => {
    list = getPitchersStats(data);
    setList(list);
    console.log(statsList);
  };

  const fetchLineupNames = async () => {
    const awayOrder = getAwayLineupNames(data, awayBattingOrderArray);
    setAwayOrder(awayOrder);

    const homeOrder = getHomeLineupNames(data, homeBattingOrderArray);
    setHomeOrder(homeOrder);
    dispatch({
      type: "FETCH_SUCCESS_",
    });
  };

  if (loading === false) {
    fetchIninngs();
    fetchPitchersStats();
    if (data.liveData.boxscore.teams.away.battingOrder.length > 0) {
      fetchLineupNames();
    }
  }

  return (
    <div className="gameday_page">
      <div className="gameday_header">
        <div className="away">
          <div className="away_team_name">
            <a href="/">{awayName}</a>
            <p>({awayRecord})</p>
          </div>
          <img
            className="logo"
            src={`https://www.mlbstatic.com/team-logos/team-cap-on-light/${awayId}.svg`}
            alt=""
          />
          <div className="score">{awayScore}</div>
        </div>

        {gameOver || gameLive ? (
          <div className="game_status">
            <p>{gameStatus}</p>
          </div>
        ) : (
          <div className="game_status">
            <p>{currentInning}</p>
          </div>
        )}

        <div className="home">
          <div className="score">{homeScore}</div>
          <img
            className="logo"
            src={`https://www.mlbstatic.com/team-logos/team-cap-on-light/${homeId}.svg`}
            alt=""
          />
          <div className="home_team_name">
            <a href="/">{homeName}</a>
            <p>({homeRecord})</p>
          </div>
        </div>
      </div>
      <div className="scoring_summary">
        <h4>Scoring Summary</h4>
        <table>
          <thead>
            <tr>
              <td></td>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
              <td>6</td>
              <td>7</td>
              <td>8</td>
              <td>9</td>
              {extraInnings?.map((i) => (
                <td key={i.num}>{i.num}</td>
              ))}
              <td>R</td>
              <td>H</td>
              <td>E</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="teams_score_summary">
                  <img
                    className="logo"
                    src={`https://www.mlbstatic.com/team-logos/team-cap-on-light/${awayId}.svg`}
                    alt=""
                  />
                  <div>{awayAbbv}</div>
                </div>
              </td>
              {inning?.map((i) => (
                <td key={i.num}>{i.away.runs}</td>
              ))}
              <td>{awayScore}</td>
              <td>{awayHits}</td>
              <td>{awayErrors}</td>
            </tr>
            <tr>
              <td>
                <div className="teams_score_summary">
                  <img
                    className="logo"
                    src={`https://www.mlbstatic.com/team-logos/team-cap-on-light/${homeId}.svg`}
                    alt=""
                  />
                  <div>{homeAbbv}</div>
                </div>
              </td>
              {inning?.map((i) => (
                <td key={i.num}>{i.home.runs}</td>
              ))}
              <td>{homeScore}</td>
              <td>{homeHits}</td>
              <td>{homeErrors}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="gameday_details">
        <div className="probable_pitchers_wrapper">
          <h4>Probable Pitchers</h4>
          <div className="probable_pitchers">
            <p>Pitchers</p>
            <div className="pitchers">
              <div className="away_pitcher">
                <span>{awayProbablePitcher}</span>
                <img
                  src={`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/${awayProbablePitcherID}/headshot/67/current`}
                  alt=""
                />
              </div>
              <span>vs.</span>
              <div className="home_pitcher">
                <img
                  src={`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/${homeProbablePitcherID}/headshot/67/current`}
                  alt=""
                />
                <span>{homeProbablePitcher}</span>
              </div>
            </div>
            <div className="pitchers_stats_table">
              <table>
                <thead>
                  <tr>
                    <th>PLAYER</th>
                    <th>W-L</th>
                    <th>ERA</th>
                    <th>WHIP</th>
                    <th>IP</th>
                    <th>H</th>
                    <th>K</th>
                    <th>BB</th>
                    <th>HR</th>
                  </tr>
                </thead>
                <tbody>
                {statsList?.map((i) => (
                    <tr key={i.player.id}>
                      <td>{i.player.name}</td>
                      <td>{i.wins + "-" + i.losses}</td>
                      <td>{i.era}</td>
                      <td>{i.whip}</td>
                      <td>{i.inningsPitched}</td>
                      <td>{i.hits}</td>
                      <td>{i.strikeOuts}</td>
                      <td>{i.baseOnBalls}</td>
                      <td>{i.homeRuns}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="batting_order_wrapper">
          <h4>Batting Orders</h4>
          <div className="batting_order">
            <div className="away_order">
              {awayName + " Lineup"}
              <ul>
                {awayOrder?.map((away, index) => (
                  <li key={index}>
                    <a href={`/player/${away.id}`}>{away.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="home_order">
              {homeName + " Lineup"}
              <ul>
                {homeOrder?.map((home, index) => (
                  <li key={index}>
                    <a href={`/player/${home.id}`}>{home.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default GameDay;
