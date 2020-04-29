import React from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import ChatTextBoxComponent from '../chatTextBox/chatTextBox';
import ChatViewComponent from '../chatView/chatView';
import ProfileListComponent from '../profileList/profileList';
import AddProfileComponent from '../addProfile/addProfile';

const firebase = require("firebase");

class DashboardComponent extends React.Component {

	constructor() {
		super();
		this.state = {
			selectedProfile: null,
			newProfileFormVisible: false,
			email: null,
			chats: [],
			profiles: [],/* 
			chatIndex: null */
		};
	}

	render() {

		const { classes } = this.props;
		if (this.state.email) {
			return (
				
				<div>
					<ProfileListComponent history={this.props.history}
						selectProfileFn={this.selectProfile}
						selectedProfile={this.state.selectedProfile}
						selectNameFn={this.selectName}
						newProfileBtnFn={this.newProfileBtnClicked}
						profileList={this.state.profiles}
						chat={this.state.chats}>
					</ProfileListComponent>
					
					{this.state.newProfileFormVisible ? null :
						<ChatViewComponent
							user={this.state.email}
							chat={this.state.chats[0]}
							profile={this.state.selectedProfile}>
						</ChatViewComponent>
					}

					{this.state.selectedProfile !== null && !this.state.newProfileFormVisible?
						<ChatTextBoxComponent
							userClickedInputFn={this.messageRead}
							submitMessageFn={this.submitMessage}>

						</ChatTextBoxComponent> : null
					}

					{this.state.newProfileFormVisible ?
						<AddProfileComponent></AddProfileComponent>
						: null
					}

					<Button color="primary" variant="contained" className={classes.signOutBtn} onClick={this.signOut}>Sign out</Button>
				</div>
				
			);
		} else {
			return (<div>LOADING....</div>);
		}
	}

	signOut = () => firebase.auth().signOut();

	newProfileBtnClicked = () => this.setState({ newProfileFormVisible: true, selectedProfile: null });

	selectProfile = (profileName) => {
		this.setState({ selectedProfile: profileName, newProfileFormVisible: false });
		/* this.messageRead(); */
	}

	/* 	messageRead = () => {
			const signedInUser = firebase.auth().currentUser;
	
			if (this.clickedMessageWhereNotSender(this.state.selectedProfile)) {
				firebase
					.firestore()
					.collection('chats')
					.doc(signedInUser.email) //build doc key pt7 13:50
					.update({
						receiverHasRead: true
					})
			} else {
				console.log('Clicked profile where profile was sender');
			}
		} */
/* 
	clickedMessageWhereNotSender = () =>
		this.state.chats[0].messages[this.state.chats[0].messages.length - 1].sender !== this.state.selectedProfile;

 */
	submitMessage = (msg) => {

		const signedInUser = firebase.auth().currentUser;

		firebase
			.firestore()
			.collection('chats')
			.doc(signedInUser.email) //build doc key pt7 13:50
			.update({
				messages: firebase.firestore.FieldValue.arrayUnion({
					sender: this.state.selectedProfile, //profile
					message: msg,
					timestamp: Date.now()
				}),
				receiverHasRead: false
			})
	}

	componentDidMount = () => {

		firebase.auth().onAuthStateChanged(_usr => {
			if (!_usr)
				this.props.history.push('/login');
			else {
				console.log('User signed in');
				firebase.firestore()
					.collection('chats')
					.where('email', '==', _usr.email)
					.onSnapshot(res => {
						const chatsRes = res.docs.map(_doc => _doc.data());
						this.setState({
							email: _usr.email,
							chats: chatsRes
						});
						console.log('Chat and email state set successfully')
					})


				firebase.firestore()
					.collection('profiles')
					.where('email', '==', _usr.email)
					.onSnapshot(res => {
						const profsRes = res.docs.map(_doc => _doc.data());
						if (profsRes[0].profiles) {
							this.setState({
								profiles: profsRes[0].profiles
							});
							console.log('Profiles state set successfully')
						}

					})

			}

		}
		)
	}
	//if no user is signed in redirect to login
	//else get chats and set state of email, chats (object) and msgs (array)

}


export default withStyles(styles)(DashboardComponent);