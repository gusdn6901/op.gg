import ApolloClient from "apollo-boost";

const client = new ApolloClient({
	uri: "http://serendipity-api.run.goorm.io/"
});

export default client;