import React from 'react';
import styles from './styles';
import Moment from 'moment';
import { withStyles } from '@material-ui/core/styles';

class ChatViewComponent extends React.Component {

  componentDidMount = () => {
    const container = document.getElementById('chatview-container');
    if (container)
      container.scrollTo(0, container.scrollHeight);
  }
  componentDidUpdate = () => {
    const container = document.getElementById('chatview-container');
    if (container)
      container.scrollTo(0, container.scrollHeight);
  } 

  render() {

    const { classes } = this.props;


    if (this.props.profile === null ) {
      return (<main className={classes.content}></main>);
    } else if (this.props.profile !== null) {
      return (
        <div>
         
          <div className={classes.chatHeader}>
            Signed in as {this.props.profile}
          </div>
          <main id='chatview-container' className={classes.content}>
            { 
            this.props.chat.messages === undefined ? null :
              this.props.chat.messages.map((_msg, _index) => {
                let t = new Date(_msg.timestamp);
                return (

                  <main key={_index}>
                  
                  <div className={_msg.sender === this.props.profile ? classes.userName : classes.otherName}>
                    {_msg.sender}

                    <span> &#183; </span>

                    {Moment(t).format('ddd HH:mm')}
                    
                  </div>
                  {_msg.message != null ? 
                      <div className={_msg.sender === this.props.profile ? classes.userBubble : classes.otherBubble}>
                    {_msg.message}
                    
                  </div> : null
                  } 
                   
                  
                  </main>
                  //makes sure there is a message 
                  //classname - conditional left or right
                  //display msg
                )
              })
            }
          </main>
        </div>
      );
    } else {
      return (<div className='chatview-container'>Loading...</div>);
    }
  }
}

export default withStyles(styles)(ChatViewComponent);