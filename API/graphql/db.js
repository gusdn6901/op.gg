import fetch from "node-fetch";
const API_URL = "https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/";
const LEAGUE_URL = "https://kr.api.riotgames.com/lol/league/v4/positions/by-summoner/";
const MATCHES_URL = "https://kr.api.riotgames.com/lol/match/v4/matchlists/by-account/";
const MATCH_URL = "https://kr.api.riotgames.com/lol/match/v4/matches/";

const api_key = "RGAPI-d7cdb2c3-8572-4329-9f6e-95b0b03bdbf5";

function sleep (delay) {
   var start = new Date().getTime();
   while (new Date().getTime() < start + delay);
}

export const getSummoner = (name) => {
	let REQUEST_URL = API_URL;
	const encode_name = encodeURI(name);
	REQUEST_URL += encode_name;
	REQUEST_URL += `?api_key=`;
	REQUEST_URL += api_key;
	
	return fetch(REQUEST_URL).
		then(res => res.json());
};

export const getLeague = async (name) => {
	let NAME_URI = API_URL;
	const encode_name = encodeURI(name);
	NAME_URI += encode_name;
	NAME_URI += `?api_key=`;
	NAME_URI += api_key;
	
	let id = await fetch(NAME_URI).then(res => res.json()).then(data => data.id);
	
	let REQUEST_URL = LEAGUE_URL;
	REQUEST_URL += id;
	REQUEST_URL += `?api_key=`;
	REQUEST_URL += api_key;
	
	return fetch(REQUEST_URL).
		then(res => res.json());
};

export const getMatches = async (name) => {
	let NAME_URI = API_URL;
	const encode_name = encodeURI(name);
	NAME_URI += encode_name;
	NAME_URI += `?api_key=`;
	NAME_URI += api_key;
	
	let id = await fetch(NAME_URI).then(res => res.json()).then(data => data.accountId);
	
	let REQUEST_URL = MATCHES_URL;
	REQUEST_URL += id;
	REQUEST_URL += `?endIndex=20&api_key=`;
	REQUEST_URL += api_key;
	
	return fetch(REQUEST_URL).
		then(res => res.json());
};

export const getGames = async (name) => {
	let NAME_URI = API_URL;
	const encode_name = encodeURI(name);
	NAME_URI += encode_name;
	NAME_URI += `?api_key=`;
	NAME_URI += api_key;
	
	let id = await fetch(NAME_URI).then(res => res.json()).then(data => data.accountId);
	
	let MATCHES_URI = MATCHES_URL;
	MATCHES_URI += id;
	MATCHES_URI += `?endIndex=20&api_key=`;
	MATCHES_URI += api_key;
	
	let games = await fetch(MATCHES_URI).then(res => res.json()).then(data => data.matches);
	let gameDetails = games.map( (match) => {
		let REQUEST_URL = MATCH_URL;
		REQUEST_URL += match.gameId;
		REQUEST_URL += `?api_key=`;
		REQUEST_URL += api_key;
		
		sleep(100);
		return fetch(REQUEST_URL).then(res => res.json());
	});
	
	return gameDetails;
};