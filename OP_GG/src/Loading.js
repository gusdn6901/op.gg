import React, { Component } from "react";

class Loading extends Component {
	render() {
	 return (
		 <div className="loadingWrap">
			 <div className="head">
					<div className="header">
						<ul className="sites">
							<li className="siteName">
								<a href="/">
									<img className="image" alt="" src="//opgg-static.akamaized.net/images/logo/logo-lol.png" />
									<span>AKM.GG</span>
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="menu" />
			 <div>loading</div>
		 </div>
	 );
	}
}

export default Loading;