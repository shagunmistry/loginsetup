import React, { Component } from 'react';
import firebaseApp from '../Firebase';

const firebase = require('firebase/app');
require('firebase/firestore');

var db = firebase.firestore();
const dbSetting = { timestampsInSnapshots: true };
db.settings(dbSetting);

class InfoCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultUserProfile: "https://cdn.dribbble.com/users/77628/screenshots/5272157/cover___design_sprints_final_600x800_2x.png",
            signedIn: false,
            userInfo: null,
            username: '',
            tagline: '',
        };
    }

    componentWillMount() {
        let referThis = this;
        firebaseApp.auth().onAuthStateChanged((user) => {
            if (user) {
                // Get user's data if he's signed in. 
                db.collection("users").doc(user.uid).onSnapshot(function (doc) {
                    if (doc.exists) {
                        referThis.setState({
                            tagline: doc.data().tagline,
                            username: doc.data().username,
                        });
                    }
                });

                referThis.setState({
                    signedIn: true,
                    userInfo: user,
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

    showEditSection = () => {
        document.getElementById('editForm').style.display = 'block';
    }

    saveInformation = () => {
        let uNameField = document.getElementById("uNameField").value;
        let tagField = document.getElementById('tagField').value;
        db.collection("users").doc(this.state.userInfo.uid)
            .set({
                username: uNameField,
                tagline: tagField
            }, { merge: true })
            .then(() => {
                document.getElementById('editForm').style.display = 'none';
            })
            .catch((dataAddError) => {
                alert(dataAddError);
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
                                <p>{this.state.username || 'Please Edit Your Data'}</p>
                                <p>{this.state.tagline || 'Please Edit Your Data'}</p>
                            </div>
                            <div className="card-footer" style={{ backgroundColor: 'transparent' }}>
                                <button className="btn btn-lg btn-primary" onClick={() => this.showEditSection()}>
                                    Edit
                                </button>
                                <div id="editForm" style={{ display: 'none', margin: '10px' }}>
                                    <div className="form-row">
                                        <div className="col-md-6" style={{ padding: '5px' }}>
                                            <input type="text" className="form-control" id="uNameField" placeholder="Username" />
                                        </div>
                                        <div className="col-md-6" style={{ padding: '5px' }}>
                                            <input type="text" className="form-control" id="tagField" placeholder="Tagline" />
                                        </div>
                                    </div>
                                    <button className="btn btn-lg btn-info" onClick={() => this.saveInformation()}>
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                        : null
                }

            </div>
        );
    }
}

export default InfoCard;