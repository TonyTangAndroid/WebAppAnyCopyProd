import React from 'react';
import Parse from 'parse'

function reallySimpleEmailValidate(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signup: false,
      forgetPassword: false,
      success: false
    };
  }

  submit() {
    var self = this;
    var username = React.findDOMNode(this.refs.username).value;

    if (!reallySimpleEmailValidate(username)) {
      this.setState({
        error: "Please provide a valid email address"
      })
      return;
    }

    if (this.state.forgetPassword) {
      Parse.User.requestPasswordReset(username, {
        success: function () {
          self.setState({
            error: null,
            success: true
          })
        },
        error: function (error) {
          // Show the error message somewhere
          self.setState({
            error: error.message,
            success: null
          });
        }
      });
    } else {
      var password = React.findDOMNode(this.refs.password).value;

      if (username.length && password.length) {
        if (this.state.signup) {
          console.log('signup');
          var u = new Parse.User({
            username: username,
            email: username,
            password: password
          });
          u.signUp().then(function () {
            // self.setState({
            //   error: null
            // });
          }, function (error) {
            self.setState({
              error: error.message
            });
          });
        } else {
          Parse.User.logIn(username, password).then(function () {
            // self.setState({
            //   error: null
            // });
          }, function (error) {
            self.setState({
              error: 'Incorrect username or password'
            });
          });
        }
      } else {
        this.setState({
          error: 'Please enter all fields'
        });
      }
    }
  }

  toggleSignup() {
    this.setState({
      signup: !this.state.signup,
      error: undefined
    });
  }

  forgetToggle() {
    this.setState({
      forgetPassword: !this.state.forgetPassword,
      error: undefined
    });
  }

  render() {
    return (
      <div className="container">
        <form className="form-signin">
          <h1>AnyCopy</h1>
          <br/>

          <div className='form-group'>
            <label htmlFor='username' className="sr-only">Email</label>
            <input ref='username' id='username' type='text' required autofocus className="form-control"
                   placeholder="Email"/>
          </div>

          {!this.state.forgetPassword ?
            <div className='form-group'>
              <label htmlFor='password' className="sr-only">Password</label>
              <input ref='password' id='password' type='password' className="form-control" placeholder="Password"
                     required/>
            </div> : null
          }


          { this.state.error ?
            <div className='form-group centered errors'>{this.state.error}</div> :
            null
          }
          { this.state.success ?
            <div className='form-group centered' style={{color:"green"}}>An email has been sent to your email, please
              check it out. :)</div> :
            null
          }
          <div className='form-group'>
            <a className="btn btn-lg btn-primary btn-block" onClick={this.submit.bind(this)}>
              { this.state.forgetPassword ? "Find Back" : this.state.signup ? 'Sign up' : 'Log in'}
            </a>
          </div>


          <div className='form-group'>
            { !this.state.forgetPassword ?
              <span>or&nbsp;<a
                onClick={this.toggleSignup.bind(this)}> {this.state.signup ? 'Log in' : 'Sign up'}</a></span> : null
            }
            <a className="right" style={{float:"right"}} onClick={this.forgetToggle.bind(this)}>
              { this.state.forgetPassword ? "Log In or Sign up" : 'Forget password?'}
            </a>
          </div>
        </form>
      </div>
    );
  }
}
