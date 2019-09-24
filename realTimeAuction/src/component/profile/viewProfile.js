import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import {
    Paper, Button, Card, CardHeader,
    CardContent,
    Typography,
    CardMedia,
    // CardContent,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    TextField

} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SendIcon from '@material-ui/icons/Send';
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Appbar from '../Appbar/Appbar';
import CoverImg from '../images/cover.png'
import { Avatar, Empty } from 'antd';
import { auth, storage } from '../../firebaseConfige';

const useStyles = (theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            paddingTop: "8%",
            padding: theme.spacing(1),
        },
    },
    root: {
        [theme.breakpoints.up('sm')]: {
            // display: 'block'
            // width: "60%",
            // marginTop: "5%",
            // marginLeft: "auto",
        },
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
    ProfileAvatar: {
        [theme.breakpoints.up('sm')]: {
            width: "200px",
            height: "200px",
            left: 0,
            transform: "translate(-0%, 0)",

        },
        width: "100px",
        height: "100px",
        position: "relative",
        top: "7%",
        left: "50%",
        transform: "translate(-50%, 46%)",
    },
    CoverImg: {
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        marginTop: "7px",
        height: "24vh",
        backgroundImage: `url(${CoverImg})`
    },
    BodyPaper: {
        display: "flex",
        marginTop: "12px",
    },
    sidePaper: {
        height: "60vh",
        width: "26%",
    },
    middlePaper: {

        width: "74%",
        overflowY: "scroll",
        maxHeight: "60vh",
    }
}))
class Profile extends React.Component {
    constructor() {
        super()
        this.state = {
            url: "",
            callfn: true,
            uid: ""
        }
    }
    profileimage = (image) => {
        console.log(image)
        storage.refFromURL(image).getDownloadURL().then((url) => {
            console.log(url)
            this.setState({
                url
            })
        })
    }

    render() {
        auth.onAuthStateChanged((user) => {
            if (user) {

                if (this.props.user.ProfileImages.items && this.state.callfn) {
                    // console.log(Object.values(this.props.user.ProfileImages))
                    this.props.user.ProfileImages.items.forEach((item) => {
                        console.log(item.toString())

                        if (item.name === user.uid) {
                            this.profileimage(item.toString())
                            this.setState({
                                callfn: false,
                                uid: user.uid
                            })
                        }
                    })
                } else {
                    console.log(this.props.user.ProfileImages)

                }

            }
        })
        // const val = this.props.user.user[this.state.uid].Pinfo
        const category = ['TV', 'Mobile', 'AirConditioner', 'Refrigirator', 'Camera', 'Bike'];
        const { classes } = this.props
        // if () {

        //     let data;
        //     for (var i = 0; i < category.length; i++) {
        //         if () {

        //             data = 
        //             if (data) {

        //                 for (var j = 0; j < data.length; j++) {
        //                     console.log(data[j])
        //                 }
        //             }
        //         }
        //     }
        // }
        return (
            <div>
                <Appbar />
                <main className={classes.content}>
                    <Paper className={classes.root}>
                        <Link to="/"><Button>Back To home</Button></Link>
                    </Paper>
                    <Paper className={classes.CoverImg}>
                        <Avatar src={this.state.url ? this.state.url : ""} className={classes.ProfileAvatar} icon="user" />
                    </Paper>
                    <Paper className={classes.BodyPaper}>
                        <Paper className={classes.sidePaper}>
                            <h1 style={{ textAlign: 'center' }}>Yours Posts</h1>
                            {this.props.user && this.state.uid && this.props.user.user[this.state.uid] ?
                                this.props.user.user[this.state.uid].Pinfo ?
                                    //    console.log(value)
                                    // return(
                                    <div>
                                        <p>
                                            <b>Your Profile Name</b> : {this.props.user.user[this.state.uid].Pinfo.name} {this.props.user.user[this.state.uid].Pinfo.lname} <br />
                                        </p>
                                    </div>

                                    // )
                                    : null
                                : <Empty />}
                        </Paper>
                        <Paper className={classes.middlePaper}>
                            <h1 style={{ textAlign: 'center' }}>Yours Posts</h1>
                            {this.props.user.usersPosts ?
                                category.map((category) => {
                                    if (this.props.user.usersPosts[category]) {
                                        return Object.values(this.props.user.usersPosts[category]).map((value, index) => {
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
                                                        title={`${value.name} ${value.lname}`}
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

                                                        {/* {this.props.user.postImg ?
                                                this.props.user.postImg.items.map((img) => {
                                                    value.imageFile.map((imgname) => {
                                                        if (img.name === imgname.name) {
                                                            this.postingImg(img.toString())
                                                        }
                                                    })
                                                })
                                                : null} */}
                                                    </CardContent>
                                                    <CardMedia
                                                        className={classes.media}
                                                        image={"https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512"}
                                                        title="Ted talk"
                                                    />
                                                    <CardContent style={{
                                                        padding: "0px"
                                                    }}>
                                                        <ExpansionPanel style={{
                                                            marginTop: "auto",
                                                            width: "100%",
                                                        }}>
                                                            <ExpansionPanelSummary
                                                                expandIcon={<ExpandMoreIcon />}
                                                                aria-controls="panel1a-content"
                                                                id="panel1a-header"
                                                            >
                                                                <Typography className={classes.heading}>{value.comment ? Object.values(value.comment).length : 0} Bidding </Typography>
                                                            </ExpansionPanelSummary>
                                                            <ExpansionPanelDetails style={{ display: 'block' }}>
                                                                <div className="CommentBox">
                                                                    {
                                                                        value.comment ?
                                                                            Object.values(value.comment).map((cmt, i) => {
                                                                                // this.Profileimg(cmt.userUid)
                                                                                return (
                                                                                    <CardHeader
                                                                                        avatar={
                                                                                            <Avatar size='small'
                                                                                                src={""}

                                                                                                aria-label="recipe" className={classes.Fab} />}
                                                                                        title={`${cmt.name} ${cmt.lname}`}
                                                                                        subheader={cmt.comment}
                                                                                    />
                                                                                )
                                                                            })
                                                                            : null}
                                                                </div>
                                                                <p style={{ display: 'flex' }}>

                                                                    <TextField
                                                                        value={this.state.comment}
                                                                        onChange={(ev) => {
                                                                            this.setState({
                                                                                comment: ev.target.value
                                                                            })
                                                                        }}
                                                                        label="enter Bidding"
                                                                        style={{ width: "80%" }}
                                                                    /> <SendIcon style={{
                                                                        marginTop: "auto",
                                                                        width: "20%",
                                                                    }}
                                                                        onClick={() => this.comment(index, value)}
                                                                    />
                                                                </p>

                                                            </ExpansionPanelDetails>
                                                        </ExpansionPanel>
                                                    </CardContent>

                                                </Card>
                                            )
                                        })
                                    }
                                })
                                : <Empty />}
                        </Paper>
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
)(withStyles(useStyles)(withRouter(Profile)));

/* {this.props.user && this.state.uid && this.props.user.user[this.state.uid] && this.props.user.user[this.state.uid].Pposts ?
    Object.values(this.props.user.user[this.state.uid].Pposts).map((value, index) => {

        return (


        )
    }) : null} */