import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Advert from "components/Advert/Advert.jsx"

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: "transperent",//dont touch. never ever
    },

    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },

    gridList: {
        "width": 1000,
        "height": 'auto',
        "overflowY": 'auto',
    },
    indvCell: {
        "borderRadius": 25,
        "whiteSpace": 'normal',
        "wordWrap": 'break-word'
    }
});

function AdvertGrid(props) {
    const { classes } = props;

    return (
        <div className={styles.root}>
            <GridList cellHeight='auto' cols={3} className={styles.gridList}>
                {props.adverts.map((advert, index) => (
                    <GridListTile key={index} style={styles.indvCell} children={<Advert advertData={advert} isHr={props.isHr}/>}>
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}

AdvertGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdvertGrid);