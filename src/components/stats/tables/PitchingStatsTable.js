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

function PitchingStatsTable({ pitchingStats }) {
  const { stats, requestSort, sortConfig } = useSortableData(pitchingStats);
  console.log(stats);
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
            <th>
              <button
                type="button"
                onClick={() => requestSort("gamesPitched")}
                className={getClassNamesFor("gamesPitched")}
              >
                G
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("gamesStarted")}
                className={getClassNamesFor("gamesStarted")}
              >
                GS
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("era")}
                className={getClassNamesFor("era")}
              >
                ERA
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("whip")}
                className={getClassNamesFor("whip")}
              >
                WHIP
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
                <a href={`/player/${i.player.id}`}>
                  {i.player.fullName + " "}{" "}
                </a>
                <span>{i.position.abbreviation}</span>
              </td>
              <td>{i.stat.gamesPitched}</td>
              <td>{i.stat.gamesStarted}</td>
              <td>{i.stat.era}</td>
              <td>{i.stat.whip}</td>
              <td>{i.stat.strikeOuts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PitchingStatsTable;
