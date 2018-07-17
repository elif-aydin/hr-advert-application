import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Redirect, Router} from "react-router-dom";
import Button from "@material-ui/core/Button"
import linkedinLogo from "assets/img/linkedIn_logo.png";
import Icon from '@material-ui/core/Icon';
import LinkedinSDK from 'react-linkedin-sdk'
import axios from "axios/index";
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },

    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    button: {
        margin: theme.spacing.unit,
        color: "#FFFFFF",
        backgroundColor: "#0174b3",
        height: 45,
    },
    linkedInButton: {
        margin: theme.spacing.unit,
        background: 'url(' + linkedinLogo + ')',
        maxWidth: '100%',
        maxHeight: '100%',
        width: 285,
        height: 45,
    },

    list: {
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
    }
});

class LoginPage extends React.Component {
    state = {
        loggedIn: false,
        firstLogin: false,
        hrLoggedIn: false,
    };

    componentDidMount() {
        let loggedInId = localStorage.getItem("loggedInId");
        let hrLoggedIn = localStorage.getItem("hrLoggedIn");
        console.log("In login: " + loggedInId + ' ' + hrLoggedIn);
        if (loggedInId != null) {
            this.setState({
                loggedIn: true,
                hrLoggedIn: false
            });
        }
        else if (hrLoggedIn)
            this.setState({
                loggedIn: false,
                hrLoggedIn: true
            });
    }

    responseLinkedin(response) {
        console.log(response);
        let obj = {
            id: response.id,
            firstName: response.firstName,
            lastName: response.lastName,
            emailAddress: response.emailAddress,
            industry: response.industry,
            headline: response.headline,
            pictureUrl: response.pictureUrls.values[0]
        };

        axios.post('http://localhost:8080/public/checkAndSaveUser/', obj).then(res => {
            localStorage.removeItem("hrLoggedIn");
            localStorage.setItem("loggedInUser", res.data);
            localStorage.setItem("loggedInId", res.data.id);
            this.setState({
                loggedIn: true
            });
        });
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                {
                    this.state.loggedIn ?
                        <Redirect to={"/applicantAdverts"}/> :
                        this.state.hrLoggedIn ?
                            <Redirect to={"/"}/> :

                            <List className={classes.list}>
                                <ListItem>
                                    <a href="http://localhost:8080/login">
                                        <Button variant="contained" color="default" className={classes.button}>
                                            HR Login
                                        </Button>
                                    </a>
                                </ListItem>
                                <ListItem>
                                    <LinkedinSDK
                                        clientId="86omtcfdd3fmdq"
                                        callBack={this.responseLinkedin.bind(this)}
                                        fields=":(id,first-name,last-name,headline,location,industry,summary,specialties,email-address,num-connections,picture-urls::(original))"
                                        className={classes.linkedInButton}
                                        textButton={''}
                                        buttonType={'button'}
                                    />
                                </ListItem>
                            </List>
                }

            </div>
        );
    }
}

//./assets/img/loginWithLinkedIn.jpg"

LoginPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPage);