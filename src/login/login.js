import { Link } from 'react-router-dom';
import React from 'react';
import styles from './styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const firebase = require("firebase");

class LoginComponent extends React.Component {

	constructor() {
		super();
		this.state = {
			email: null,
			password: null,
			loginError: ''
		}
	}
	render() {

		const { classes } = this.props;
		return (
			<main className={classes.main}>
				<CssBaseline />
				<Paper className={classes.paper}>
					<Typography color="secondary" component="h1" variant="h5">
						Login
          			</Typography>
					<form onSubmit={(e) => this.submitLogin(e)} color='red' className={classes.form}>
						<FormControl required fullWidth margin='normal' >
							<InputLabel htmlFor='login-email-input'>Email</InputLabel>
							<Input autoComplete='email' autoFocus onChange={(e) => this.userTyping('email', e)} id='login-email-input'></Input>
						</FormControl>
						<FormControl required fullWidth margin='normal'>
							<InputLabel htmlFor='login-password-input'>Password</InputLabel>
							<Input autoComplete="current-password" type="password" onChange={(e) => this.userTyping('password', e)} id='login-password-input'></Input>
						</FormControl>
						<Button type='submit' color="primary" fullWidth variant='contained' className={classes.submit}>Log In</Button>
					</form>
					<br />

					{
						this.state.loginError ?
							<Typography className={classes.errorText}>
								Incorrect login information
						</Typography> :
							null
					}


					<Typography>
						<Link className={classes.signUpLink} to='/signup'>Don't have an account?</Link>
					</Typography>


				</Paper>
			</main>

		);
	}

	userTyping = (type, e) => {
		switch (type) {
			case 'email':
				this.setState({ email: e.target.value });
				break;

			case 'password':
				this.setState({ password: e.target.value });
				break;

			default:
				break;
		}
	}

	submitLogin = (e) => {
		e.preventDefault();

		firebase
			.auth()
			.signInWithEmailAndPassword(this.state.email, this.state.password)
			.then(() => {
				this.props.history.push('/dashboard');
			}, err => {
				this.setState({ loginError: 'Server error' });
				console.log(err);
			});
	}
}

export default withStyles(styles)(LoginComponent);