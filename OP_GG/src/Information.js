import React, { Component } from "react";
import Search from "./SearchForm";
import SummonerInfo from "./SummonerInfo";
import Matches from "./Matches";
import "./css/Information.css";
import "./css/tag.css";

class Information extends Component {
	handleSubmit = (e) => {
		if(e === "") return
		let url = document.location.origin
		url += "/#/details/"
		url += e
		window.location.href = url
	}
	
	render() {
		return (
			<div className="infoWrap">
				<div className="head">
					<div className="header">
						<ul className="sites">
							<li className="siteName">
								<a href="/">
									<img className="image" alt="" src="//opgg-static.akamaized.net/images/logo/logo-lol.png" />
									<span>AKM.GG</span>
								</a>
							</li>
							<li className="researchForm">
								<Search submit={this.handleSubmit} />
							</li>
						</ul>
					</div>
				</div>
				<div className="menu" />
				<div className="show">
					<div className="Summoner">
						<div className="face">
							<SummonerInfo data={this.props.data} />
						</div>
					</div>
					<div className="body">
						<Matches data={this.props.data} />
					</div>
				</div>
				<div className="foot">
					<div className="copyright">
						 © 2012-2019 AKM.GG. Data based on League of Legends Korea.                 
					</div>
				</div>
			</div>
		);
	}
}

export default Information;