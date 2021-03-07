import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList';
import { useRouter } from 'next/router';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

/**
 * Displays menu button which lists available operations in the application.
 */
export default function CustomizedMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const router = useRouter();

  const navigateTo = (path) => {
    router.push(path);
    handleClose();
  };

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Menu
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            navigateTo('/');
          }}
        >
          <ListItemIcon>
            <HomeIcon fontSize="small" />
          </ListItemIcon>
          Home
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigateTo('/new-releases');
          }}
        >
          <ListItemIcon>
            <FiberNewIcon fontSize="small" />
          </ListItemIcon>
          New Releases
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigateTo('/recommendations');
          }}
        >
          <ListItemIcon>
            <FeaturedPlayListIcon fontSize="small" />
          </ListItemIcon>
          Recommendations
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigateTo('/activity');
          }}
        >
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          My Activity
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
