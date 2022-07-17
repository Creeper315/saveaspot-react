import React, { Component } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const CLIENT_ID =
    '1016702716489-u2fjc3us998nqb1mt8c01uglpt42dshl.apps.googleusercontent.com';

class GoogleLoginComponent extends Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            userInfo: {
                name: '',
                emailId: '',
            },
        };
    }

    // Success Handler
    responseGoogleSuccess = (response) => {
        // console.log('Success', response);
        let userInfo = {
            name: response.profileObj.name,
            emailId: response.profileObj.email,
        };
        this.setState({ userInfo, isLoggedIn: true });
    };

    // Error Handler
    responseGoogleError = (response) => {
        // console.log('err', response);
    };

    // Logout Session and Update State
    logout = (response) => {
        // console.log('logout', response);
        let userInfo = {
            name: '',
            emailId: '',
        };
        this.setState({ userInfo, isLoggedIn: false });
    };

    render() {
        return (
            <div className="row mt-5">
                <div className="col-md-12">
                    {this.state.isLoggedIn ? (
                        <div>
                            <h1>Welcome, {this.state.userInfo.name}</h1>

                            <GoogleLogout
                                clientId={CLIENT_ID}
                                buttonText={'Logout'}
                                onLogoutSuccess={this.logout}
                            ></GoogleLogout>
                        </div>
                    ) : (
                        <GoogleLogin
                            clientId={CLIENT_ID}
                            buttonText="Sign In with Google"
                            onSuccess={this.responseGoogleSuccess}
                            onFailure={this.responseGoogleError}
                            isSignedIn={true}
                            cookiePolicy={'single_host_origin'}
                        />
                    )}
                </div>
            </div>
        );
    }
}
export default GoogleLoginComponent;
