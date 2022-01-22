import User from "../models/user.model";
import Team from "../models/team.model";

const MAX_AMOUNT_OF_PLAYERS_IN_TEAM = 10

export async function checkPlayersAmount(teamId: number){
    let amountOfPlayers : number =  await Team.count({include: [{model: User, where :{teamId}}]})
    return amountOfPlayers < MAX_AMOUNT_OF_PLAYERS_IN_TEAM;
}