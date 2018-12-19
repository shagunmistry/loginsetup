import React, { Component } from 'react';
import firebaseApp from '../Firebase';

class InfoCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signedIn: false,
            userInfo: null,
            defaultUserProfile: "https://cdn.dribbble.com/users/77628/screenshots/5272157/cover___design_sprints_final_600x800_2x.png"
        };
    }

    componentDidMount() {
        firebaseApp.auth().onAuthStateChanged((user) => {
            if (user) {
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
                            <img 
                            className="card-img-top" 
                            id="profileImage" 
                            src={this.state.userInfo.photoURL || this.state.defaultUserProfile} 
                            alt={this.state.userInfo.displayName || this.state.defaultUserProfile} />
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