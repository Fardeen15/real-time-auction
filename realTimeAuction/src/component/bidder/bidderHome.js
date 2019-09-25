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
import { storage, auth, db } from '../../firebaseConfige';
import { update } from '../../action/action';
import { Button, Select, Carousel } from 'antd';
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
        height: 300,
    },
}))
class BidderHomePAge extends React.Component {
    constructor() {
        super()
        this.state = {
            category: "",
            url: "",
            imgUId: [],
            img: true,
            keys: "",
            comment: "",
            callfn: "",
            category: "select Category",
            imgUrls: [],
            postImgName: [],
            postImgUrl: [],
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
                var Pinfo2 = {
                    city: Pinfo.city,
                    comment: "",
                    email: Pinfo.email,
                    lname: Pinfo.lname,
                    name: Pinfo.name,
                    number: Pinfo.number,
                    passward: Pinfo.passward,
                    userUid: Pinfo.userUid
                }
                var data = value
                if (!data.comment) {
                    data.comment = []
                    Pinfo.comment = (Number(this.state.comment) / 100) * 90
                    update(this.state.keys[index], this.props.match.params.id, data, Pinfo)
                    this.setState({
                        comment: ""
                    })
                    let val = Object.values(this.props.user.user)
                    let key = Object.keys(this.props.user.user)
                    for (var i = 0; i < val.length; i++) {
                        if (val[i].Pinfo.category) {
                            console.log(key[i])
                            if (!val[i].Myprofit[user.uid]) {
                                Pinfo2.comment = (Number(this.state.comment) / 100) * 10
                                db.ref().child('wholeData').child('user').child(key[i]).child('Myprofit').child(user.uid).set(Pinfo2)
                            }
                        }
                    }
                } else {
                    // var percent = "10%"
                    Pinfo.comment = (Number(this.state.comment) / 100) * 90;
                    console.log(Pinfo)
                    update(this.state.keys[index], this.props.match.params.id, data, Pinfo)
                    let val = Object.values(this.props.user.user)
                    let key = Object.keys(this.props.user.user)
                    for (var i = 0; i < val.length; i++) {
                        if (val[i].Pinfo.category) {
                            console.log(key[i])
                            // if(!val[i].Myprofit[user.uid]){
                            Pinfo2.comment = (Number(this.state.comment) / 100) * 10;
                            db.ref().child('wholeData').child('user').child(key[i]).child('Myprofit').child(user.uid).set(Pinfo2)
                            // }
                        }
                    }
                    this.setState({
                        comment: ""
                    })
                }
            }

        })
    }

    componentWillReceiveProps(nextProps) {
        // console.log(this.props.user)
        if (nextProps.user.usersPosts) {
            // console.log("ashd")
            if (this.props.user && nextProps.user.usersPosts && nextProps.user.usersPosts[this.props.match.params.id]) {
                this.setState({
                    keys: Object.keys(nextProps.user.usersPosts[this.props.match.params.id])
                }, () => {
                    // console.log(this.state.keys)
                })
            } else {
                // console.log(false)


            }
        }
        if (nextProps) {

            if (this.props.user.usersPosts && this.props.match.params.id && this.props.user.usersPosts[this.props.match.params.id]) {
                this.setState({
                    imgUId: [],
                    postImgName: []
                }, () => {

                    let uid = this.state.imgUId;
                    var data = Object.values(this.props.user.usersPosts[this.props.match.params.id])
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].comment) {
                            var val = Object.values(data[i].comment);
                            for (let j = 0; j < val.length; j++) {
                                if (uid.length) {
                                    for (let u = 0; u < uid.length; u++) {
                                        if (uid[u] !== val[j].userUid) {
                                            uid.push(val[j].userUid)
                                        }
                                    }
                                } else {
                                    uid.push(val[j].userUid)

                                }
                            }
                        }
                        if (data[i].imageFile) {
                            var imageFile = data[i].imageFile
                            var imgName = this.state.postImgName
                            for (let j = 0; j < imageFile.length; j++) {
                                imgName.push(imageFile[j].name)
                            }
                            this.setState({
                                postImgName: imgName
                            }, () => {
                                console.log(this.state.postImgName)
                            })
                        }
                    }
                    if (uid.length) {
                        this.setState({
                            imgUId: uid
                        }, () => {
                            // console.log(this.state.imgUId)
                        })
                    }
                })

            }
            if (this.props.user.postImg && this.props.user.postImg.items && this.state.postImgName) {
                // var fake = 'https://firebasestorage.googleapis.com/v0/b/realtimeauctionapp.appspot.com/o/postImages%2FRefrigirator%2FsnDePt7jMeVycDMMUzhfCRoEU9P2%2F'
                // console.log(fake.length)
                this.setState({
                    postImgUrl: []
                }, () => {
                    let img = this.state.postImgName
                    let url;

                    for (let i = 0; i < img.length; i++) {
                        url = this.props.user.postImg.items.find((item, index) => {
                            return item.name === img[i]
                        })
                        if (url) {
                            var urlarr = this.state.postImgUrl
                            storage.refFromURL(url.toString()).getDownloadURL().then((res) => {
                                // console.log(res)
                                urlarr.push(res)
                            }).then(() => {

                                if (urlarr.length) {
                                    this.setState({
                                        postImgUrl: urlarr
                                    }, () => {
                                        // console.log(this.state.postImgUrl)

                                    })
                                }
                            })
                        }
                    }
                })
            }
            if (this.props.user.ProfileImages && this.props.user.ProfileImages.items && this.state.imgUId) {
                this.setState({
                    imgUrls: []
                }, () => {

                    var uids = this.state.imgUId
                    let name;
                    for (var i = 0; i < uids.length; i++) {
                        name = this.props.user.ProfileImages.items.find((item, index) => {
                            // console.log(item.name, uids[i])
                            return item.name === uids[i]
                        })
                        // console.log(name)
                        if (name) {
                            var imgarr = this.state.imgUrls
                            storage.refFromURL(name.toString()).getDownloadURL().then((res) => {
                                // console.log(res)
                                imgarr.push(res)
                            }).then(() => {

                                if (imgarr.length) {
                                    this.setState({
                                        imgUrls: imgarr
                                    }, () => {
                                        // console.log(this.state.imgUrls)
                                    })
                                }
                            })
                        }
                    }
                })
                // console.log(this.props.user.postImg)

            }
        }


    }
    geturl = (uid) => {
        let arr = this.state.imgUrls
        for (var i = 0; i < arr.length; i++) {
            // if (arr[i] === url) {
            var sort = arr[i].slice(93).split('?')
            for (var j = 0; j < sort.length; j++) {
                if (sort[j] === uid) {
                    return arr[i]
                }
            }
        }
    }
    getPostImgUrl = (uid) => {
        // console.log(uid)
        let arr = this.state.postImgUrl
        for (var i = 0; i < arr.length; i++) {
            // if (arr[i] === url) {
            var sort = arr[i].slice(136).split('?')
            // console.log(sort)
            for (var j = 0; j < sort.length; j++) {
                if (sort[j] === uid) {
                    // console.log(arr[i])
                    var obj = {
                        name: uid,
                        url: arr[i]
                    }
                    // console.log(obj)
                    return obj
                }
            }
        }
    }
    render() {

        const category = ['TV', 'Mobile', 'AirConditioner', 'Refrigirator', 'Camera', 'Bike'];
        // this.props.match.params.id = this.state.category
        // console.log(this.props.user)
        if (this.state.category !== "select Category") {
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
                            onChange={(ev) => {this.setState({
                                category: ev
                            })
                            this.props.history.push(`/BiderHomePage/${ev}`)
                        }}
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


                                        </CardContent>
                                        <CardMedia
                                            className={classes.media}
                                            title="Ted talk"
                                        >
                                            <Carousel autoplay>
                                                {value.imageFile ?
                                                    value.imageFile.map((imgName) => {
                                                        this.getPostImgUrl(imgName.name)
                                                        return (
                                                            this.getPostImgUrl(imgName.name) && this.getPostImgUrl(imgName.name).name === imgName.name ?
                                                                <div>
                                                                    <img style={{ maxHeight: "300px", maxWidth: "100%", marginLeft : 'auto', marginRight : "auto" }} src={this.getPostImgUrl(imgName.name).url} />
                                                                </div> :
                                                                this.getPostImgUrl(imgName.name)
                                                        )
                                                    })
                                                    : null}
                                            </Carousel>
                                        </CardMedia>
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
                                                                                    src={this.geturl(cmt.userUid) ? this.geturl(cmt.userUid) : ""}

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