import React, { Component } from "react";
import Search from "./SearchForm";
import logo from "./img/logo.png";
import "./css/tag.css";
import "./css/Home.css";

class Home extends Component {

	handleSubmit = (e) => {
		if(e === "") return
		let url = document.location.href
		url += "details/"
		url += e
		window.location.href = url
	}
	
	render() {
		return (
			<div className="home">
				<div className="header">
					<ul className="sites">
						<li className="siteName">
							<a href="/">
								<img className="image" alt="" src={logo} />
								<span>AKM.GG</span>
							</a>
						</li>
					</ul>
				</div>
				<div className="menu"></div>
				<div className="container">
					<div className="logoIndex">
						<div className="logo">
							<img alt="logo" src="https://vignette.wikia.nocookie.net/leagueoflegends/images/9/94/Runeterra_Crest_icon.png/revision/latest?cb=20161117185203" title="gg"/>
						</div>
					</div>
					<Search submit={this.handleSubmit} />
				</div>
				<div className="footer">
					<div className="copyRight">
						© 2012-2019 AKM.GG. Data based on League of Legends Korea.
					</div>
				</div>
			</div>
		);
	}
}

export default Home;