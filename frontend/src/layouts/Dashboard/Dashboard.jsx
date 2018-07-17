/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import {Switch, Route, Redirect} from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import withStyles from "@material-ui/core/styles/withStyles";
import Header from "components/Header/Header.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";

import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import dashboardRoutes from "routes/dashboard.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

import image from "assets/img/yeni2.png";
import logo from "assets/img/firm.png";

const switchRoutes = (
    <Switch>
        {dashboardRoutes.map((prop, key) => {
            if (prop.redirect)
                return <Redirect from={prop.path} to={prop.to} key={key}/>;
            return <Route path={prop.path} component={prop.component} key={key}/>;
        })}
    </Switch>
);

const LOGIN_IDX = 1;
const APPLICANT_ADVERTS_IDX = 2;
const HR_CREATE_ADVERT_IDX = 3;
const LOGOUT_IDX = 4;

class App extends React.Component {
    state = {
        mobileOpen: false,
        routes: dashboardRoutes,
        loggedIn: false,
        hrLoggedIn: false
    };
    handleDrawerToggle = () => {
        this.setState({mobileOpen: !this.state.mobileOpen});
    };

    constructor(props) {
        super(props);
        this.manageSideBar = this.manageSideBar.bind(this);
        this.hrLoggedIn = this.hrLoggedIn.bind(this);
    }

    hrLoggedIn() {
        dashboardRoutes[LOGIN_IDX].invisible = true;
        dashboardRoutes[APPLICANT_ADVERTS_IDX].invisible = true;
        dashboardRoutes[LOGOUT_IDX].invisible = false;
        dashboardRoutes[HR_CREATE_ADVERT_IDX].invisible = false;

        this.setState({
            routes: dashboardRoutes,
            hrLoggedIn: true
        });
    }

    manageSideBar() {
        let loggedIn = localStorage.getItem("loggedInId");
        let loggedUser = localStorage.getItem("loggedInUser");
        let hrLoggedIn = localStorage.getItem("hrLoggedIn");

        if (hrLoggedIn)
            this.hrLoggedIn();
        else {
            dashboardRoutes[HR_CREATE_ADVERT_IDX].invisible = true;
            if (loggedIn) {
                dashboardRoutes[LOGIN_IDX].invisible = true;
                dashboardRoutes[LOGOUT_IDX].invisible = false;
                dashboardRoutes[APPLICANT_ADVERTS_IDX].invisible = false;
            }
            else {
                dashboardRoutes[LOGIN_IDX].invisible = false;
                dashboardRoutes[LOGOUT_IDX].invisible = true;
                dashboardRoutes[APPLICANT_ADVERTS_IDX].invisible = true;
            }
            this.setState({
                loggedIn: loggedIn,
                routes: dashboardRoutes,
                hrLoggedIn: false
            });
        }
    }

    componentDidMount() {
        if (navigator.platform.indexOf("Win") > -1) {
            const ps = new PerfectScrollbar(this.refs.mainPanel);
        }

        this.manageSideBar();
    }

    componentDidUpdate(e) {
        if (e.history.location.pathname !== e.location.pathname) {
            this.refs.mainPanel.scrollTop = 0;
            if (this.state.mobileOpen) {
                this.setState({mobileOpen: false});
            }
            this.manageSideBar();
        }
    }

    render() {
        const {classes, ...rest} = this.props;
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div className={classes.wrapper}>
                    <Sidebar
                        routes={this.state.routes}
                        logoText={"OBSS Career"}
                        logo={logo}
                        image={image}
                        handleDrawerToggle={this.handleDrawerToggle}
                        open={this.state.mobileOpen}
                        color="blue"
                        {...rest}
                    />
                    <div className={classes.mainPanel} ref="mainPanel">
                        <Header
                            hrLoggedIn={this.state.hrLoggedIn}
                            routes={this.state.routes}
                            handleDrawerToggle={this.handleDrawerToggle}
                            {...rest}
                        />
                        {
                            <div className={classes.content}>
                                <div className={classes.container}>{switchRoutes}</div>
                            </div>
                        }
                    </div>
                </div>
            </MuiPickersUtilsProvider>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(App);
