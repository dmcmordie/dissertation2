import React from 'react';
import { CssBaseline, Paper } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';
import { Link } from 'react-router-dom';

class MenuComponent extends React.Component {

	render() {

		const { classes } = this.props;
		return (


			<main className={classes.main}>
				<CssBaseline />
				<Paper className={classes.paper}>

					<Link to='/dashboard'>Chat</Link>
					<Link to='/information'>Information</Link>
					<Link to='/resources'>Resources</Link>
					<Link to='/settings'>Settings</Link>
				</Paper>
			</main>
		);
	}


}

export default withStyles(styles)(MenuComponent);