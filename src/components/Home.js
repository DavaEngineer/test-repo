import React, { Fragment } from "react";
import PostList from "./PostList";
import RecommendationUsers from "./RecommendationUsers";

const Home = () => {
  var style = {
    color: "#484848"
  };
  return (
    <Fragment>
      <RecommendationUsers />
      <div className="header-sub">
        推荐 <i className="fas fa-rss-square" style={style} />
      </div>
      <PostList />
    </Fragment>
  );
};

export default Home;
