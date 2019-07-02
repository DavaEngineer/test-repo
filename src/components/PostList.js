import React, { Fragment } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import loadingGif from "./loading.gif";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import "moment/locale/zh-cn";

const POST_LIST = gql`
  query POST_LIST($first: Int!) {
    posts(first: $first, orderBy: "createdAt_DESC") {
      id
      description
      objectUrl
      createdAt
      author {
        id
        email
        name
        picture
        verified
      }
      likes {
        id
      }
    }
  }
`;
const regexMongolianSymbol = /\p{Script=Mongolian}/u;

const PostList = () => (
  <Query query={POST_LIST} variables={{ first: 5 }}>
    {({ loading, error, data, fetchMore }) => {
      if (loading)
        return (
          <div className="loading-container">
            <img src={loadingGif} alt="loading" />
          </div>
        );
      if (error) return <p>Error :(</p>;
      let current = data.posts.length;

      return (
        <Fragment>
          {data.posts.map(
            ({ id, description, objectUrl, createdAt, author, likes }) => (
              <article key={id}>
                <section>
                  {author.verified === true ? (
                    <Link to={"users/" + author.id}>
                      <img
                        src={author.picture}
                        alt={author.name}
                        className="post-avatar"
                      />
                    </Link>
                  ) : (
                    <Link to={"users/" + author.id}>
                      <img
                        src={author.picture}
                        alt={author.name}
                        className="post-avatar"
                      />
                    </Link>
                  )}
                  <div className="post-name tm">
                    {regexMongolianSymbol.test(author.name) && author.name}
                  </div>
                </section>
                <section>
                  <div className="post-header">
                    <div>
                      <div className="post-name">
                        {!regexMongolianSymbol.test(author.name) && author.name}
                      </div>
                      <div className="post-date">
                        <Moment locale="zh-cn" fromNow>
                          {createdAt}
                        </Moment>
                      </div>
                    </div>
                    <div className="more-btn">
                      <Link to="/signin">
                        <i className="fas fa-ellipsis-h" />
                      </Link>
                    </div>
                  </div>

                  {regexMongolianSymbol.test(description) ? (
                    <div className="post-direction-v">
                      <video
                        src={objectUrl + "#t=0.1"}
                        controls
                        className="video"
                      />
                      <div className="post-description tm">
                        <Link to={"posts/" + id}>{description}</Link>
                      </div>
                    </div>
                  ) : (
                    <div className="post-direction-h">
                      <div className="post-description">
                        <Link to={"posts/" + id}>{description}</Link>
                      </div>
                      <video
                        src={objectUrl + "#t=0.1"}
                        controls
                        className="video"
                      />
                    </div>
                  )}

                  <div className="post-footer">
                    <div className="reaction">
                      <Link to="/signin">
                        <i className="far fa-heart" />{" "}
                      </Link>

                      <div className="reaction-number">{likes.length}</div>
                    </div>
                  </div>
                </section>
              </article>
            )
          )}
          {/* Load More Button */}
          <button
            className="load-more"
            onClick={() => {
              fetchMore({
                variables: { first: current + 5 },
                updateQuery: (prev, { fetchMoreResult }) => {
                  if (!fetchMoreResult) return prev;
                  return Object.assign(prev, fetchMoreResult);
                }
              });
            }}
          >
            装载更多
          </button>
        </Fragment>
      );
    }}
  </Query>
);

export default PostList;
