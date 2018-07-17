import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from "axios/index";

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: "#E3F2FD",
        color: theme.palette.common.black,
        fontSize: 17,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
        backgroundColor: "#E3F2FD",
    },
    row:{
    backgroundColor: "#FFFFFF",
    },
});

class ApplicationAdverts extends React.Component {
    state = {
        loggedIn: false,
        empty: true,
        applications: []
    };

    componentDidMount() {
        let userId = localStorage.getItem("loggedInId");
        let user = localStorage.getItem("loggedInUser");
        console.log("In adverts: " + userId);
        console.log(user);
        if (userId) {
            this.setState({
                loggedIn: true
            });
            let obj = {
                id: userId
            };
            axios.post('http://localhost:8080/public/getUserApplications/', userId).then(res => {
                if (res.data && res.data.length > 0) {
                    console.log("applications");
                    console.log(res.data);
                    this.setState({
                        applications: res.data,
                        empty: false
                    });
                }
                else {
                    this.setState({
                        empty: true
                    });
                }
            });
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                {this.state.empty ?
                    <div>No applications</div> :

                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow >
                                    <CustomTableCell>Company</CustomTableCell>
                                    <CustomTableCell>Job Title</CustomTableCell>
                                    <CustomTableCell>Application Date</CustomTableCell>
                                    <CustomTableCell>Status</CustomTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.applications.map((application, key) => {
                                    return (
                                        <TableRow className={classes.row} key={key}>
                                            <CustomTableCell component="th" scope="row">{application.advertCompany}</CustomTableCell>
                                            <CustomTableCell>{application.advertTitle}</CustomTableCell>
                                            <CustomTableCell>{application.applicationDate}</CustomTableCell>
                                            <CustomTableCell>{application.status}</CustomTableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </Paper>
                }
            </div>
        );
    }

}

ApplicationAdverts.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ApplicationAdverts);