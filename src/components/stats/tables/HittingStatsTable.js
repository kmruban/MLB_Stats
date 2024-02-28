import React, { useState } from "react";

const useSortableData = (stats, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...stats];

    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a.stat[sortConfig.key] < b.stat[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a.stat[sortConfig.key] > b.stat[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [stats, sortConfig]);

  const requestSort = (key) => {
    let direction = "descending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "descending"
    ) {
      direction = "ascending";
    }
    setSortConfig({ key, direction });
  };

  return { stats: sortedItems, requestSort, sortConfig };
};

function HittingStatsTable({ hittingStats }) {
  const { stats, requestSort, sortConfig } = useSortableData(hittingStats);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <div className="table_scroller">
      <table className="stats_table">
        <thead>
          <tr>
            <th className="player">Player</th>
            <th id="hitting_col1">
              <button
                type="button"
                onClick={() => requestSort("gamesPlayed")}
                className={getClassNamesFor("gamesPlayed")}
                id="child"
              >
                G
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("atBats")}
                className={getClassNamesFor("atBats")}
              >
                AB
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("runs")}
                className={getClassNamesFor("runs")}
              >
                R
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("hits")}
                className={getClassNamesFor("hits")}
              >
                H
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("doubles")}
                className={getClassNamesFor("doubles")}
              >
                2B
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("triples")}
                className={getClassNamesFor("triples")}
              >
                3B
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("homeRuns")}
                className={getClassNamesFor("homeRuns")}
              >
                HR
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("rbi")}
                className={getClassNamesFor("rbi")}
              >
                RBI
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("baseOnBalls")}
                className={getClassNamesFor("baseOnBalls")}
              >
                BB
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("stolenBases")}
                className={getClassNamesFor("stolenBases")}
              >
                SB
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("caughtStealing")}
                className={getClassNamesFor("caughtStealing")}
              >
                CS
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("strikeOuts")}
                className={getClassNamesFor("strikeOuts")}
              >
                SO
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("avg")}
                className={getClassNamesFor("avg")}
              >
                AVG.
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("obp")}
                className={getClassNamesFor("obp")}
              >
                OBP
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("slg")}
                className={getClassNamesFor("slg")}
              >
                SLG
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("ops")}
                className={getClassNamesFor("ops")}
              >
                OPS
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {stats?.map((i) => (
            <tr key={i.player.id}>
              <td className="player">
                <img
                  src={`https://www.mlbstatic.com/team-logos/team-cap-on-light/${i.team.id}.svg`}
                  alt=""
                  className="logo"
                />
                <a href={`/player/${i.player.id}`}>{i.player.fullName + " "}</a>
                <span>{i.position.abbreviation}</span>
              </td>
              <td>{i.stat.gamesPlayed}</td>
              <td>{i.stat.atBats}</td>
              <td>{i.stat.runs}</td>
              <td>{i.stat.hits}</td>
              <td>{i.stat.doubles}</td>
              <td>{i.stat.triples}</td>
              <td>{i.stat.homeRuns}</td>
              <td>{i.stat.rbi}</td>
              <td>{i.stat.baseOnBalls}</td>
              <td>{i.stat.stolenBases}</td>
              <td>{i.stat.caughtStealing}</td>
              <td>{i.stat.strikeOuts}</td>
              <td>{i.stat.avg}</td>
              <td>{i.stat.obp}</td>
              <td>{i.stat.slg}</td>
              <td>{i.stat.ops}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HittingStatsTable;
