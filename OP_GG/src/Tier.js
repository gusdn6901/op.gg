import React, { Component } from "react";
import "./css/Tier.css";
import unranked from "./img/unranked.png";
import iron from "./img/iron.png";
import bronze from "./img/bronze.png";
import silver from "./img/silver.png";
import gold from "./img/gold.png";
import platinum from "./img/platinum.png";
import diamond from "./img/diamond.png";
import master from "./img/master.png";
import grandmaster from "./img/grandmaster.png";
import challenger from "./img/challenger.png";

const handleImg = (tier) => {
	if(tier==="CHALLENGER") {
		return challenger;
	} else if(tier==="GRANDMASTER") {
		return grandmaster;
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
	} else if(tier==="IRON") {
		return iron;
	} else {
		return unranked;
	}
};

const handleRank = (tier, rank) => {
	if(tier === "CHALLENGER" || tier === "GRANDMASTER" || tier ==="MASTER")
		return;
	if(rank === "I") {
		return "1";
	} else if(rank === "II") {
		return "2";
	} else if(rank === "III") {
		return "3";
	} else if(rank === "IV") {
		return "4";
	} else {
		return ;
	}
};

class Tier extends Component {
	render() {
		const solo = this.props.data.league.filter((solo) => solo.queueType === "RANKED_SOLO_5x5");
		const free = this.props.data.league.filter((solo) => solo.queueType === "RANKED_FLEX_SR");
		
		return (
			<div className="tierContainer">
				<div className="tierDetail">
						{
							solo.length === 0 ?
								<React.Fragment>
									<div className="medal">
										<img className="medalImage" alt="" src={unranked}></img>
									</div>
									<div className="tierInfo">
										<span className="rank">솔로 랭크</span>
										<span className="unranked">unranked</span>
									</div>
								</React.Fragment> :
								<React.Fragment>
									<div className="medal">
										<img className="medalImage" alt="" src={handleImg(solo[0].tier)}></img>
									</div>
									<div className="tierInfo">
										<span className="rank">솔로 랭크</span>
										<span className="tier">{solo[0].tier} {handleRank(solo[0].tier, solo[0].rank)}</span>
										<span className="points">{solo[0].leaguePoints}LP / <div>{solo[0].wins}승 {solo[0].losses}패</div></span>
										<span className="winRates">승률 {(solo[0].wins/(solo[0].wins + solo[0].losses)*100).toFixed()}%</span>
										<span className="leagueName">{solo[0].leagueName}</span>
									</div>
								</React.Fragment>
						}
				</div>
				<div className="tierDetail">
						{
							free.length === 0 ?
								<React.Fragment>
									<div className="medal">
										<img className="medalImage" alt="" src={unranked}></img>
									</div>
									<div className="tierInfo">
										<span className="rank">자유 5:5 랭크</span>
										<span className="unranked">unranked</span>
									</div>
								</React.Fragment> :
								<React.Fragment>
									<div className="medal">
										<img className="medalImage" alt="" src={handleImg(free[0].tier)}></img>
									</div>
									<div className="tierInfo">
										<span className="rank">자유 5:5 랭크</span>
										<span className="tier">{free[0].tier} {handleRank(free[0].tier, free[0].rank)}</span>
										<span className="points">{free[0].leaguePoints}LP / <div>{free[0].wins}승 {free[0].losses}패</div></span>
										<span className="winRates">승률 {(free[0].wins/(free[0].wins + free[0].losses)*100).toFixed()}%</span>
										<span className="leagueName">{free[0].leagueName}</span>
									</div>
								</React.Fragment>
						}
				</div>
			</div>
		)
	}
}

export default Tier;