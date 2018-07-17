import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "@material-ui/core/Button"
import Card from "components/Card/Card.jsx";
import CardHeader from '@material-ui/core/CardHeader';
import CardBody from "components/Card/CardBody.jsx";
import axios from 'axios';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import obssLogo from "assets/img/firm.png";
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ArrowForward from '@material-ui/icons/ArrowForward';
import {Link, Redirect} from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import Avatar from '@material-ui/core/Avatar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TableCell from '@material-ui/core/TableCell';
import Snackbar from '@material-ui/core/Snackbar';
import ReactTable from "react-table";
import "react-table/react-table.css";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

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

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const styles = theme => ({
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#7E57C2",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    },
    card: {
        maxWidth: 345,
    },
    media: {
        height: 55,
        paddingTop: '20.25%', // 16:9
    },
    advertDesc: {
        fontSize: "18px"
    },
    //tarihlerin oldugu yer
    cardTitle: {
        backgroundColor: "#E3F2FD",
        color: "rgba(255,255,255,.62)"
    },
    button: {
        margin: theme.spacing.unit,
    },
    //req tablosu
    requirements: {
        backgroundColor: "7E57C2",
        // width: "600px",
        margin: "auto",
        border: "3px solid #E3F2FD"
    },
    reqTitle: {
        margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
    },
    paper: {
        // position: 'absolute',
        // width: '100%',
        // overflowX: 'auto',
        // backgroundColor: "#000000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        // top: '30%',
        // left: '40%'
    },
    notLoggedIn: {
        visibility: "hidden"
    },
    loggedIn: {
        visibility: "visible"
    },
    modalRoot: {
        width: '80%',
        position: 'absolute',
        // maxWidth: 400,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        top: '20%',
        left: '10%',
        backgroundColor: theme.palette.background.paper,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
        backgroundColor: "#FFFFFF",
    },
    table: {
        // minWidth: 700,
        backgroundColor: "#E3F2FD",
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
});

class HrAdvertDetail extends React.Component {
    state = {
        advert: {},
        reqs: [],
        users: [],
        applications: [],
        applicationsOpen: false,
        logInWarning: false,
        loggedInId: null,
        statusSwitchCheck: false,
        currentMessage: '',
        snackBarOpen: false,
        order: 'asc',
        orderBy: 'status',
        page: 0,
        rowsPerPage: 5,
        dialogOpen: false,
        advertDeleted: false
    };

    componentDidMount() {
        let id = localStorage.getItem("loggedInId");
        const {advert} = this.props.location.state;
        this.setState({
            loggedInId: id,
            advert: advert,
            statusSwitchCheck: advert.status,
            reqs: advert.requirements,
            users: advert.users,
            applications: advert.applications
        });
    }

    showApplications = () => {
        this.setState({applicationsOpen: true});
    };

    closeApplications = () => {
        this.setState({applicationsOpen: false});
    };

    getApplications = () => {
        const {classes} = this.props;
        const {users, rowsPerPage, page} = this.state;
        return (
            users.length === 0 ?
                "No applications" :
                <ReactTable
                    data={users}
                    columns={[
                        {
                            Header: 'User',
                            columns: [
                                {
                                    Header: '',
                                    accessor: 'pictureUrl',
                                    Cell: row => (
                                        <Avatar component={Link} to={{
                                            pathname: 'hrUserInfo',
                                            state: {user: row.original}
                                        }} src={row.value}/>
                                    )
                                },
                                {
                                    Header: 'First Name',
                                    accessor: 'firstName'
                                },
                                {
                                    Header: 'Last Name',
                                    id: 'lastName',
                                    accessor: d => d.lastName
                                }
                            ]
                        },
                        {
                            Header: 'Application',
                            columns: [
                                {
                                    Header: 'Status',
                                    accessor: 'a_statusText'
                                },
                                {
                                    Header: 'Similarity',
                                    accessor: 'a_similarity'
                                },
                                {
                                    Header: 'Date',
                                    accessor: 'a_applicationDate'
                                }
                            ]
                        },
                        {
                            Header: 'Operations',
                            columns: [
                                {
                                    // Header: 'Start Progress',
                                    // accessor: 'a_status',
                                    Cell: row => (
                                        <Button onClick={this.handleApplicationState(row.original, 1)}
                                                color="inherit"
                                                className={classes.button}>
                                            Start Progress
                                        </Button>
                                    )
                                },
                                {
                                    // accessor: 'a_status',
                                    Cell: row => (
                                        <Button onClick={this.handleApplicationState(row.original, 2)}
                                                color="inherit"
                                                className={classes.button}>
                                            Accept
                                        </Button>
                                    )
                                },
                                {
                                    // accessor: 'a_status',
                                    Cell: row => (
                                        <Button onClick={this.handleApplicationState(row.original, 3)}
                                                color="inherit"
                                                className={classes.button}>
                                            Decline
                                        </Button>
                                    )
                                }
                            ]
                        }
                    ]}

                    defaultPageSize={5}
                    className="-striped -highlight"
                />

        )
    };

    handleAdvertState = name => event => {
        let obj = {
            advertId: this.state.advert.id,
            active: event.target.checked
        };
        axios.post('http://localhost:8080/public/setAdvertActiveHr/', obj).then(res => {
            this.setState({
                [name]: res.data.status,
                advert: res.data
            });
        });
    };

    handleApplicationState = (user, status) => event => {
        let obj = {
            advertId: this.state.advert.id,
            userId: user.id,
            status: status,
            userNameSurname: user.firstName + ' ' + user.lastName,
            advertTitle: this.state.advert.title,
            userEmail: user.emailAddress
        };

        let nameSurname = user.firstName + ' ' + user.lastName;
        let action = '';
        if (status === 1)
            action = ' is in progress.';
        else if (status === 2)
            action = ' is accepted!';
        else if (status === 3)
            action = ' is rejected!';

        axios.post('http://localhost:8080/public/changeApplicationStatusHr/', obj).then(res => {
            this.setState({
                users: res.data.users,
                currentAction: nameSurname + action,
                snackBarOpen: true
            });
        });
    };

    handleSnackBarClose = () => {
        this.setState({snackBarOpen: false});
    };

    handleDeleteAdvert = () => {
        let obj = {
            advertId: this.state.advert.id
        };
        axios.post('http://localhost:8080/public/deleteAdvertHr/', obj).then(res => {
            this.setState({
                advertDeleted: true,
                dialogOpen: false
            });
        });
    };

    getSnackbar = () => {
        return (
            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                open={this.state.snackBarOpen}
                onClose={this.handleSnackBarClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{this.state.currentAction}</span>}
            />
        )
    };

    handleOpenDialog = () => {
        this.setState({dialogOpen: true});
    };

    handleCloseDialog = () => {
        this.setState({dialogOpen: false});
    };


    getDialog = () => {
        return (
            <Dialog
                open={this.state.dialogOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={this.handleCloseDialog}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                    {"Caution"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure about deleting this advert?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCloseDialog} color="secondary">
                        Never mind
                    </Button>
                    <Button onClick={this.handleDeleteAdvert} color="primary">
                        Yes!
                    </Button>
                </DialogActions>
            </Dialog>
        )
    };

    render() {
        const {classes, fullScreen} = this.props;
        const {advert, users, reqs, applicationsOpen, statusSwitchCheck} = this.state;

        return (
            this.state.advertDeleted ?
                <Redirect to={"/"}/> :
                <div>
                    <Grid container>
                        <GridItem xs={12} sm={12} md={4}>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.media}
                                    image={obssLogo}
                                    title={advert.title}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="headline" component="h2">
                                        {advert.title}
                                    </Typography>
                                    <Typography component="p">
                                        {advert.fromCompany} - {advert.place}
                                    </Typography>
                                    <Typography component="p">
                                        {'Code: ' + advert.id}
                                    </Typography>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={statusSwitchCheck}
                                                onChange={this.handleAdvertState('statusSwitchCheck')}
                                                value="statusSwitchCheck"
                                            />
                                        }
                                        label={statusSwitchCheck ? 'Status: Active' : 'Status: Passive'}
                                    />
                                </CardContent>
                            </Card>

                            <Button onClick={this.showApplications}
                                    color="primary">{'Applications (' + users.length + ')'}</Button>
                            <Button onClick={this.handleOpenDialog} color="secondary">Delete Advert</Button>
                            {this.getDialog()}
                        </GridItem>

                        <GridItem xs={12} sm={12} md={8}>
                            <Card>
                                <CardHeader className={classes.cardTitle}
                                            color="7E57C2"
                                            title={advert.title}/>

                                <CardBody>
                                    <Grid container color="primary">
                                        <GridItem>
                                            <Typography variant="body2" gutterBottom paragraph>
                                                {advert.description}
                                            </Typography>

                                            <Typography variant="title" className={classes.reqTitle}>
                                                Requirements
                                            </Typography>
                                            <div className={classes.requirements}>
                                                <List>
                                                    {reqs.map((req, index) => (
                                                        <ListItem key={index}>
                                                            <ListItemIcon>
                                                                <ArrowForward/>
                                                            </ListItemIcon>
                                                            <Typography variant="body1">
                                                                {req}
                                                            </Typography>
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            </div>
                                        </GridItem>
                                    </Grid>
                                </CardBody>
                            </Card>
                        </GridItem>

                        <Modal
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                            open={applicationsOpen}
                            onClose={this.closeApplications}
                        >
                            <div className={classes.modalRoot}>
                                {/*{this.getApplications()}*/}
                                <Typography variant="title" id="tableTitle">
                                    Applications of {advert.id}
                                </Typography>
                                {this.getApplications()}
                            </div>
                        </Modal>
                        {this.getSnackbar()}
                    </Grid>
                </div>
        );
    }
}

HrAdvertDetail.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HrAdvertDetail);