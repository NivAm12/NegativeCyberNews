import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      marginBottom: "15px"
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

export default function ArticleCard({article}) {

    const classes = useStyles()

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {article.title}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {article.date}
                </Typography>
                <Typography variant="body2" component="p">
                    {article.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" color="primary" size="small" href={article.link} target="_blank">Read More</Button>
            </CardActions>
        </Card>
    )
}

