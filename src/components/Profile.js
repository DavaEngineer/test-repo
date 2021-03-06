import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import loadingGif from "./loading.gif";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import "moment/locale/zh-cn";
const regexMongolianSymbol = /\p{Script=Mongolian}/u;

const PROFILE_QUERY = gql`
  query CurrentUser {
    currentUser {
      id
      email
      name
      picture
      posts {
        id
        description
        objectUrl
        createdAt
        author {
          id
          email
          name
          picture
        }
        likes {
          id
        }
      }
    }
  }
`;
const Profile = () => {
  return (
    <Query query={PROFILE_QUERY} fetchPolicy="network-only">
      {({ loading, data: { currentUser } }) => {
        if (loading)
          return (
            <div className="loading-container">
              <img src={loadingGif} alt="loading" />
            </div>
          );
        if (currentUser) {
          const { id, name, picture, posts } = currentUser;
          return (
            <div key={id}>
              <div className="profile-header">
                <img src={picture} alt={name} className="profile-avatar" />
                <div className="tm profile-name-v">
                  {regexMongolianSymbol.test(name) && name}
                </div>
                <div>
                  <div className="profile-name">
                    {!regexMongolianSymbol.test(name) && name}
                    <button
                      onClick={() => {
                        localStorage.removeItem("token");
                        this.props.history.push(`/`);
                      }}
                    >
                      退出登录
                    </button>
                  </div>
                  <div className="profile-id">MalQ ID: {id}</div>
                  <div>帖子 {posts.length} • Following 0 • Followers 0</div>
                </div>
              </div>
              <div className="profile-posts-head">我的帖子</div>
              {posts.map(
                ({ id, description, objectUrl, createdAt, author, likes }) => (
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
                            {!regexMongolianSymbol.test(author.name) &&
                              author.name}
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
                )
              )}
            </div>
          );
        }

        return (
          <p className="navbar-text navbar-right">
            <a href="/login/github">Log in with GitHub</a>
          </p>
        );
      }}
    </Query>
  );
};

export default Profile;
