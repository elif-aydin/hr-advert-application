import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import image2 from "assets/img/images.png";
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';

const styles = {
    card: {
        maxWidth: 390,
        backgroundColor: "#E3F2FD",
        whiteSpace: 'normal',
        wordWrap: 'break-word'

    },
    image2: {
        height: 10,
        width: '50%',
        paddingTop: '7%', // 16:9
        paddingBottom: '5%',
        margin : '5%',
        align: 'center'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    pos: {
        marginBottom: 12,
    },
    content: {
        height: 150,
        whiteSpace: 'normal',
        wordWrap: 'break-word'
    }
};

function Advert(props) {
    const { classes } = props;
    let detailPath = '/advertDetail';
    if (props.isHr)
        detailPath = '/hrAdvertDetail';

    let applicantCount = props.advertData.users.length;
    let hrMessage = "No applications";
    if (applicantCount === 1)
        hrMessage = "1 application";
    else if (applicantCount > 1)
        hrMessage = "" + applicantCount + " application";

    const {title, description} = props.advertData;
    return (
            <Card className={classes.card}>
                <CardMedia
                    className={classes.image2}
                    image= {image2}
                    title={title}
                />
                <CardContent className={classes.content}>
                    <Typography gutterBottom variant="headline">
                        {title.length > 35 ? title.substring(0, 35) + '...' : title}
                    </Typography>
                    {
                        props.isHr ?
                            <Typography className={classes.pos} color="textSecondary">{'Code: ' + props.advertData.id + ', ' + hrMessage}</Typography>
                            :
                            null
                    }
                    <Typography component="p">
                        {description.length > 250 ? description.substring(0, 250) + '...' : description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button component={Link} to={{pathname: detailPath, state: { advert: props.advertData} }} size="small" color="primary">
                        Learn More
                    </Button>
                </CardActions>
            </Card>
    );
}

Advert.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Advert);