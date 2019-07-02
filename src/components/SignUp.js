import React, { Fragment } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { Link } from "react-router-dom";

const SIGN_UP = gql`
  mutation($email: String!, $password: String!, $name: String!) {
    signUp(email: $email, password: $password, name: $name) {
      id
      email
      password
      name
    }
  }
`;

class SignUp extends React.Component {
  state = {
    email: "",
    password: "",
    name: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event, signUp) => {
    event.preventDefault();
    signUp().then(data => {
      console.log(data);
    });
  };

  render() {
    const { email, password, name } = this.state;
    return (
      <Fragment>
        <Mutation mutation={SIGN_UP} variables={{ email, password, name }}>
          {(signUp, { data, loading, error }) => {
            return (
              <form onSubmit={event => this.handleSubmit(event, signUp)}>
                <h2>注册 MalQ</h2>
                <div className="links">
                  已有账号？<Link to="/signin">邮箱登录</Link>
                </div>
                <input
                  type="text"
                  placeholder="昵称"
                  className="form-control"
                  value={name}
                  onChange={this.handleChange}
                />
                <br />
                <input
                  type="text"
                  placeholder="邮箱"
                  className="form-control"
                  value={email}
                  onChange={this.handleChange}
                />
                <br />
                <input
                  type="password"
                  placeholder="密码"
                  className="form-control"
                  value={password}
                  onChange={this.handleChange}
                />
                <button type="submit" className="btn">
                  注册
                </button>
                {error && <p>{error.message}</p>}
              </form>
            );
          }}
        </Mutation>
      </Fragment>
    );
  }
}

export default SignUp;
