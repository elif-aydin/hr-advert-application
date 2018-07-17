import React from "react";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";
import AdvertGrid from "components/Advert/AdvertGrid.jsx"
import axios from 'axios';


import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";


class Dashboard extends React.Component {
    state = {
        value: 0,
        adverts: [],
        isHr: false
    };

    componentDidMount() {
        let hrLoggedIn = localStorage.getItem("hrLoggedIn");
        let path = "advertsGeneral";
        if (hrLoggedIn) {
            path = 'advertsHrAll';
            this.setState({isHr: true});
        }

        axios.get('http://localhost:8080/public/' + path).then(res => {
            console.log(res.data);
            this.setState({adverts: res.data});
        });
    }

    handleChange = (event, value) => {
        this.setState({value});
    };

    handleChangeIndex = index => {
        this.setState({value: index});
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <AdvertGrid adverts={this.state.adverts} isHr={this.state.isHr}/>
            </div>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
