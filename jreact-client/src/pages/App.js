import React, { PropTypes } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Header from '../components/Header';
import LeftDrawer from '../components/LeftDrawer';
// import ThemeDefault from '../assets/theme-default';
import Data from '../assets/data';
import withRoot from '../withRoot';
import { withStyles } from '@material-ui/core/styles';

const paddingLeftDrawerOpen = 236;

const styles = (theme) =>({
  headerWithDrawerOpen: {
    paddingLeft: paddingLeftDrawerOpen
  },
  header: {
    paddingLeft: 0
  },
  containerWithDrawerOpen: {
    margin: '80px 20px 20px 15px',
    paddingLeft:  paddingLeftDrawerOpen 
  },
  container: {
    margin: '80px 20px 20px 15px',
    paddingLeft: 0
  }
});


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      navDrawerOpen: false
    };
  }

  handleChangeRequestNavDrawer() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    });
  }

  render() {
    let { navDrawerOpen } = this.state;
   
    const { classes } = this.props;

    return (
        <div>
          <Header styles={classes.header}
                  handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(this)}/>

            <LeftDrawer navDrawerOpen={navDrawerOpen}
                        menus={Data.menus}
                        username="User Admin"/>

            <div style={classes.container}>
              {this.props.children}
            </div>
        </div>
    );
  }
}

App.propTypes = {

};

export default withRoot(withStyles(styles)(App));

