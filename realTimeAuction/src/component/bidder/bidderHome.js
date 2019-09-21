import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Appbar from '../Appbar/Appbar';
import { Paper, Card, CardHeader, Avatar, IconButton, CardMedia, List, ListItem, ListItemText, CardContent, Typography, Drawer } from '@material-ui/core'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { storage } from '../../firebaseConfige';
const drawerWidth = 240
const drawer = { open: false }
const useStyles = (theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),

        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(1),
        },

    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        },
        display: 'none',
        width: drawerWidth,
        marginTop: "64px",
    },
    root: {
        width: "60%",
        marginRight: "auto",
        marginLeft: "30%",
    },
    card: {
        marginRight: "auto",
        marginLeft: 'auto',
        marginTop: "20px",
        marginBottom: '20px',
        maxWidth: 345,
        margin: theme.spacing(2),
    },
    media: {
        height: 190,
    },
}))
class BidderHomePAge extends React.Component {
    constructor() {
        super()
        this.state = {
            category: ""
        }
    }
    postingImg = (img)=>{
        console.log(img)
        storage.refFromURL(img).getDownloadURL().then((res)=>{
            console.log(res)
        })
    }
    render() {
        
        const category = ['TV', 'Mobile', 'AirConditioner', 'Refrigirator', 'Camera', 'Bike'];
        // this.props.match.params.id = this.state.category
        console.log(this.props.user)
        const { classes } = this.props
        return (
            <div>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={true}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    {/* <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider /> */}
                    <List>
                        {category.map((text, index) => (
                            <Link to={`/BiderHomePage/${text}`}> <ListItem button key={text}>
                                <ListItemText primary={text} />
                            </ListItem></Link>
                        ))}
                    </List>
                </Drawer>
                <Appbar />
                <main className={classes.content}>
                    <Paper className={classes.root}>
                        {this.props.user.usersPosts && this.props.match.params.id && this.props.user.usersPosts[this.props.match.params.id] ?
                            Object.values(this.props.user.usersPosts[this.props.match.params.id]).map((value,index) => {
                                console.log(value)
                                return (

                                    <Card className={classes.card}>
                                        <CardHeader
                                            avatar={
                                                (
                                                    <Avatar
                                                        alt="Ted talk"
                                                        src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
                                                    />
                                                )
                                            }
                                            action={
                                                <IconButton aria-label="settings">
                                                    {/* <MoreVertIcon /> */}
                                                </IconButton>
                                            }
                                            title={`${value.name} ${value.lname}`}
                                        // subheader={}
                                        />
                                        <CardContent>
                                            <Typography variant="body2" color="textSecondary" component="h4">
                                                {value.itemName}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                price : {value.price}
                                            </Typography>

                                            <Typography variant="body2" color="textSecondary" component="p">
                                                Detail : {value.Desciption}
                                            </Typography>

                                        {this.props.user.postImg ?
                                            this.props.user.postImg.items.map((img) => {
                                                value.imageFile.map((imgname)=>{
                                                    console.log(img.name ,imgname.name)
                                                    if(img.name === imgname.name){
                                                        console.log(img.toString())
                                                        this.postingImg(img.toString())
                                                    }
                                                    return <h1>hello</h1>
                                                })
                                            })
                                            : null}
                                        </CardContent>
                                        <CardMedia
                                            className={classes.media}

                                            image="https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512"
                                            title="Ted talk"
                                        />


                                    </Card>
                                )
                            }) : null}
                    </Paper>
                </main>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state,
    }
}

export default connect(
    mapStateToProps,
)(withStyles(useStyles)(withRouter(BidderHomePAge)));