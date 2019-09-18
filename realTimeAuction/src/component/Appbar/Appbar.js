import React, { Children } from 'react'
import { fade, withStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { IconButton, Typography, Button, Drawer, Divider, List, ListItem, ListItemText, Slide, TextField } from '@material-ui/core';
import { Select, Modal, message } from 'antd';
import SignUp from '../../signup/signUp';
import { auth, db } from '../../firebaseConfige';
const { Option } = Select;

const drawerWidth = 240;
const Styles = theme => ({
    Appbar: {
        background: "#255a68",
        // position : "fixed"
    },
    searchParent: {
        padding: 10,
    },
    grow: {
        flexGrow: 1,
        height: "5vh",
    },
    inputRoot: {
        color: 'white',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    title: {
        // display: 'none',
        // [theme.breakpoints.up('sm')]: {
        display: 'block',
        // },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sectionDesktop: {
        // display: 'none',
        width: "10%",
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
        },
    },
    search: {
        position: 'relative',
        // padding  : 10,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
    },
    NavBtn: {
        border: "none",
        background: "transparent",
        height: "6vh",
        width: "20%",
        borderRadius: 0,
        // borderRight: "1px solid #1c1d1e",
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    btn: {
        width: "70%"
    },
    inpt: {
        width: "70%"
    }
});
let checked = true

class Appbar extends React.Component {
    constructor() {
        super()
        this.state = {
            logIn: false,
            SignUP: false,
            email: "",
            password: ""
        }
    }
    close = () => {
        this.setState({
            SignUP: !this.state.SignUP
        })
    }
    Change = (ev, val) => {
        this.setState({
            [val]: ev.target.value
        })
    }
    submit = () => {
        auth.signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
            this.setState({
                email: "",
                password: "",
                logIn: false
            }, () => {
                message.success('LogIn successfull')
                // this.showConfirm().destroy()
            })
        })
    }
    showConfirm = () => {
        var modal ;
        if (this.state.logIn) {

             modal = Modal.success({
                title: 'Log In Form',
                content: <div>
                    <TextField
                        className={this.props.classes.inpt}
                        id="outlined-adornment-password"
                        variant="outlined"
                        defaultValue={this.state.email}
                        type='email'
                        label="Email"
                        onChange={(ev) => this.Change(ev, 'email')}

                    /><br /><br />
                    <TextField
                        id="outlined-adornment-email"
                        className={this.props.classes.inpt}
                        defaultValue={this.state.password}
                        variant="outlined"
                        type='password'
                        label="Password"
                        onChange={(ev) => this.Change(ev, 'password')}

                    /><br />
                    <br />

                    <Button className={this.props.classes.btn} onClick={this.submit} variant="contained" color="primary">LogIn</Button><br />
                    or <Button color="primary" onClick={this.close}>Rigestred now</Button>
                </div>,
                okText: "Cancel",
                // onCancel:()=>{
                // }
            });
        }
        if (this.state.logIn === false) {

            setTimeout(() => {
                //   clearInterval(timer);
                modal.destroy();
            }, 1000)
        }
    }
    componentWillMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                db.ref().child('user').child(user.uid).child('Pinfo').on('value', (snap) => {
                    console.log(snap.val())
                })
            }
        })
    }
    render() {
        const { classes } = this.props;
        return (
            <div>

                <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
                    <div className={classes.grow}>

                        <AppBar className={classes.Appbar}>
                            <Toolbar>
                                <Typography className={classes.title} variant="h6" noWrap>
                                    Material-UI
                            </Typography>
                                <div className={classes.grow} />
                                {/* <div className={classes.searchParent}>

                                <div className={classes.search}>
                                    <div className={classes.searchIcon}>
                                        <SearchIcon />
                                    </div>
                                    <InputBase
                                        placeholder="Search…"
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput,
                                        }}
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </div>
                            </div> */}
                                <div className={classes.grow} />
                                <div className={classes.sectionDesktop}>
                                    <Button className={classes.NavBtn} onClick={() => {
                                        this.setState({
                                            logIn: !this.state.logIn
                                        }, () => {

                                            this.showConfirm()
                                        })

                                    }}>LogIn</Button>
                                </div>
                            </Toolbar>

                        </AppBar>

                    </div>

                </Slide>
                {this.state.SignUP ?
                    <SignUp handleClose={this.close} SignUP={this.state.SignUP} />
                    : null}
            </div>

        )
    }
}
export default withStyles(Styles)(Appbar);
