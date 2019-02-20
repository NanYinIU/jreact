import React from "react";
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import {styles} from '../../assets/components/dashBord/toolbar.css'

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AvatarMenu from '../../components/dashBord/avatarMenu'
class MyToolbar extends React.Component {

constructor(props) {
super(props)
this.state={}
}

render(){
const { classes } = this.props;
return(
<Toolbar className={classes.toolbar}>
    <Typography
    component="h1"
    variant="h6"
    noWrap
    className={classes.title}
    >
    {this.props.name}
    </Typography>
    <IconButton >
    <Badge badgeContent={4} color="secondary">
    <NotificationsIcon />
    </Badge>
    </IconButton>

    {/* 头像下面下拉 */}
    <AvatarMenu></AvatarMenu>
</Toolbar>
)
}}

export default withStyles(styles)(MyToolbar);
