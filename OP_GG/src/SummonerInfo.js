import React, { Component } from "react";
import Tier from "./Tier";
import "./css/tag.css";
import "./css/SummonerInfo.css";
import bronze from "./img/borderBronze.png";
import silver from "./img/borderSilver.png";
import gold from "./img/borderGold.png";
import platinum from "./img/borderPlatinum.png";
import diamond from "./img/borderDiamond.png";
import master from "./img/borderMaster.png";
import challenger from "./img/borderChallenger.png";

const version = "9.9.1";
const iconUrl = "http://ddragon.leagueoflegends.com/cdn/"+version+"/img/profileicon/";

const handleImg = (tier) => {
	if(tier==="CHALLENGER") {
		return challenger;
	} else if(tier==="MASTER") {
		return master;
	} else if(tier==="DIAMOND") {
		return diamond;
	} else if(tier==="PLATINUM") {
		return platinum;
	} else if(tier==="GOLD") {
		return gold;
	} else if(tier==="SILVER") {
		return silver;
	} else if(tier==="BRONZE") {
		return bronze;
	} else {
		return;
	}
};

class SummonerInfo extends Component {
	render() {
		const solo = this.props.data.league.filter((solo) => solo.queueType === "RANKED_SOLO_5x5");
		
		return (
			<React.Fragment>
				<div className="icon" style={{backgroundImage:`url(${solo.length === 1 ? handleImg(solo[0].tier) : ""})`}}>
					<p>로딩중...</p>
					<img alt="icon" src={iconUrl+this.props.data.summoner.profileIconId+".png"} />
				</div>
				<div className="profile">
					<div className="name">{this.props.data.summoner.name}</div>
					<div className="level">레벨: {this.props.data.summoner.summonerLevel}</div>
				</div>
				<div className="tier">
					<Tier data={this.props.data}></Tier>
				</div>
			</React.Fragment>
		);
	}
}

export default SummonerInfo;