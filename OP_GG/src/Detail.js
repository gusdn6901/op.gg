import React from "react";
import { Query } from "react-apollo";
import Loading from "./Loading";
import Error from "./Error";
import Information from "./Information";
import { summoner } from "./queries"; 

const Detail = (props) => (
	<Query query={ summoner(props.match.params.summoner) }>{({ loading, data, error }) => {
			if(loading) return <Loading />;
			if(error) return <Error />;
			
			return <Information data={data} />;
	}}
	</Query>
);

export default Detail;