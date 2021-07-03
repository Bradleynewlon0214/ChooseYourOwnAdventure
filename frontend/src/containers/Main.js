import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

import Nav from '../components/Nav';

import CssBaseline from '@material-ui/core/CssBaseline';


const Main = (props) => {

    useEffect(() => {
        // console.log(props.isAuthenticated);
    });
    

    return (
        <div>
            <Nav isAuth={props.isAuthenticated} onAuth={props.onAuth}/>
            <CssBaseline />
            
            {props.children}

        </div>

    );
}

const mapStateToProps = state => {
    return{
        isAuthenticated: state.token !== null,
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: () => dispatch(actions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);