import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import "moment/locale/zh-cn";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import loadingGif from "./loading.gif";
const regexMongolianSymbol = /\p{Script=Mongolian}/u;

const PostItem = ({ match }) => {
  const postId = match.params.id;
  return (
    <Query
      query={gql`
        query Post($id: String!) {
          post(postId: $id) {
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
      `}
      variables={{ id: postId }}
    >
      {({ loading, error, data }) => {
        if (loading)
          return (
            <div className="loading-container">
              <img src={loadingGif} alt="loading" />
            </div>
          );
        if (error) return <p>Error :(</p>;
        const {
          id,
          description,
          objectUrl,
          createdAt,
          author,
          likes
        } = data.post;
        return (
          <article>
            <section>
              {author.verified === true ? (
                <img
                  src={author.picture}
                  alt={author.name}
                  className="post-avatar verified"
                />
              ) : (
                <img
                  src={author.picture}
                  alt={author.name}
                  className="post-avatar"
                />
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
                  <i className="far fa-heart" />{" "}
                  <div className="reaction-number">{likes.length}</div>
                </div>
              </div>
            </section>
          </article>
        );
      }}
    </Query>
  );
};
export default PostItem;
