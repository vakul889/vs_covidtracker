import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { Container } from '@material-ui/core';
import {Link} from 'react-router-dom';
import { Icon, Grid, Button } from 'semantic-ui-react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';
import Pagetitle from '../Components/Page.title.component';
import Pagefooter from '../Components/Page.footer.component';

const signout = () => {
  window.localStorage.setItem("severity","success");
  window.localStorage.setItem("message","Signed out successfully");
  localStorage.removeItem("username")
}
export default function Globalpage({children,...props}) {
  var user = localStorage.getItem("username")
  if(user!=null){
    user = "Welcome "+user+" !"
  }
  return (
      <div className="home-background" style={{minHeight: window.innerHeight, minWidth: window.innerWidth}}>
      <AppBar color="transparent"  position="static" style={{marginBottom: "10px"}}>
          <div style={{padding: "15px"}}>
              <Grid verticalAlign="middle">
                <Grid.Row >
                  <Grid.Column width={4}>
                    <VerticalMenu/>
                  </Grid.Column>
                  <Grid.Column width={8} textAlign="center">
                    <h1>COVID-19 TRACKER - INDIA</h1>
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <div className="user-control">
                      <h4 style={{padding: '10px', margin:0}}>{user}</h4>
                      <a href="/Authenticate" onClick={signout}><Button>Signout</Button></a>
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>            
          </div>
      </AppBar>
      <Pagetitle/>
      <Container maxWidth="lg">
            {children}
      </Container>
      <Pagefooter/>
    </div>
  );
}

function VerticalMenu(){
  const [state, setState] = React.useState({ left: false });
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <div style={{width: 250}}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <IconButton onClick={toggleDrawer('left', false)}>
            <ChevronLeftIcon />
      </IconButton>
      <Divider />
      <List>
        <Link to="./">
        <ListItem button>
          <ListItemIcon><Icon color="black" name='home' size="large" /></ListItemIcon>
          <ListItemText primary='Home' />
        </ListItem>
        </Link>
        <Link to="./ByState">
        <ListItem button>
          <ListItemIcon><Icon color="black" name='idea' size="large" /></ListItemIcon>
          <ListItemText primary='Data by State' />
        </ListItem>
        </Link>
        <Link to = "./ByCity">
          <ListItem button>
            <ListItemIcon><Icon color="black" name='idea' size="large" /></ListItemIcon>
            <ListItemText primary='Data By City' />
          </ListItem>
        </Link>
      </List>
    </div>
  );
  return(
      <React.Fragment>
          <Icon style={{cursor: 'pointer'}} onClick={toggleDrawer('left', true)} color="black" name='bars' size="large" />
          <Drawer anchor='left' 
                  open={state['left']} 
                  onClose={toggleDrawer('left', false)}>
            {list('left')}
          </Drawer>
      </React.Fragment>
  )
}