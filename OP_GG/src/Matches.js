import React, { Component } from "react";
import Match from "./Match";
import "./css/Matches.css";
import "./css/tag.css";

const player = (name, game) => {
	const user = game.participantIdentities.filter(user => user.player.summonerName === name);
	const userIndex = user[0].participantId;
	const userGame = game.participants.filter(user => user.participantId === userIndex)[0];
	let userTeamIndex;
	if(userIndex > 5)
		userTeamIndex = 1;
	else
		userTeamIndex = 0;
	let userTeam;
	if(userTeamIndex === 0)
		userTeam = game.teams[0];
	else
		userTeam = game.teams[1];
	return {userTeam, userGame};
};

class Matches extends Component {
	render() {
		return (
			<div className="matches">
				{
					this.props.data.matches.matches.map( (match, i) => {
						return (
							<div className="gameWrap">
								<div className="gameItem">
									<Match
											data={this.props.data}
											match={match}
											user={player(this.props.data.summoner.name, this.props.data.games[i])}
											game={this.props.data.games[i]}
											key={i}/>
								</div>
							</div>
					);})
				}
			</div>
		);
	}
}

export default Matches;