import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import classNames from 'classnames'
import {DateTimePicker} from 'material-ui-pickers';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import UniqueId from 'react-html-id'
import Snackbar from '@material-ui/core/Snackbar';
import axios from "axios/index";

const styles = theme => ({
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#000000",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
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
    reqMargin: {
        marginTop: "24px"
    }
});


class HrCreateAdvert extends React.Component {

    constructor() {
        super();
        UniqueId.enableUniqueIds(this);
        const minDate = new Date();
        minDate.setHours(0, 0, 0, 0);

        const maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear() + 1);

        this.state = {
            advertCode: '',
            advertTitle: '',
            description: '',
            requirements: [],
            currentRequirement: '',
            minDate: minDate,
            maxDate: maxDate,
            activationDate: new Date(),
            deactivationDate: new Date(),
            snackBarOpen: false
        };
    }


    activationDateChanged = (date) => {
        this.setState({
            activationDate: date
        });
    };

    deactivationDateChanged = (date) => {
        this.setState({
            deactivationDate: date
        });
    };

    handleChange = prop => event => {
        this.setState({[prop]: event.target.value});
    };

    addRequirement = () => {
        if (this.state.currentRequirement) {
            let reqs = this.state.requirements.slice();
            reqs.push(this.state.currentRequirement);
            this.setState({
                requirements: reqs,
                currentRequirement: ''
            });
        }
    };

    removeRequirement = (idx, e) => {
        const reqs = Object.assign([], this.state.requirements);
        reqs.splice(idx, 1);
        this.setState({requirements: reqs});
    };

    submitAdvert = () => {
        const {advertCode, advertTitle, description, requirements, activationDate, deactivationDate} = this.state;
        axios.post('http://localhost:8080/public/createAdvert', {
            advertCode,
            advertTitle,
            description,
            requirements,
            activationDate,
            deactivationDate
        }).then(res => {
            console.log("valsvav");
            console.log(res);
        });
        this.setState({snackBarOpen: true});
    };

    handleSnackBarClose = () => {
        this.setState({snackBarOpen: false});
    };

    render() {
        const {classes} = this.props;
        const {activationDate, deactivationDate, currentRequirement, minDate, maxDate, snackBarOpen} = this.state;
        return (
            <div>
                <Grid container>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhite}>Create Advert</h4>
                            </CardHeader>
                            <CardBody>
                                <Grid container>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <FormControl required fullWidth={true}
                                                     className={classNames(classes.margin, classes.textField)}>
                                            <InputLabel htmlFor="advertCode">Advert Code</InputLabel>
                                            <Input
                                                id="advertCode"
                                                value={this.state.advertCode}
                                                onChange={this.handleChange('advertCode')}
                                            />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <FormControl required fullWidth={true}
                                                     className={classNames(classes.margin, classes.textField)}>
                                            <InputLabel htmlFor="title">Title</InputLabel>
                                            <Input
                                                id="title"
                                                value={this.state.advertTitle}
                                                onChange={this.handleChange('advertTitle')}
                                            />
                                        </FormControl>
                                    </GridItem>
                                </Grid>

                                <Grid container>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <FormControl required fullWidth={true}
                                                     className={classNames(classes.margin, classes.textField)}>
                                            <InputLabel htmlFor="description">Description</InputLabel>
                                            <Input
                                                id="description"
                                                value={this.state.description}
                                                rows={5}
                                                multiline={true}
                                                onChange={this.handleChange('description')}
                                            />
                                        </FormControl>
                                    </GridItem>
                                </Grid>
                                <Grid container>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <FormControl required fullWidth={true}
                                                     className={classNames(classes.margin, classes.textField)}>
                                            <InputLabel htmlFor="reqList">Requirements</InputLabel>
                                            <List className={classes.reqMargin} id="reqList">
                                                <ListItem key="reqListKey">
                                                    <Input fullWidth
                                                           value={currentRequirement}
                                                           onChange={this.handleChange('currentRequirement')}
                                                           placeholder='Type a requirement'
                                                    />
                                                    <ListItemSecondaryAction>
                                                        <IconButton aria-label="Add">
                                                            <AddIcon onClick={this.addRequirement}/>
                                                        </IconButton>
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                                {
                                                    this.state.requirements.map((value, idx) => {
                                                        return (<ListItem key={this.nextUniqueId()}>
                                                            <ListItemText
                                                                primary={value}
                                                            />
                                                            <ListItemSecondaryAction>
                                                                <IconButton aria-label="Delete">
                                                                    <DeleteIcon
                                                                        onClick={this.removeRequirement.bind(this, idx)}/>
                                                                </IconButton>
                                                            </ListItemSecondaryAction>
                                                        </ListItem>)
                                                    })
                                                }
                                            </List>
                                        </FormControl>
                                    </GridItem>
                                </Grid>

                                <Grid container>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <FormControl required fullWidth={true}
                                                     className={classNames(classes.margin, classes.textField)}>
                                            <DateTimePicker
                                                // keyboard
                                                label="Activation Date"
                                                // format="DD/MM/YYYY"
                                                // handle clearing outside => pass plain array if you are not controlling value outside
                                                mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
                                                value={activationDate}
                                                onChange={this.activationDateChanged}
                                                leftArrowIcon={<Icon> keyboard_arrow_left </Icon>}
                                                rightArrowIcon={<Icon> keyboard_arrow_right </Icon>}
                                                disableOpenOnEnter
                                                disablePast
                                                minDate={minDate}
                                                maxDate={maxDate}
                                                animateYearScrolling={false}
                                            />
                                        </FormControl>
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={6}>
                                        <FormControl required fullWidth={true}
                                                     className={classNames(classes.margin, classes.textField)}>
                                            <DateTimePicker
                                                // keyboard
                                                label="Deactivation Date"
                                                // format="DD/MM/YYYY"
                                                // handle clearing outside => pass plain array if you are not controlling value outside
                                                mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
                                                value={deactivationDate}
                                                onChange={this.deactivationDateChanged}
                                                disableOpenOnEnter
                                                disablePast
                                                leftArrowIcon={<Icon> keyboard_arrow_left </Icon>}
                                                rightArrowIcon={<Icon> keyboard_arrow_right </Icon>}
                                                minDate={activationDate}
                                                maxDate={maxDate}
                                                animateYearScrolling={false}
                                            />
                                        </FormControl>
                                    </GridItem>
                                </Grid>

                            </CardBody>
                            <CardFooter>
                                <Button onClick={this.submitAdvert} color="primary">Create</Button>
                            </CardFooter>
                            <Snackbar
                                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                                open={snackBarOpen}
                                onClose={this.handleSnackBarClose}
                                ContentProps={{
                                    'aria-describedby': 'message-id',
                                }}
                                message={<span id="message-id">Advert Created</span>}
                            />
                        </Card>
                    </GridItem>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(HrCreateAdvert);
