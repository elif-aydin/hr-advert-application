import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from "axios/index";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Button from "@material-ui/core/Button"
import classNames from "classnames";

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
    },
    paperRoot: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    label: {
        fontWeight: 'bold'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        flexBasis: 200
    },
    margin: {
        margin: theme.spacing.unit,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        flexBasis: 200
    },
});

class UserInfo extends React.Component {
    state = {
        expanded: null,
        applicationDetails: [],
        blackListReason: '',
        user: {}
    };

    componentDidMount() {
        const {user} = this.props.location.state;
        this.setState({user: user});

        let obj = {
            userId: user.id
        };
        axios.post('http://localhost:8080/public/userApplicationsHr/', obj).then(res => {
            this.setState({
                applicationDetails: res.data
            });
        });
    }

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    handleReasonChange = prop => event => {
        this.setState({[prop]: event.target.value});
    };

    submitBlackList = () => {
        if (this.state.user.blackList == true || (this.state.user.blackList == false && this.state.blackListReason && this.state.blackListReason != '')) {
            let obj = {
                userId: this.state.user.id,
                blackListStatus: this.state.user.blackList != true,
                blackListReason: this.state.blackListReason
            };

            axios.post('http://localhost:8080/public/changeBlackListStatusHr/', obj).then(res => {
                if (res && res.data) {
                    this.setState({
                        user: res.data,
                        blackListReason: ""
                    });
                }
            });
        }
    };

    render() {
        const {classes} = this.props;
        const {expanded, applicationDetails, user} = this.state;

        return (
            <div className={classes.root}>
                <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography variant="title" className={classes.heading}>UserInfo</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Paper className={classes.paperRoot}>
                            <Table>
                                <TableBody>
                                    <TableRow className={classes.row}>
                                        <CustomTableCell component="th" scope="row">Name Surname</CustomTableCell>
                                        <CustomTableCell>{user.firstName + ' ' + user.lastName}</CustomTableCell>
                                    </TableRow>
                                    <TableRow className={classes.row}>
                                        <CustomTableCell component="th" scope="row">Headline</CustomTableCell>
                                        <CustomTableCell>{user.headline}</CustomTableCell>
                                    </TableRow>
                                    <TableRow className={classes.row}>
                                        <CustomTableCell component="th" scope="row">Email</CustomTableCell>
                                        <CustomTableCell>{user.emailAddress}</CustomTableCell>
                                    </TableRow>
                                    <TableRow className={classes.row}>
                                        <CustomTableCell component="th" scope="row">Industry</CustomTableCell>
                                        <CustomTableCell>{user.industry}</CustomTableCell>
                                    </TableRow>
                                    <TableRow className={classes.row}>
                                        <CustomTableCell component="th" scope="row">Black Listed</CustomTableCell>
                                        <CustomTableCell>
                                            {user.blackList ? 'Yes - ' + user.blackListReason : 'No'}
                                            {user.blackList ?
                                                <Button onClick={this.submitBlackList} color="primary">Remove From Black
                                                    List</Button>
                                                :
                                                (
                                                    <FormControl required fullWidth={true}
                                                                 className={classNames(classes.margin, classes.textField)}>
                                                        <InputLabel htmlFor="blackListReason">Black list
                                                            reason</InputLabel>
                                                        <Input
                                                            id="blackListReason"
                                                            value={this.state.blackListReason}
                                                            rows={2}
                                                            multiline={true}
                                                            onChange={this.handleReasonChange('blackListReason')}
                                                        />
                                                        <Button onClick={this.submitBlackList} color="primary">Add
                                                            to Black List</Button>
                                                    </FormControl>
                                                )}
                                        </CustomTableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Paper>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography variant="title" className={classes.heading}>Applications</Typography>
                        <Typography className={classes.secondaryHeading}>
                            Total number of applications: {applicationDetails.length}
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <Paper className={classes.paperRoot}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <CustomTableCell>Code</CustomTableCell>
                                        <CustomTableCell>Title</CustomTableCell>
                                        <CustomTableCell>Status</CustomTableCell>
                                        <CustomTableCell>Similarity</CustomTableCell>
                                        <CustomTableCell>Application Date</CustomTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {applicationDetails.map((n, idx) => {
                                        return (
                                            <TableRow className={classes.row} key={idx}>
                                                <CustomTableCell component="th"
                                                                 scope="row">{n.advertCode}</CustomTableCell>
                                                <CustomTableCell component="th"
                                                                 scope="row">{n.advertTitle}</CustomTableCell>
                                                <CustomTableCell component="th" scope="row">{n.status}</CustomTableCell>
                                                <CustomTableCell component="th"
                                                                 scope="row">{n.similarity}</CustomTableCell>
                                                <CustomTableCell component="th"
                                                                 scope="row">{n.applicationDate}</CustomTableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </Paper>

                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

UserInfo.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserInfo);