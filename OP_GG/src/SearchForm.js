import React, { Component } from "react";
import "./css/tag.css";
import "./css/SearchForm.css";

class Search extends Component {
	state = {
		name: ""
	}

	handleChange = (e) => {
		this.setState({
			name: e.target.value
		})
	}

	render() {
		return (
			<form className="searchForm" onSubmit={(e) => {e.preventDefault(); this.props.submit(this.state.name)}}>
				<input type="text" className="search-text" onChange={this.handleChange} placeholder="소환사명, 소환사명, ..." autoComplete="off" />
				<button type="submit" className="search-button"><span className="search-button-text">.GG</span></button>
			</form>
		)
	}
}

export default Search;