import teal from '@material-ui/core/colors/teal';

const styles = theme => ({

  sendBtn: {
    color: teal[400],
    cursor: 'pointer',
    '&:hover': {
      color: 'gray'
    }
  },

  chatTextBoxContainer: {
    position: 'absolute',
    bottom: '15px',
    left: '315px',
        [theme.breakpoints.down("xs")]: {
          left: 'calc(100% - 280px)',
        }, 
    boxSizing: 'border-box',
    overflow: 'auto',
    width: 'calc(100% - 330px)',
    minWidth: '270px'
  },

  chatTextBox: {
    width: 'calc(100% - 25px)'  
  }

});

export default styles;