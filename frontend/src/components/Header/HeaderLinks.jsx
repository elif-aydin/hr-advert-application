import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Hidden from "@material-ui/core/Hidden";
import Person from "@material-ui/icons/Person";
import Button from "components/CustomButtons/Button.jsx";
import headerLinksStyle from "assets/jss/material-dashboard-react/components/headerLinksStyle";
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import Downshift from 'downshift';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function renderInput(inputProps) {
    const {InputProps, classes, ref, ...other} = inputProps;

    return (
        <TextField
            InputProps={{
                inputRef: ref,
                classes: {
                    root: classes.inputRoot,
                },
                ...InputProps,
            }}
            {...other}
        />
    );
}

function renderSuggestion({suggestion, index, itemProps, highlightedIndex, selectedItem}, hr) {
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

    return (
        hr ?
        <ListItem
            {...itemProps}
            key={suggestion.id}
            selected={isHighlighted}
            component={Link}
            to={{
                pathname: 'hrUserInfo',
                state: {user: suggestion}
            }}
            style={{
                fontWeight: isSelected ? 500 : 400,
            }}>
            <ListItemText
                primary={suggestion.firstName + ' ' + suggestion.lastName}
                secondary={suggestion.headline}
            />
        </ListItem>
            :
            <ListItem
                {...itemProps}
                key={suggestion.id}
                selected={isHighlighted}
                component={Link}
                to={{
                    pathname: '/advertDetail',
                    state: {advert: suggestion}
                }}
                style={{
                    fontWeight: isSelected ? 500 : 400,
                }}>
                <ListItemText
                    primary={suggestion.title}
                    secondary={suggestion.fromCompany + ' ' + suggestion.place}
                />
            </ListItem>
    );
}

renderSuggestion.propTypes = {
    highlightedIndex: PropTypes.number,
    index: PropTypes.number,
    itemProps: PropTypes.object,
    selectedItem: PropTypes.string,
    suggestion: PropTypes.shape({firstName: PropTypes.string, lastName: PropTypes.string}).isRequired,
};

class HeaderLinks extends React.Component {
    state = {
        open: false,
        suggestions: [],
    };

    handleClick = () => {
        this.setState({open: !this.state.open});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleLogin = () => {
        return <Redirect to='/login'/>;
    };

    makeTheSearch = (searchText, searchUrl) => {
        if (searchText && searchText != '') {
            let obj = {
                searchText: searchText
            };

            axios.post(searchUrl, obj).then(res => {
                if (res && res.data) {
                    console.log(res.data);
                    this.setState({suggestions: res.data});
                }
            });
        }
        else {
            this.setState({suggestions: []});
        }
    };

    render() {
        const {classes, hrLoggedIn} = this.props;
        let msj = 'Search users';
        let msj2 = 'http://localhost:8080/public/searchUserHr/';
        let hr = true;
        if (!hrLoggedIn) {
            msj = 'Search adverts';
            msj2 = 'http://localhost:8080/public/searchAdverts/'
            hr = false;
        }


        return (
            <div>
                <div className={classes.searchWrapper}>
                    <Downshift onInputValueChange={(value) => this.makeTheSearch(value, msj2)}>
                        {({getInputProps, getItemProps, isOpen, inputValue, selectedItem, highlightedIndex}) => (
                            <div className={classes.container}>
                                {renderInput({
                                    fullWidth: true,
                                    classes,
                                    InputProps: getInputProps({
                                        placeholder: msj,
                                        id: 'integration-downshift-simple',
                                    }),
                                })}
                                {isOpen ? (
                                    <Paper className={classes.paper} square>
                                        {this.state.suggestions.map((suggestion, index) =>
                                            renderSuggestion({
                                                suggestion,
                                                index,
                                                itemProps: hrLoggedIn ? getItemProps({item: suggestion.firstName + ' ' + suggestion.lastName}):
                                                    getItemProps({item: suggestion.title}),
                                                highlightedIndex,
                                                selectedItem,
                                            }, hrLoggedIn),
                                        )}
                                    </Paper>
                                ) : null}
                            </div>
                        )}

                    </Downshift>
                </div>

                <Button
                    // onClick={this.handleLogin}
                    color={window.innerWidth > 959 ? "transparent" : "white"}
                    justIcon={window.innerWidth > 959}
                    simple={!(window.innerWidth > 959)}
                    aria-label="Person"
                    className={classes.buttonLink}
                    component={Link}
                    to="/login"
                >
                    <Person className={classes.icons}/>
                    <Hidden mdUp>
                        <p className={classes.linkText}>Profile</p>
                    </Hidden>
                </Button>
            </div>
        );
    }
}

export default withStyles(headerLinksStyle)(HeaderLinks);
