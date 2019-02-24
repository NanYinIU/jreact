import React, {PropTypes} from 'react';
import Avatar from '@material-ui/core/Avatar';
import {List, ListItem} from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import MoreVert from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import {grey400, cyan600, white} from '@material-ui/core/colors';
import {typography} from '@material-ui/system';
import Wallpaper from '@material-ui/icons/Wallpaper';

const RecentlyProducts = (props) => {

  const styles = {
    subheader: {
      fontSize: 24,
      fontWeight: typography.fontWeightLight,
      backgroundColor: cyan600,
      color: white
    }
  };

  const iconButtonElement = (
    <IconButton
      touch={true}
      tooltipPosition="bottom-left"
    >
      <MoreVert color={grey400} />
    </IconButton>
  );


  return (
    <Paper>
      <List>
        <ListSubheader style={styles.subheader}>Recent Products</ListSubheader>
        {props.data.map(item =>
          <div key={item.title}>
            <ListItem
              leftAvatar={<Avatar icon={<Wallpaper />} />}
              primaryText={item.title}
              secondaryText={item.text}
            />
            <Divider inset={true} />
          </div>
        )}
      </List>
    </Paper>
  );
};

RecentlyProducts.propTypes = {
  data: PropTypes.array
};

export default RecentlyProducts;
