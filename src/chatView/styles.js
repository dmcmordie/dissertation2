import teal from '@material-ui/core/colors/teal';
import blueGrey from '@material-ui/core/colors/blueGrey';

const styles = theme => ({

  content: {
    height: 'calc(100vh - 100px)',
    overflow: 'auto',
    padding: '25px',
    left: '300px',
        [theme.breakpoints.down("xs")]: {
          left: 'calc(100% - 300px)',
        }, 
    boxSizing: 'border-box',
    overflowY: 'scroll',
    top: '50px',
    width: 'calc(100% - 300px)',  
    minWidth: '300px',
    position: 'absolute'
  },

  otherBubble: {
    float: 'left',
    clear: 'both',
    padding: '20px',
    boxSizing: 'border-box',
    wordWrap: 'break-word',
    marginTop: '5px',
    backgroundColor: teal[400],
    color: 'white',
    width: '300px',
        [theme.breakpoints.down("xs")]: {
          width: 'calc(100% - 20px)',
          fontSize: '10px'
        }, 
    borderRadius: '10px',
  },

  userBubble: {
    float: 'right',
    clear: 'both',
    padding: '20px',
    boxSizing: 'border-box',
    wordWrap: 'break-word',
    marginTop: '5px',
    backgroundColor: blueGrey[200],
    color: 'black',
    width: '300px',
    borderRadius: '10px',
    [theme.breakpoints.down("xs")]: {
          width: 'calc(100% - 20px)',
          fontSize: '12px'
        }, 
  },

  otherName: {
    float: 'left',
    clear: 'both',
    marginTop: '10px',
    color: 'grey',
    width: '300px',
    [theme.breakpoints.down("xs")]: {
          fontSize: '12px'
        }, 
  },

  userName: {
    float: 'right',
    clear: 'both',
    marginTop: '12px',
    color: 'grey',
    width: '300px',
    [theme.breakpoints.down("xs")]: {
          leftMargin: '1000px',
          fontSize: '12px'
        }, 
  },

  chatHeader: {
    width: 'calc(100% - 301px)', 
    height: '50px',
    minWidth: '300px',
    backgroundColor: teal[500],
    color: 'white',
    position: 'fixed',
    marginLeft: '301px',
    fontSize: '18px',
    textAlign: 'center',
    paddingTop: '10px',
    boxSizing: 'border-box',
    left: '0',
        [theme.breakpoints.down("xs")]: {
          left: 'calc(100% - 600px)',
        }, 
  },

  

});

export default styles;