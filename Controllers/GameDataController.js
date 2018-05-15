'use strict';
var mongoose = require('mongoose');
var TeamInfo = mongoose.model('TeamInfo');
var GameSchedule = mongoose.model('GameSchedule');


function getTeamSchedule(req,res)
{
let parameters = req.body.queryResult.parameters;
    if (parameters.team1 == "")
    {
      let game_occurence = parameters.game_occurence;
      let team = parameters.team;
      if (game_occurence == "previous")
      {
        //previous game
        GameSchedule.find({opponent:team},function(err,games)
        {
          if (err)
          {
            return res.json({
                speech: 'Something went wrong!',
                displayText: 'Something went wrong!',
                source: 'game schedule'
            });
          }
          if (games)
          {
            var requiredGame;
            for (var i=0; i < games.length; i++)
            {
                var game = games[i];
var convertedCurrentDate = new Date();
                var convertedGameDate = new Date(game.date);
if (convertedGameDate > convertedCurrentDate)
                {
                  if(games.length > 1)
                  {
                    requiredGame = games[i-1];
var winningStatement = "";
                    if (requiredGame.isWinner)
                    {
                        winningStatement = "Kings won this match by "+requiredGame.score;
                    }
                    else {
                      winningStatement = "Kings lost this match by "+requiredGame.score;
                    }
                    return res.json({
                        fulfillmentText: 'Last game between Kings and '+parameters.team+' was played on '+requiredGame.date+' .'+winningStatement,
                    });
                    break;
                  }
                  else {
                    return res.json({
                        fulfillmentText: 'Cant find any previous game played between Kings and '+parameters.team,
                    });
                  }
                }
            }
}
});
      }
      else {
        return res.json({
            fulfillmentText: 'Next game schedules will be available soon',
        });
      }
    }
    else {
      return res.json({
          fulfillmentText: 'Cant handle the queries with two teams now. I will update myself',
      });
    }
  }


  function getTeamInfo(req,res)
  {
  let teamToSearch = req.body.result && req.body.result.parameters && req.body.result.parameters.team ? req.body.result.parameters.team : 'Unknown';
  TeamInfo.findOne({name:teamToSearch},function(err,teamExists)
        {
          if (err)
          {
            return res.json({
                speech: 'Something went wrong!',
                displayText: 'Something went wrong!',
                source: 'team info'
            });
          }
  if (teamExists)
          {
            return res.json({
                  speech: teamExists.description,
                  displayText: teamExists.description,
                  source: 'team info'
              });
          }
          else {
            return res.json({
                  fulfillmentText: 'Currently I am not having information about this team',
              });
          }
        });
  }
