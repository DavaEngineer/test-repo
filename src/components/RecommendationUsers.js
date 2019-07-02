import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import loadingGif from "./loading.gif";
import { Link } from "react-router-dom";

const RECOMMENDATION_USERS = gql`
  {
    users {
      id
      name
      picture
    }
  }
`;

const RecommendationUsers = () => {
  return (
    <Query query={RECOMMENDATION_USERS}>
      {({ loading, error, data }) => {
        if (loading)
          return (
            <div className="loading-container">
              <img src={loadingGif} alt="loading" />
            </div>
          );
        if (error) return <p>Error :(</p>;

        return (
          <div className="recommendation-users">
            {data.users.map(({ id, name, picture }) => (
              <Link to={"users/" + id}>
                <img src={picture} alt={name} />
              </Link>
            ))}
            更多
          </div>
        );
      }}
    </Query>
  );
};

export default RecommendationUsers;
