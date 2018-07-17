import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Redirect} from "react-router-dom";

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },

    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
});

class AccessGranted extends React.Component {
    state = {
        loggedIn: false,
        hrLoggedIn: false
    };

    componentDidMount() {
        const urlParams = new URLSearchParams(this.props.location.search);
        const hrLogin = urlParams.get("hrLogin");
        const id = urlParams.get("id");

        localStorage.removeItem("loggedInId");
        localStorage.removeItem("hrLoggedIn");
        if (hrLogin) {
            localStorage.setItem("hrLoggedIn", "true");
            this.setState({hrLoggedIn: true});
        }
        else if (id) {
            localStorage.setItem("loggedInId", id);
            this.setState({loggedIn: true});
        }
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                {this.state.loggedIn ?
                    (<Redirect to='/applicantAdverts'/>) :
                    (<div>
                        {
                            this.state.hrLoggedIn ?
                                <Redirect to='/dashboard'/> :
                                <div>You are not logged in.</div>
                        }
                    </div>)
                }
            </div>
        )

    }

}

AccessGranted.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccessGranted);