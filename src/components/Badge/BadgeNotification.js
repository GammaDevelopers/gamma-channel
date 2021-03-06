import React from 'react';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';


const BadgeNotification = () => (
  <div>
    <Badge
      badgeContent={4}
      primary={true}
      badgeStyle={{top:12, right:12}}>
      <IconButton tooltip="Notifications">
        <NotificationsIcon />
      </IconButton>
    </Badge>
  </div>
);

export default BadgeNotification;
