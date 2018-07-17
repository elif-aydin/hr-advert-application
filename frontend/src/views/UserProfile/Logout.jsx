import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from "react-router-dom";
import axios from 'axios';

class Logout extends React.Component {

    componentDidMount() {
        localStorage.removeItem("loggedInId");
        let hr = localStorage.getItem("hrLoggedIn");

        if (hr) {
            localStorage.removeItem("hrLoggedIn");
            axios.post("http://localhost:8080/logout/").then(res => {

            });
        }

        var cookies = document.cookie.split("; ");
        for (var c = 0; c < cookies.length; c++) {
            var d = window.location.hostname.split(".");
            while (d.length > 0) {
                var cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + d.join('.') + ' ;path=';
                var p = window.location.pathname.split('/');
                document.cookie = cookieBase + '/';
                while (p.length > 0) {
                    document.cookie = cookieBase + p.join('/');
                    p.pop();
                };
                d.shift();
            }
        }
    }

    render() {
        return (
            <Redirect to={"/dashboard"}/>
        );
    }
}

Logout.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default (Logout);