import React from 'react';
import { CssBaseline, Paper, Typography } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';
import { Link } from 'react-router-dom';

class InformationComponent extends React.Component {

	render() {

		const { classes } = this.props;
		return (


			<main className={classes.main}>
				<CssBaseline />
				<Paper className={classes.paper}>
					<div><Typography>
						Hi, my name is {this.props.name}
					</Typography>

					<Typography>
						I have a mental condition called Dissociative Identity Disorder.
					</Typography>

					<Typography>
						I do not feel able to commmunicate with you verbally right now.
						My details are as follows:
					</Typography></div>

					
					<Link to='/menu'>Back to menu</Link>
				</Paper>
			</main>
		);
	}


}

export default withStyles(styles)(InformationComponent);