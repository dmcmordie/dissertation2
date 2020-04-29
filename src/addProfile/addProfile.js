import React from 'react';
import { CssBaseline, Paper, Typography, FormControl, Input, InputLabel, Button } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

const firebase = require("firebase");

class AddProfileComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: "",
      role: "",
      addProfileError: "",
      email: ""
    };
  }

  render() {

    const { classes } = this.props;
    return (


      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Add Profile
          			</Typography>

          <form onSubmit={(e) => this.submitProfile(e)} className={classes.form}>
            <FormControl required fullWidth margin='normal'>
              <InputLabel htmlFor='profile-name-input'>Enter your name</InputLabel>
              <Input autoFocus autoComplete="off" onChange={(e) => this.userTyping('name', e)} id='profile-name-input'></Input>
            </FormControl>

            <FormControl fullWidth margin='normal'>
              <InputLabel htmlFor='profile-age-input'>Enter your age</InputLabel>
              <Input autoComplete="off" onChange={(e) => this.userTyping('age', e)} id='profile-age-input'></Input>
            </FormControl>

            <FormControl fullWidth margin='normal'>
              <InputLabel htmlFor='profile-role-input'>Enter your role</InputLabel>
              <Input autoComplete="off" onChange={(e) => this.userTyping('role', e)} id='profile-role-confirmation-input'></Input>
            </FormControl>

            <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>Submit</Button>

          </form>

          {
            this.state.addProfileError ?
              <Typography className={classes.errorText} component='h5' variant='h6'>
                {this.state.addProfileError}
              </Typography> :
              null
          }

        </Paper>
      </main>
    );
  }


  userTyping = (whichInput, event) => {
    switch (whichInput) {
      case 'name':
        this.setState({ name: event.target.value });
        break;

      case 'age':
        this.setState({ age: event.target.value });
        break;

      case 'role':
        this.setState({ role: event.target.value });
        break;

      default:
        break;
    }
  }

  submitProfile = (e) => {
    e.preventDefault(); // This is to prevent the automatic refreshing of the page on submit.

    var currentUser = firebase.auth().currentUser;
    var currentName = this.state.name;

    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    })

    if ((db.collection('profiles')
      .where('email', 'array-contains', currentUser.email)).length < 0) {
      firebase
        .firestore()
        .collection('chats')
        .doc(currentUser.email)
        .set({
          messages: [{
            message: null,
            sender: currentName
          }],
          email: currentUser
        })
    }
      
    db.collection('profiles')
      .doc(currentUser.email)
      .update({
        profiles: firebase.firestore.FieldValue.arrayUnion({
          name: currentName, //profile
          age: this.state.age,
          role: this.state.role,
        }),
        email: currentUser.email,
      }).then(() => {
        window.location.reload(false);
      }, dbErr => {
        console.log('Failed to add profile to the database: ', dbErr);
        this.setState({ addProfileError: 'Failed to add profile' });
      }, authErr => {
        console.log('Failed to create profile: ', authErr);
        this.setState({ addProfileError: 'Failed to add profile' });
      });

  };

}

export default withStyles(styles)(AddProfileComponent);