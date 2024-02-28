import React, { useState } from "react";
import Select from "react-select";

function StatsFilters(props) {
  const mlbYears = [];
  var currentYear = new Date().getFullYear();
  for (let year = currentYear; year > 1876; year--) {
    mlbYears.push({ value: year, label: year.toString() });
  }
  const handleYearChange = (selectedOption) => {
    props.setSelectedYear(selectedOption.value);
  };

  const baseballLeagues = [
    {value: "", label: "MLB"},
    {value: "103", label: "American League"},
    {value: "104", label: "National League"},
  ];
  const handleLeagueChange = (selectedOption) => {
    props.setSelectedLeague(selectedOption.value);
    props.setSelectedLeagueLabel(selectedOption.label);
  };

  return (
    <div className="stats_filters">
      <Select
        value={props.selectedYear}
        onChange={handleYearChange}
        options={mlbYears}
        placeholder={props.selectedYear}
        isSearchable={false}
      />
      <Select
        value={props.selectedLeague}
        onChange={handleLeagueChange}
        options={baseballLeagues}
        placeholder={props.selectedLeagueLabel}
        isSearchable={false}
      />
    </div>
  );
}

export default StatsFilters;
