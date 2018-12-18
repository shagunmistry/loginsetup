import React, { Component } from 'react';
import firebaseApp from '../Firebase';

const firebase = require('firebase/app');
require('firebase/auth');
// const db = firebaseApp.database();
class LoginCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signedIn: false,
            showEmailFields: false,
        };
    }

    componentWillMount() {
        let referThis = this;
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                referThis.setState({
                    signedIn: true,
                });
            }
        });
    }

    loginWithEmail = () => {
        this.setState({
            showEmailFields: true,
        });
    }

    loginWithClient = client => {
        let referThis = this;

        switch (client) {
            case "Google":
                let gProvider = new firebase.auth.GoogleAuthProvider();
                firebaseApp.auth().signInWithPopup(gProvider).then(function (result) {
                    referThis.setState({
                        signedIn: true
                    });
                }).catch((err) => {
                    alert("There was an error: " + err);
                });
                break;
            case "Email":
                let emailField = document.getElementById("emailInput").value;
                let passField = document.getElementById("passInput").value;
                if (emailField.length > 0 && passField.length > 0) {
                    firebaseApp.auth().signInWithEmailAndPassword(emailField, passField).then((user) => {
                        if (user) {
                            referThis.setState({
                                signedIn: true
                            });
                        }
                    }).catch((err) => {
                        if (err.code === "auth/user-not-found") {
                            // Email not found so ask them to register
                            firebaseApp.auth().createUserWithEmailAndPassword(emailField, passField).then((user) => {
                                if (user) {
                                    referThis.setState({
                                        signedIn: true
                                    });
                                }
                            }).catch((newErr) => {
                                document.getElementById('message').innerText = err.message;
                            });
                        } else {
                            document.getElementById('message').innerText = err.message;
                        }
                    })
                }
                break;
            default:
                console.error("ERROR!!!!!!!!!!!!!!!!!!!!!!!!");
                break;
        }
    }

    signOut = () => {
        firebase.auth().signOut();
        window.location.reload();
    }

    render() {

        const renderGoogleButton = () => {
            if (this.state.signedIn) {
                return (
                    <button type="button" className="btn btn-lg  btn-outline-primary"
                        onClick={() => this.signOut()}>Sign Out</button>
                );
            }
            return (
                ''
            );
        }

        const renderButtons = () => {
            if (this.state.signedIn) {
                return (
                    ''
                );
            }
            return (
                <div>
                    <button type="button" className="btn btn-lg  btn-outline-primary"
                        onClick={() => this.loginWithClient("Google")}>
                        <i className="fab fa-google"></i> | Google Login
                    </button>
                    <br />
                    <button type="button" className="btn btn-lg  btn-outline-danger"
                        onClick={() => this.loginWithEmail()}>
                        <i className="fas fa-envelope"></i> | Email Login
                    </button>
                </div>

            );
        }

        return (
            <div className="card container" style={{ color: 'black' }}>
                <div className="card-body">
                    <h5 className="card-title">Login</h5>
                    <br />
                    {
                        !this.state.signedIn
                            ? <small id="message" style={{ color: 'red' }}></small>
                            : ''
                    }
                    <hr />
                    <div className="btn-group" role="group">
                        {
                            this.state.signedIn
                                ? renderGoogleButton()
                                : renderButtons()
                        }
                    </div>
                    {
                        this.state.showEmailFields && !this.state.signedIn
                            ?
                            <div>
                                <div className="form-group">
                                    <input type="email" className="form-control" id="emailInput" placeholder="Enter email" />
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" id="passInput" placeholder="Password" />
                                </div>
                                <button type="button" className="btn btn-lg  btn-outline-danger"
                                    onClick={() => this.loginWithClient("Email")}>
                                    Sign In / Register
                                </button>
                            </div>
                            : ''
                    }
                </div>
            </div >
        );
    }
}

export default LoginCard;