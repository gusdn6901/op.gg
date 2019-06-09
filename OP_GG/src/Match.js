import React, { Component } from "react";
import "./css/Match.css";
import "./css/tag.css";
import winItem from "./img/winItem.png";
import loseItem from "./img/loseItem.png";
import winWard from "./img/winWard.png";
import loseWard from "./img/loseWard.png";
import champ from "./json/champion.json";
import spell from "./json/spell.json";
import runesReforged from "./json/runesReforged.json";

const version = "9.10.1";
const championUri = "http://ddragon.leagueoflegends.com/cdn/"+ version +"/img/champion/";
const spellUri = "http://ddragon.leagueoflegends.com/cdn/"+ version +"/img/spell/";
const runeUri = "http://ddragon.leagueoflegends.com/cdn/img/";
const itemUri = "http://ddragon.leagueoflegends.com/cdn/"+ version +"/img/item/";

const gameTypeF = (type) => {
	if(type === 420)
		return "솔랭";
	else if(type === 440)
		return "자유 5:5 랭크";
	else if(type === 450)
		return "무작위 총력전";
	else
		return "일반";
};

const teamKill = (player, game) => {
	const team = game.participants.filter( (user) => user.teamId === player.teamId);
	let sum=0;
	for(var i in team) {
		sum += team[i].stats.kills;
	}
	
	return sum;
};

const championF = (index) => {
	const champions = champ.data;
	const result = Object.keys(champions).map(i => champions[i]);
	const champion = result.filter( (one) => Number(one.key) === index);
	
	return champion[0];
};

const spellF = (index) => {
	const data = spell.data;
	const result = Object.keys(data).map(i => data[i]);
	const returnData = result.filter(one => Number(one.key) === index);
	
	return returnData[0];
};

const primaryStyleRuneF = (runeStyle, keystone)  => {
	const data = runesReforged;
	const filtered = data.filter(one => one.id === runeStyle)[0].slots[0].runes;
	const returnData = filtered.filter(one => one.id === keystone)[0].icon;
	
	return returnData;
};

const subStyleRuneF = (index) => {
	const data = runesReforged;
	const result = data.filter(one => one.id === index);
	
	return result[0];
};

const isSummoner = (name1, name2) => {
	if(name1 === name2)
		return "summoner requester";
	else
		return "summoner";
};
	
class Match extends Component {
	render() {
		return (
			<div className={
				this.props.game.gameDuration/60 < 5? "match replay" :
						this.props.user.userTeam.win === "Win" ? "match win" : "match lose"
				}>
				<div className="gameIngredient gameStat">
					<div className="gameType">{gameTypeF(this.props.match.queue)}</div>
					<div className="time">
						{
							(Date.now() - this.props.game.gameCreation) / 60000 < 60 ?
								<p>{
									((Date.now() - this.props.game.gameCreation) / 60000).toFixed()
								}분 전</p> :
									(Date.now() - this.props.game.gameCreation) / 60000 < 1440 ?
									<p>{
										((Date.now() - this.props.game.gameCreation) / 60000 / 60).toFixed()
									}시간 전</p> :
										(Date.now() - this.props.game.gameCreation) / 60000 < 44640 ?
										<p>{
											((Date.now() - this.props.game.gameCreation) / 60000 / 60 / 24).toFixed()
										}일 전</p> :
										<p>{
											((Date.now() - this.props.game.gameCreation) / 60000 / 60 / 24 / 31).toFixed()
										}개월 전</p>
						}
					</div>
					<div className="bar"></div>
					{
						this.props.game.gameDuration/60 < 5? <div className="result">다시하기</div> :
						this.props.user.userTeam.win === "Win" ? <div className="result">승리</div> : <div className="result">패배</div>
					}
					<div className="gameLength">
						{Math.floor(this.props.game.gameDuration / 60)}분 {(((this.props.game.gameDuration/60) - Math.floor(this.props.game.gameDuration / 60))*60).toFixed()}초
					</div>
				</div>
				<div className="gameIngredient settingInfo">
					<div className="championImage">
						<img alt="champion" src={championUri + championF(this.props.match.champion).image.full} />
					</div>
					<div className="summonerSpell">
						<div className="spell">
							<img alt="spell" src={spellUri + spellF(this.props.user.userGame.spell1Id).image.full} />
						</div>
						<div className="spell">
							<img alt="spell" src={spellUri + spellF(this.props.user.userGame.spell2Id).image.full} />
						</div>
					</div>
					<div className="Runes">
						<div className="Rune firstRune">
							<img alt="rune" className="firstRune" src={runeUri + primaryStyleRuneF(this.props.user.userGame.stats.perkPrimaryStyle, this.props.user.userGame.stats.perk0)} />
						</div>
						<div className="Rune">
							<img alt="rune" src={runeUri + subStyleRuneF(this.props.user.userGame.stats.perkSubStyle).icon} />
						</div>
					</div>
					<div className="championName">
						{championF(this.props.match.champion).name}
					</div>
				</div>
				<div className="gameIngredient KDA">
					<div className="KDADetail">
						<span className="kill">
							{
								this.props.user.userGame.stats.kills
							}
						</span>
						&nbsp;/&nbsp;
						<span className="death">
							{
								this.props.user.userGame.stats.deaths
							}
						</span>
						&nbsp;/&nbsp;
						<span className="assist">
							{
								this.props.user.userGame.stats.assists
							}
						</span>
					</div>
					<div className="KDARatio">
						<span className="ratio">
							{
								this.props.user.userGame.stats.deaths === 0 ?
								(this.props.user.userGame.stats.kills + this.props.user.userGame.stats.assists).toFixed(2)
									:
								((this.props.user.userGame.stats.kills + this.props.user.userGame.stats.assists)/this.props.user.userGame.stats.deaths).toFixed(2)
							}:1
						</span>
						&nbsp;평점
					</div>
				</div>
				<div className="gameIngredient stat">
					<div className="championLevel">레벨{this.props.user.userGame.stats.champLevel}</div>
					<div className="cs">{this.props.user.userGame.stats.totalMinionsKilled+this.props.user.userGame.stats.neutralMinionsKilled} CS</div>
					<div className="killRatio">
						킬관여 {
							((this.props.user.userGame.stats.kills+this.props.user.userGame.stats.assists)/teamKill(this.props.user.userGame, this.props.game)*100).toFixed()
						}%
					</div>
				</div>
				<div className="gameIngredient items">
					<div className="itemList">
						<div className="item">
							{
								this.props.user.userGame.stats.item0 === 0 ?
									null : <img alt="item" src={itemUri + this.props.user.userGame.stats.item0 +".png"} />
							}
						</div>
						<div className="item">
							{
								this.props.user.userGame.stats.item1 === 0 ?
									null : <img alt="item" src={itemUri + this.props.user.userGame.stats.item1 +".png"} />
							}
						</div>
						<div className="item">
							{
								this.props.user.userGame.stats.item2 === 0 ?
									null : <img alt="item" src={itemUri + this.props.user.userGame.stats.item2 +".png"} />
							}
						</div>
						<div className="item">
							{
								this.props.user.userGame.stats.item6 === 0 ?
									null : <img alt="item" src={itemUri + this.props.user.userGame.stats.item6 +".png"} />
							}
						</div>
						<div className="item">
							{
								this.props.user.userGame.stats.item3 === 0 ?
									null : <img alt="item" src={itemUri + this.props.user.userGame.stats.item3 +".png"} />
							}
						</div>
						<div className="item">
							{
								this.props.user.userGame.stats.item4 === 0 ?
									null : <img alt="item" src={itemUri + this.props.user.userGame.stats.item4 +".png"} />
							}
						</div>
						<div className="item">
							{
								this.props.user.userGame.stats.item5 === 0 ?
									null : <img alt="item" src={itemUri + this.props.user.userGame.stats.item5 +".png"} />
							}
						</div>
						<div className={
								this.props.game.gameDuration/60 < 5 ? "replayItem" :
								this.props.user.userTeam.win === "Win" ? "winItem" : "loseItem"
							}>
							{
								this.props.game.gameDuration/60 < 5 ? null :
								this.props.user.userTeam.win === "Win" ? <img alt="item" src={winItem} /> : <img alt="item" src={loseItem} />
							}
						</div>
					</div>
						{
							this.props.user.userGame.stats.visionWardsBoughtInGame <= 0 ? null :
								<div className="ward">
								{
									this.props.game.gameDuration/60 < 5 ? null :
										this.props.user.userTeam.win === "Win" ? <React.Fragment><img alt="ward" src={winWard} />&nbsp;&nbsp;제어와드&nbsp;{this.props.user.userGame.stats.visionWardsBoughtInGame}</React.Fragment> :
										<React.Fragment><img alt="ward" src={loseWard} />&nbsp;&nbsp;제어와드&nbsp;{this.props.user.userGame.stats.visionWardsBoughtInGame}</React.Fragment>
									} 
								</div>
						}
				</div>
				<div className="gameIngredient followPlayer">
					<div className="team">
						<div className={isSummoner(this.props.data.summoner.name, this.props.game.participantIdentities[0].player.summonerName)}>
							<div className="championImg">
								<img alt="champion" src={championUri + championF(this.props.game.participants[0].championId).image.full} />
							</div>
							<div className="summonerName">
								<a href={"http://serendipity.run.goorm.io/#/details/"+this.props.game.participantIdentities[0].player.summonerName}>{this.props.game.participantIdentities[0].player.summonerName}</a>
							</div>
						</div>
						<div className={isSummoner(this.props.data.summoner.name, this.props.game.participantIdentities[1].player.summonerName)}>
							<div className="championImg">
								<img alt="champion" src={championUri + championF(this.props.game.participants[1].championId).image.full} />
							</div>
							<div className="summonerName">
								<a href={"http://serendipity.run.goorm.io/#/details/"+this.props.game.participantIdentities[1].player.summonerName}>{this.props.game.participantIdentities[1].player.summonerName}</a>
							</div>
						</div>
						<div className={isSummoner(this.props.data.summoner.name, this.props.game.participantIdentities[2].player.summonerName)}>
							<div className="championImg">
								<img alt="champion" src={championUri + championF(this.props.game.participants[2].championId).image.full} />
							</div>
							<div className="summonerName">
								<a href={"http://serendipity.run.goorm.io/#/details/"+this.props.game.participantIdentities[2].player.summonerName}>{this.props.game.participantIdentities[2].player.summonerName}</a>
							</div>
						</div>
						<div className={isSummoner(this.props.data.summoner.name, this.props.game.participantIdentities[3].player.summonerName)}>
							<div className="championImg">
								<img alt="champion" src={championUri + championF(this.props.game.participants[3].championId).image.full} />
							</div>
							<div className="summonerName">
								<a href={"http://serendipity.run.goorm.io/#/details/"+this.props.game.participantIdentities[3].player.summonerName}>{this.props.game.participantIdentities[3].player.summonerName}</a>
							</div>
						</div>
						<div className={isSummoner(this.props.data.summoner.name, this.props.game.participantIdentities[4].player.summonerName)}>
							<div className="championImg">
								<img alt="champion" src={championUri + championF(this.props.game.participants[4].championId).image.full} />
							</div>
							<div className="summonerName">
								<a href={"http://serendipity.run.goorm.io/#/details/"+this.props.game.participantIdentities[4].player.summonerName}>{this.props.game.participantIdentities[4].player.summonerName}</a>
							</div>
						</div>
					</div>
					<div className="team">
						<div className={isSummoner(this.props.data.summoner.name, this.props.game.participantIdentities[5].player.summonerName)}>
							<div className="championImg">
								<img alt="champion" src={championUri + championF(this.props.game.participants[5].championId).image.full} />
							</div>
							<div className="summonerName">
								<a href={"http://serendipity.run.goorm.io/#/details/"+this.props.game.participantIdentities[5].player.summonerName}>{this.props.game.participantIdentities[5].player.summonerName}</a>
							</div>
						</div>
						<div className={isSummoner(this.props.data.summoner.name, this.props.game.participantIdentities[6].player.summonerName)}>
							<div className="championImg">
								<img alt="champion" src={championUri + championF(this.props.game.participants[6].championId).image.full} />
							</div>
							<div className="summonerName">
								<a href={"http://serendipity.run.goorm.io/#/details/"+this.props.game.participantIdentities[6].player.summonerName}>{this.props.game.participantIdentities[6].player.summonerName}</a>
							</div>
						</div>
						<div className={isSummoner(this.props.data.summoner.name, this.props.game.participantIdentities[7].player.summonerName)}>
							<div className="championImg">
								<img alt="champion" src={championUri + championF(this.props.game.participants[7].championId).image.full} />
							</div>
							<div className="summonerName">
								<a href={"http://serendipity.run.goorm.io/#/details/"+this.props.game.participantIdentities[7].player.summonerName}>{this.props.game.participantIdentities[7].player.summonerName}</a>
							</div>
						</div>
						<div className={isSummoner(this.props.data.summoner.name, this.props.game.participantIdentities[8].player.summonerName)}>
							<div className="championImg">
								<img alt="champion" src={championUri + championF(this.props.game.participants[8].championId).image.full} />
							</div>
							<div className="summonerName">
								<a href={"http://serendipity.run.goorm.io/#/details/"+this.props.game.participantIdentities[8].player.summonerName}>{this.props.game.participantIdentities[8].player.summonerName}</a>
							</div>
						</div>
						<div className={isSummoner(this.props.data.summoner.name, this.props.game.participantIdentities[9].player.summonerName)}>
							<div className="championImg">
								<img alt="champion" src={championUri + championF(this.props.game.participants[9].championId).image.full} />
							</div>
							<div className="summonerName">
								<a href={"http://serendipity.run.goorm.io/#/details/"+this.props.game.participantIdentities[9].player.summonerName}>{this.props.game.participantIdentities[9].player.summonerName}</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Match;