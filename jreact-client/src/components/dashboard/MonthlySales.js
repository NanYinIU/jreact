import React, {PropTypes} from 'react';
import Paper from '@material-ui/core/Paper';
import {white, pink600, pink500} from '@material-ui/core/colors';
import {BarChart, Bar, ResponsiveContainer, XAxis} from 'recharts';
import GlobalStyles from '../../assets/styles';
const styles = (themes) =>( {
    paper: {
      backgroundColor: pink600,
      height: 150
    },
    div: {
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '95%',
      height: 85
    },
    header: {
      color: white,
      backgroundColor: pink500,
      padding: 10
    }
  });

class MonthlySales extends React.Component {

const {classes} = this.props
state = {}
render(){
 return (
   <Paper style={classes.paper}>
      <div style={{...classes.title, ...classes.header}}>Monthly Sales</div>
      <div style={classes.div}>
        <ResponsiveContainer>
          <BarChart data={props.data} >
            <Bar dataKey="uv" fill={pink500}/>
            <XAxis dataKey="name" stroke="none" tick={{fill: white}}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Paper>
  );
}
 };

MonthlySales.propTypes = {
  data: PropTypes.array
};

export default withStyles(styles)(MonthlySales);
