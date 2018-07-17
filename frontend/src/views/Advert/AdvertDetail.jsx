import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "@material-ui/core/Button"
import Card from "components/Card/Card.jsx";
import CardHeader from '@material-ui/core/CardHeader';
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import axios from 'axios';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import obssLogo from "assets/img/firm.png";
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ArrowForward from '@material-ui/icons/ArrowForward';
import InputLabel from "@material-ui/core/InputLabel";
import {Link, Redirect} from "react-router-dom";
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Snackbar from '@material-ui/core/Snackbar';

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
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: "#000000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        top: '30%',
        left: '40%'
    },
    notLoggedIn: {
        visibility: "hidden"
    },
    loggedIn: {
        visibility: "visible"
    }
});

class AdvertDetail extends React.Component {
    state = {
        advert: {},
        reqs: [],
        open: false,
        logInWarning: false,
        loggedInId: null,
        coverLetter: '',
        snackBarOpen: false,
        snackBarMsg: ''
    };

    componentDidMount() {
        let id = localStorage.getItem("loggedInId");
        this.setState({
            loggedInId: id,
            advert: this.props.location.state.advert,
            reqs: this.props.location.state.advert.requirements
        });

        // axios.get('http://localhost:8080/public/adverts/' + this.props.location.state.foo).then(res => {
        //     this.setState({
        //         advert: res.data,
        //         reqs: res.data.requirements
        //     });
        // });
    }

    handleClickOpen = () => {
        if (!this.state.loggedInId) {
            console.log("not logged in to application.");
            this.handleWarningOpen();
        }
        else
            this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleWarningClose = () => {
        this.setState({ logInWarning: false });
    };

    handleWarningOpen = () => {
        this.setState({ logInWarning: true });
    };

    handleLogin = () => {
        return <Redirect to='/login'/>;
    };

    handleApply = () => {
        if (!this.state.loggedInId) {
            console.log("not logged in to application.");
            this.handleWarningOpen();
        }
        else {
            this.setState({ open: false });
            axios.get('http://localhost:8080/public/applyToApplication/' + this.state.advert.id + '&' + this.state.loggedInId + '&' + this.state.coverLetter).then(res => {
                this.setState({
                    snackBarOpen: true,
                    snackBarMsg: res.data
                });
            });
        }
    };

    handleCoverLetterChange = prop => event => {
        this.setState({[prop]: event.target.value});
    };

    handleSnackBarClose = () => {
        this.setState({snackBarOpen: false});
    };

    render() {
        const {classes, fullScreen} = this.props;

        return (
            <div>
                <Grid container>
                    <GridItem xs={12} sm={12} md={4}>
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.media}
                                image={obssLogo}
                                title={this.state.advert.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="headline" component="h2">
                                    {this.state.advert.title}
                                </Typography>
                                <Typography component="p">
                                    {this.state.advert.fromCompany} - {this.state.advert.place}
                                </Typography>
                            </CardContent>
                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={8}>
                        <Card>
                            <CardHeader className={classes.cardTitle}
                                        color="7E57C2"
                                        title={this.state.advert.title}/>

                            <CardBody>
                                <Grid container color="primary">
                                    <GridItem>
                                        <Typography variant="body2" gutterBottom paragraph>
                                            {this.state.advert.description}
                                        </Typography>

                                        <Typography variant="title" className={classes.reqTitle}>
                                            Requirements
                                        </Typography>
                                        <div className={classes.requirements}>
                                            <List>
                                                {this.state.reqs.map((req, index) => (
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
                            <CardFooter>
                                <Button onClick={this.handleClickOpen} color="primary">Apply</Button>

                                <Dialog
                                    fullScreen={fullScreen}
                                    open={this.state.logInWarning}
                                    onClose={this.handleWarningClose}
                                    aria-labelledby="responsive-dialog-title"
                                >
                                    <DialogTitle id="responsive-dialog-title">{"You are not logged in"}</DialogTitle>
                                    <DialogActions>
                                        <Button
                                            component={Link}
                                            to= "/login"
                                            size="small"
                                            color="primary">
                                            Login
                                        </Button>
                                    </DialogActions>
                                </Dialog>

                                <Dialog
                                    open={this.state.open}
                                    onClose={this.handleClose}
                                    aria-labelledby="form-dialog-title"
                                    fullWidth                                >
                                    <DialogTitle id="form-dialog-title">Apply to OBSS</DialogTitle>
                                    <DialogContent>
                                        <FormControl required fullWidth={true}>
                                            <InputLabel htmlFor="coverLetter">Please supply a cover letter</InputLabel>
                                            <Input
                                                id="coverLetter"
                                                value={this.state.coverLetter}
                                                onChange={this.handleCoverLetterChange('coverLetter')}
                                                rows={4}
                                                multiline={true}
                                            />
                                        </FormControl>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={this.handleClose} color="primary">
                                            Cancel
                                        </Button>
                                        <Button onClick={this.handleApply} color="primary">
                                            Apply
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </CardFooter>
                        </Card>
                    </GridItem>
                </Grid>
                <Snackbar
                    anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                    open={this.state.snackBarOpen}
                    onClose={this.handleSnackBarClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.snackBarMsg}</span>}
                />
            </div>
        );
    }
}

AdvertDetail.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdvertDetail);