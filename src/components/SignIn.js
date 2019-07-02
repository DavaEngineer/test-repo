import React from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { Link } from "react-router-dom";

const SIGN_IN = gql`
  mutation($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
    }
  }
`;

class SignIn extends React.Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event, signIn) => {
    event.preventDefault();
    signIn().then(({ data }) => {
      console.log(data);
      localStorage.setItem("token", data.signIn.token);
      this.props.history.push(`/`);
    });
  };

  render() {
    const { email, password } = this.state;
    return (
      <Mutation mutation={SIGN_IN} variables={{ email, password }}>
        {(signIn, { data, loading, error }) => {
          return (
            <form onSubmit={event => this.handleSubmit(event, signIn)}>
              <h2>登录 MalQ</h2>
              <div className="links">
                没有账号？<Link to="/signup">邮箱注册</Link>
              </div>
              <input
                type="text"
                name="email"
                placeholder="邮箱"
                className="form-control"
                value={email}
                onChange={this.handleChange}
              />
              <br />
              <input
                type="password"
                placeholder="密码"
                name="password"
                className="form-control"
                value={password}
                onChange={this.handleChange}
              />
              <div className="links">
                <Link to="#">
                  <span className="text-right">忘记密码?</span>
                </Link>
              </div>
              <button type="submit" className="btn">
                登录
              </button>
            </form>
          );
        }}
      </Mutation>
    );
  }
}

export default SignIn;
