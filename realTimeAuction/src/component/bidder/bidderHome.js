import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Appbar from '../Appbar/Appbar';
import { Paper, Card, CardHeader, Avatar, IconButton, CardMedia, List, Tooltip, ListItem, ListItemText, CardContent, Typography, Drawer, TextField, Fab } from '@material-ui/core'
import { withRouter, Link } from 'react-router-dom'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import SendIcon from '@material-ui/icons/Send';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { connect } from 'react-redux'
import { storage, auth } from '../../firebaseConfige';
import { update } from '../../action/action';
import { Button, Select } from 'antd';
const Option = Select.Option
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
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
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
        [theme.breakpoints.up('sm')]: {
            // display: 'block'
            width: "60%",
            marginRight: "auto",
            marginLeft: "30%",
        },
    },
    root1: {
        // width: "60%",
        // marginRight: "auto",
        // marginLeft: "30%",
        [theme.breakpoints.up('sm')]: {
            display: 'none'
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
}))
class BidderHomePAge extends React.Component {
    constructor() {
        super()
        this.state = {
            category: "",
            url: "",
            img: true,
            keys: "",
            comment: "",
            callfn: "",
            category : "select Category",
            imgUrls: []
        }
    }
    postingImg = (img) => {
        var imgarr = []
        console.log(this.state.url)

        storage.refFromURL(img).getDownloadURL().then((res) => {
            imgarr.push(res)
        })
        if (imgarr.length) {
            this.setState({
                url: imgarr
            }, () => {
                console.log(this.state.url)
            })
        }
    }
    comment = (index, value) => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                var Pinfo = this.props.user.user[user.uid].Pinfo
                Pinfo.userUid = user.uid

                var data = value
                if (!data.comment) {
                    data.comment = []
                    Pinfo.comment = this.state.comment
                    update(this.state.keys[index], this.props.match.params.id, data, Pinfo)
                    this.setState({
                        comment: ""
                    })
                } else {
                    Pinfo.comment = this.state.comment
                    update(this.state.keys[index], this.props.match.params.id, data, Pinfo)
                    this.setState({
                        comment: ""
                    })
                }
            }

        })

    }

    componentWillReceiveProps(nextProps) {
        console.log(this.props.user)
        if (nextProps.user.usersPosts) {
            // console.log("ashd")
            if (this.props.user && nextProps.user.usersPosts && nextProps.user.usersPosts[this.props.match.params.id]) {
                this.setState({
                    keys: Object.keys(nextProps.user.usersPosts[this.props.match.params.id])
                }, () => {
                    console.log(this.state.keys)
                })
            } else {
                console.log(false)


            }
        }
    }
    // profileimage = (img, uid) => {
    //     // console.log(img)


    //     if (img) {
    //      let url = storage.refFromURL(img).getDownloadURL().then((res) => {
    //             // url = res
    //             // console.log(url)
    //             return res
    //         })
    //         if(url !== undefined){
    //             console.log(url)
    //             return url
    //         }
    //     }
    //     // setTimeout(() => {
    //     //     if (url) {

    //     //         console.log(url)
    //     //         // this.profileimg(uid)
    //     //         return url

    //     //     }
    //     // }, 3000)

    // }
    // profileimg = (uid) => {
    //     let img

    //     let name = this.props.user.ProfileImages.items.find((item) => {

    //         return item.name === uid
    //     })
    //     if (name) {
    //         storage.refFromURL(name.toString()).getDownloadURL().then((res) => {
    //             img = res
    //         })
    //         // img = this.profileimage(name.toString(), uid)
    //         setTimeout(() => {
    //             console.log(img)
    //             return img
    //             //     console.log(this.profileimage(name.toString(), uid))
    //             //     if (img) {
    //             //         console.log(img)
    //             //     }
    //             //     return img
    //         }, 5000)
    //     }
    //     // setTimeout(() => {
    //     //     if (img) {
    //     //         console.log(img.i)
    //     //         return img.i
    //     //     } else {
    //     //         console.log(img)
    //     //     }
    //     // }, 5000)

    // }
    // componentDidMount() {


    // }

    // Profileimg = (uid) => {
    //     let name = this.props.user.ProfileImages.items.find((item) => {
    //         return item.name === uid
    //     })
    //     if (name) {
    //         this.geturl(name.toString())
    //     }
    // }
    // geturl = (name) => {
    //     let url;
    //     if (name) {
    //         url = storage.refFromURL(name.toString()).getDownloadURL().then((res) => {
    //             console.log(res)
    //             return res
    //         })
    //     }
    //     setTimeout(() => {
    //         if (url) {

    //             console.log(url.i)
    //             return url.i
    //         }
    //     }, 5000)
    // }
    componentDidMount(){
        if(this.props.user.usersPosts && this.props.match.params.id && this.props.user.usersPosts[this.props.match.params.id]){
            var data = Object.values(this.props.user.usersPosts[this.props.match.params.id])
            for (let i = 0; i < data.length; i++){
                if(data[i].comment){
                    console.log(Object.values(data[i].comment))
                }
            }
        }
    }
    render() {

        const category = ['TV', 'Mobile', 'AirConditioner', 'Refrigirator', 'Camera', 'Bike'];
        // this.props.match.params.id = this.state.category
        // console.log(this.props.user)
        if(this.state.category !== "select Category"){
            // console.log(this.state.category)
            this.props.match.params.id = this.state.category
        }

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
                    <Paper style={{ background: "none", paddingTop: "7%" }} className={classes.root1}>

                        <Select
                            showSearch
                            value={this.state.category}
                            style={{ width: "100%" }}
                            onChange={(ev) => this.setState({
                                category: ev
                            })}
                            placeholder="Select a person"
                            optionFilterProp="children"
                        >
                            {
                                category.map((value) => {
                                    return <Option key={value} value={value}>{value}</Option>
                                })
                            }
                        </Select>
                    </Paper>
                    <Paper className={classes.root}>
                        {this.props.user.usersPosts && this.props.match.params.id && this.props.user.usersPosts[this.props.match.params.id] ?
                            Object.values(this.props.user.usersPosts[this.props.match.params.id]).map((value, index) => {
                            
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
                                            image={this.state.url[0] ? this.state.url[0] : "https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512"}
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
                                                    <Typography className={classes.heading}>{value.comment?Object.values(value.comment).length : 0 } Bidding </Typography>
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
                                                                                    // src={this.geturl() ? this.geturl() : ""}

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
                            }) : null}
                    </Paper>
                </main>
            </div >
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