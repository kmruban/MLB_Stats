import moment from "moment";

export function scoresHelper(response){
    for (var i = 0; i < response.data.dates[0].games.length; i++) {
        var date = response.data.dates[0].games[i].gameDate;
        let newDate = moment.utc(date).subtract(4, "h").format("h:mm a");
        response.data.dates[0].games[i].gameDate = newDate;

        if(response.data.dates[0].games[i].status.abstractGameState === "Live"){
          response.data.dates[0].games[i].gameDate = response.data.dates[0].games[i].teams.away.score + "-" + response.data.dates[0].games[i].teams.home.score;
        }
        if(response.data.dates[0].games[i].status.abstractGameState === "Final"){
          response.data.dates[0].games[i].gameDate =  "Final: " + response.data.dates[0].games[i].teams.away.score + "-" + response.data.dates[0].games[i].teams.home.score;
        }
      }
}
