import React from 'react'

import {Popper,MenuItem,MenuList,ClickAwayListener,Grow,Paper,IconButton} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Settings from '@material-ui/icons/Settings';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Person from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import {userActions} from '../../actions/user.action'
import { styles } from "../../assets/components/dashBord/dashBord.css";
class AvatarMenu extends React.Component{

    constructor(props){
        super(props);
        this.state = {open: false,}
    }
    handleToggle = () => {
        this.setState(state => ({
            open: !state.open
        }));
    };
    handleClose = event => {
        if (this.anchorEl.contains(event.target)) {
            return;
        }
        this.setState({
            open: false
        });
    };
    handleLogOut = () =>{
       return userActions.logout();
    }
    render(){
        const { classes } = this.props;
        const { open } = this.state;
        return (
            <div>

          <IconButton
            buttonRef={node => {
              this.anchorEl = node;
            }}
            aria-owns={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={this.handleToggle}
          >
            <AccountCircle />
          </IconButton>
          <Popper open={open}
              anchorEl={this.anchorEl}
              transition
              disablePortal
              className={classes.popperNav} >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList>
                    <MenuItem onClick={this.handleClose}>
                        <Person/>&nbsp;<Typography component='h3'>
                           个人中心
                        </Typography>
                     </MenuItem>
                     <MenuItem onClick={this.handleClose}>
                        <Settings/>&nbsp;<Typography component='h3'>
                            个人设置
                        </Typography>
                    </MenuItem>
                     <MenuItem onClick={this.handleLogOut}>
                         <ExitToApp/>&nbsp;<Typography component='h3'>
                         登   出
                         </Typography>
                     </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
        )
    }
}
export default withStyles(styles)(AvatarMenu);
