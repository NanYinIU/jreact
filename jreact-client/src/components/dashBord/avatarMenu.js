import React from 'react'

import { Button,Popper,MenuItem,MenuList,ClickAwayListener,Grow,Paper,IconButton,Divider,Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Settings from '@material-ui/icons/Settings';
import Typography from '@material-ui/core/Typography';
import {userActions} from '../../actions/user.action'
import { styles } from "../../pages/dashBord/dashBord.css";
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
                        <Typography component='h2'>
                           个人中心
                        </Typography>
                     </MenuItem>
                     <MenuItem onClick={this.handleClose}>
                        <Settings/>&nbsp;<Typography component='h2'>
                            个人设置
                        </Typography>
                    </MenuItem>
                     <MenuItem onClick={this.handleLogOut}>
                         <Typography>
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
