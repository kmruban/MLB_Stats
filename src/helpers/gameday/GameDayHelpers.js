export function getIninngsHelper(innings) {
  var inningg = [];

  for (var i = 0; i < 9; i++) {
    inningg.push({
      away: { runs: undefined },
      home: { runs: undefined },
      num: i + 1,
    });
  }

  for (var x = 0; x < innings.length; x++) {
    inningg[x] = innings[x];
  }
  return inningg;
}

export function getExtraIninngsHelper(innings) {
  var extraInnings = [];

  for (var j = 9; j < innings.length; j++) {
    extraInnings.push(innings[j]);
  }
  return extraInnings;
}

export function getAwayLineupNames(data, awayBattingOrderArray) {
  for (var i = 0; i < 9; i++) {
    //AWAY LINEUP
    var awayObject = "ID" + data.liveData.boxscore.teams.away.battingOrder[i];
    if (
      data.liveData.boxscore.teams.away.battingOrder[i] ===
      data.liveData.boxscore.teams.away.players[awayObject].person.id
    ) {
      awayBattingOrderArray.push({
        id: data.liveData.boxscore.teams.away.players[awayObject].person.id,
        name: data.liveData.boxscore.teams.away.players[awayObject].person
          .fullName,
      });
    }
  }

  return awayBattingOrderArray;
}

export function getHomeLineupNames(data, homeBattingOrderArray) {
  for (var i = 0; i < 9; i++) {
    //HOME
    var homeObject = "ID" + data.liveData.boxscore.teams.home.battingOrder[i];
    if (
      data.liveData.boxscore.teams.home.battingOrder[i] ===
      data.liveData.boxscore.teams.home.players[homeObject].person.id
    ) {
      homeBattingOrderArray.push({
        id: data.liveData.boxscore.teams.home.players[homeObject].person.id,
        name: data.liveData.boxscore.teams.home.players[homeObject].person
          .fullName,
      });
    }
  }

  return homeBattingOrderArray;
}

export function getPitchersStats(data){
    var awayPitcherIDObject = "ID" + data.gameData.probablePitchers.away.id;
    var awayDict = {
        player: {
            name: data.gameData.probablePitchers.away.fullName,
            id: data.gameData.probablePitchers.away.id
        },
        wins: data.liveData.boxscore.teams.away.players[awayPitcherIDObject].seasonStats.pitching.wins,
        losses: data.liveData.boxscore.teams.away.players[awayPitcherIDObject].seasonStats.pitching.losses,
        era: data.liveData.boxscore.teams.away.players[awayPitcherIDObject].seasonStats.pitching.era,
        whip: data.liveData.boxscore.teams.away.players[awayPitcherIDObject].seasonStats.pitching.whip,
        inningsPitched: data.liveData.boxscore.teams.away.players[awayPitcherIDObject].seasonStats.pitching.inningsPitched,
        hits: data.liveData.boxscore.teams.away.players[awayPitcherIDObject].seasonStats.pitching.hits,
        strikeOuts: data.liveData.boxscore.teams.away.players[awayPitcherIDObject].seasonStats.pitching.strikeOuts,
        baseOnBalls: data.liveData.boxscore.teams.away.players[awayPitcherIDObject].seasonStats.pitching.baseOnBalls,
        homeRuns: data.liveData.boxscore.teams.away.players[awayPitcherIDObject].seasonStats.pitching.homeRuns,
    };

    var homePitcherIDObject = "ID" + data.gameData.probablePitchers.home.id;
    var homeDict = {
        player: {
            name: data.gameData.probablePitchers.home.fullName,
            id: data.gameData.probablePitchers.home.id
        },
        wins: data.liveData.boxscore.teams.home.players[homePitcherIDObject].seasonStats.pitching.wins,
        losses: data.liveData.boxscore.teams.home.players[homePitcherIDObject].seasonStats.pitching.losses,
        era: data.liveData.boxscore.teams.home.players[homePitcherIDObject].seasonStats.pitching.era,
        whip: data.liveData.boxscore.teams.home.players[homePitcherIDObject].seasonStats.pitching.whip,
        inningsPitched: data.liveData.boxscore.teams.home.players[homePitcherIDObject].seasonStats.pitching.inningsPitched,
        hits: data.liveData.boxscore.teams.home.players[homePitcherIDObject].seasonStats.pitching.hits,
        strikeOuts: data.liveData.boxscore.teams.home.players[homePitcherIDObject].seasonStats.pitching.strikeOuts,
        baseOnBalls: data.liveData.boxscore.teams.home.players[homePitcherIDObject].seasonStats.pitching.baseOnBalls,
        homeRuns: data.liveData.boxscore.teams.home.players[homePitcherIDObject].seasonStats.pitching.homeRuns,
    };
    var list = [awayDict, homeDict]
    return list;
}