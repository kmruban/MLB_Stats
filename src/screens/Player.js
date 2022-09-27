import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const MLBStatsAPI = require("mlb-stats-api");
const mlbStats = new MLBStatsAPI();

function Player() {
  const params = useParams();
  const { id } = params;

  const [name, setName] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await mlbStats.getPerson({
          pathParams: {
            personId: id,
          },
        });
        console.log(response);
        setName(response.data.people[0].firstLastName);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div>
      <div>{id}</div>
      <div>{name}</div>
      <img
        src={`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/${id}/headshot/67/current`}
        alt=""
      />
    </div>
  );
}

export default Player;
