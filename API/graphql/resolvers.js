import { getSummoner } from "./db";
import { getLeague } from "./db";
import { getMatches } from "./db";
import { getGames } from "./db";

const resolvers = {
	Query: {
		summoner: (_, { name }) => getSummoner(name),
		league: (_, { name }) => getLeague(name),
		matches: (_, { name }) => getMatches(name),
		games: (_, { name }) => getGames(name)
	}
};

export default resolvers;