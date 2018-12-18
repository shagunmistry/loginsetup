import React, { Component } from 'react';
import firebaseApp from '../Firebase';

class InfoCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signedIn: false,
            userInfo: null
        };
    }

    componentDidMount() {
        firebaseApp.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log(user);
                this.setState({
                    signedIn: true,
                    userInfo: user
                });
            } else {
                this.setState({
                    signedIn: false,
                });
            }
        }, (erro) => {
            console.log(erro);
        });
    }

    render() {

        return (
            <div className="card container" style={{ color: 'black' }}>

                {
                    this.state.signedIn && this.state.userInfo
                        ?
                        <div>
                            <img className="card-img-top" id="profileImage" src={this.state.userInfo.photoURL} alt="User Profile Card" />
                            <div className="card-body">
                                <h5 className="card-title">{this.state.userInfo.displayName}</h5>
                                <p className="card-text">{this.state.userInfo.email}</p>
                                <p>User Modified Data</p>
                            </div>
                        </div>
                        : null
                }

            </div>
        );
    }
}

export default InfoCard;