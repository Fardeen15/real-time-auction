import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Appbar from '../Appbar/Appbar';
import AuctionerForm from '../auctionerForm/Form';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Button, Grow, Zoom, Slide, Collapse } from '@material-ui/core';
import img from './images/baner.png'
import img2 from './images/baner2.png'
import slider1 from './images/Slider1.png'
import slider2 from './images/Slider2.png'
import slider3 from './images/slider3.png'
import slider4 from './images/slider4.png'
import { Carousel, Modal, BackTop } from 'antd';
import { auth } from '../../firebaseConfige';
import { GetData } from '../../action/action';
const useStyles = (theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(1),
        },
    },
    root: {
        // padding: theme.spacing(3, 3),
        // width: "%",
        height: "50vh",
        [theme.breakpoints.down('sm')]: {
            height: "35vh",
        },
    },
    root2: {
        padding: theme.spacing(3, 3),
        // height: "40vh",
        marginTop: "10px"
    },
    root3: {
        padding: theme.spacing(3, 3),
        height: "70vh",
        [theme.breakpoints.down('sm')]: {
            height: "90vh",

        },
        marginTop: "10px"
    },
    iconDiv: {
        width: "25%",
        paddingTop: "20px",
        paddingBottom: "20px",
        [theme.breakpoints.down('sm')]: {
            width: "50%"
        },
    },
    detailImageDiv1: {
        display: "inline",
        float: "left",
        width: "49%",
        [theme.breakpoints.down('sm')]: {
            display: "block",
            width: "100%"
        },
    },
    detailImageDiv2: {
        display: "inline",
        float: "right",
        width: "49%",
        [theme.breakpoints.down('sm')]: {
            display: "block",
            width: "100%"
        },
    },
    detailParaDiv: {
        display: "inline",
        float: "right",
        width: "39%",
        [theme.breakpoints.down('sm')]: {
            display: "block",
            width: "100%"
        },
    },

    detailParaDiv1: {
        display: "inline",
        float: "left",
        width: "39%",
        textAlign: "right",
        [theme.breakpoints.down('sm')]: {
            display: "block",
            width: "100%"
        },
    },
    para: {
        fontSize: "20px",
        [theme.breakpoints.down('sm')]: {
            fontSize: "15px",
        }
    },
    choseBtn: {
        width: " 20%",
        height: 60,
        margin: "25px",
        [theme.breakpoints.down('sm')]: {
            width: "90%",
            margin: "10px",
        }
    },
    sliderImg: {
        height: "50vh",
        width: "100%",
        [theme.breakpoints.down('sm')]: {
            height: "35vh",
        },
    }
}));
var checked = true
class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            user: false,
        }
    }
    error = () => {
        var user = true
        Modal.error({
            title: 'This is an error message',
            content: 'Please LogIn Or SignUp To use This App',
            onOk() {
                user = false
            },
        })
        if (!user)
            this.setState({
                user: user
            })

    }
    checkauth = () => {
        auth.onAuthStateChanged((user) => {
            if (!user) {
                this.setState({
                    user: true
                })
            } else {
                this.props.history.push('/AuctionForm')
            }
        })
    }
    checkauth2 = () => {
        auth.onAuthStateChanged((user) => {
            if (!user) {
                this.setState({
                    user: true
                })
            } else {
                this.props.history.push('/AuctionForm')
            }
        })
    }

    componentWillMount() {
        console.log(this.props)
        this.props.GetData()
    }
    render() {
        const { classes } = this.props
        return (
            <div style={{ width: "100%" }}>
                <Appbar />
                <main className={classes.content} >
                    <Grow
                        in={checked}
                        style={{ transformOrigin: '0 0 0' }}
                        {...(checked ? { timeout: 1000 } : {})}
                    >
                        <Paper className={classes.root}>
                            <Carousel effect="fade" autoplay>
                                <div>
                                    <img className={classes.sliderImg} src={slider1} />
                                </div>
                                <div>
                                    <img className={classes.sliderImg} src={slider2} />
                                </div>
                                <div>
                                    <img className={classes.sliderImg} src={slider3} />
                                </div>
                                <div>
                                    <img className={classes.sliderImg} src={slider4} />
                                </div>
                            </Carousel>
                        </Paper>
                    </Grow>
                    <Zoom in={checked} >
                        <Paper elevation={4} className={classes.root2}>
                            <div style={{ height: "10vh" }}></div>
                            <Typography style={{ textAlign: "center" }} variant="h4" component="h3">
                                Be the host with the most
                        </Typography>
                            <Typography style={{ textAlign: "center" }} component="p">
                                From golf tournaments to galas, conferences to carnivals, organizations across the board turn to Handbid for higher revenues and superior customer service at an affordable rate.
                         </Typography>
                            <div className="iconsMAinDiv">

                                <div className={classes.iconDiv}>
                                    {/* <i className="fas fa-truck icon"></i>  */}
                                    <i className="fas fa-hand-holding-usd" id="icon"></i>
                                    <br />
                                    No profit
                         </div>
                                <div className={classes.iconDiv}>
                                    <i className="fas fa-truck " id="icon"></i> <br />
                                    Fast Deleivary & cash On Deleivary
                         </div>
                                <div className={classes.iconDiv}>
                                    <i className="fas fa-running " id="icon"></i> <br />
                                    Sports Orgs
                         </div>
                                <div className={classes.iconDiv}>
                                    <i className="fas fa-handshake " id="icon"></i><br />
                                    Faith Based Orgs
                         </div>
                            </div>
                            <Typography style={{ textAlign: "center" }} variant="div" component="h3">
                                <Button variant="outlined" color="inherit" onClick={this.checkauth} className={classes.choseBtn}>Auctioner</Button> <Button variant="outlined" color="inherit" onClick={this.checkauth} className={classes.choseBtn}>Fundraisers</Button>
                            </Typography>
                        </Paper>
                    </Zoom>
                    <Zoom in={checked}>

                        <Paper className={classes.root3}>
                            <div>

                                <div className={classes.detailImageDiv1}>
                                    <img style={{ width: "100%" }} src={img} />
                                </div>
                                <div className={classes.detailParaDiv}>
                                    <h1>Auctions accessible from anywhere</h1>
                                    <p className={classes.para} >
                                        Bidders can bid in your auction from the app, the web interface, or from tablets at your event. You can manage items, checkin, and checkout from anywhere with ease.
                            </p>
                                </div>
                            </div>
                        </Paper>
                    </Zoom>
                    <Paper className={classes.root3}>
                        <div>

                            <div className={classes.detailImageDiv2}>
                                <img style={{ width: "100%" }} src={img2} />
                            </div>
                            <div className={classes.detailParaDiv1}>
                                <h1>Fundraise in Style!</h1>
                                <p className={classes.para} >
                                    Go beyond auctions and events and reach donors through interactive crowd-funding and peer-to-peer fundraising tools! All integrated with Handbid’s auctions and events.                            </p>
                            </div>
                        </div>
                    </Paper>
                   
                        <BackTop style={{background : 'black' , borderRadius: "50px",}}/>
                    
                    {this.state.user ?
                        this.error() : null}
                </main>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
        userPost: state.UsersPost
    }
}
const mapDispatchToProps = { GetData }


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(useStyles)(withRouter(Home)));
