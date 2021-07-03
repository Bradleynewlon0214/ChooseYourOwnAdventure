import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { Toolbar } from '@material-ui/core';

import { useHistory } from 'react-router-dom';


function Nav({ isAuth, onAuth }){

  const history = useHistory();

  const [username, setUsername] = useState(null);

  useEffect(() => {
    if(isAuth){
      const username = localStorage.getItem('username');
      setUsername(username);
    }
  }, [isAuth]);

  return (
    <React.Fragment>
      <AppBar
        component="div"
        color="primary"
        position="static"
        elevation={0}
      >
        <Toolbar>
            <Button color="inherit" onClick={(e) => {history.push("/")}}>Home</Button>
            {
                (isAuth) ?
                    <div>
                        <Button color="inherit" onClick={() => {history.push("/add")}}>Add Story</Button>
                        <Button color="inherit" onClick={() => {history.push("/profile")}}>{username}</Button>
                        <Button color="inherit" onClick={(e) => onAuth()}>Logout</Button>
                    </div>
                :
                <div>
                    <Button color="inherit" onClick={(e) => {history.push("/login")}}>Login</Button>
                    <Button color="inherit" onClick={(e) => {history.push("/register")}}>Signup</Button>
                </div>
            }
            
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}




export default Nav;