import React from 'react'
import { Dialog, AppBar, Toolbar, IconButton, Paper, TextField, Button, Typography } from '@material-ui/core';
import { fade, withStyles, useTheme } from '@material-ui/core/styles';
import { Upload, Icon, message } from 'antd';
import CloseIcon from '@material-ui/icons/Close';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import zIndex from '@material-ui/core/styles/zIndex';
import { auth, db, storage } from '../firebaseConfige';
const Styles = theme => ({
    content: {
        flexGrow: 1,
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(5),
        },
        padding: theme.spacing(3),
        background: " linear-gradient(to bottom, #000000 0%,#46878c 100%)",
    },
    title: {
        color: 'white'
    },
    FromPaper: {
        textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
            paddingTop: "42%",
            width: "100%",
            // height: "100vh",
        },
        width: "50%",
        // height: "60vh",
        padding: "24px 24px",
        marginTop: "10px",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: " translate(-50%, -50%)",
    },
    input: {
        display: 'none',
    },
    btn: {
        width: "70%"
    },
    inpt: {
        width: "70%"
    }
})
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
class SignUp extends React.Component {
    constructor() {
        super()
        this.state = {
            url : "",
            loading: false,
            imageUrl: "",
            name: "",
            lname: "",
            email: "",
            password: "",
            number: "",
            city: ""
        }
    }
    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    url : info.file.originFileObj,
                    loading: false,

                }),
            );
        }
    };
    onChnage = (ev, val) => {
        console.log(ev.target.value)
        this.setState({
            [val]: ev.target.value
        })
    }
    submit = () => {
        
        var obj = {
            name: this.state.name,
            lname: this.state.lname,
            email: this.state.email,
            passward: this.state.password,
            number: this.state.number,
            city: this.state.city,
            // image: this.state.imageUrl
        }
        if (obj.name && obj.lname && obj.email && obj.passward && obj.number && obj.city) {
            if (obj.number.length === 11) {
                auth.createUserWithEmailAndPassword(obj.email, obj.passward).then(() => {
                    auth.onAuthStateChanged((user) => {
                        if (user) {

                            db.ref().child('wholeData').child('user').child(user.uid).child('Pinfo').set(obj).then(() => {
                                storage.ref(`profileImages/${user.uid}`).put(this.state.url)
                                auth.signOut().then(() => {
                                    message.success('successfully SignUP please go and SignIn Thank You !')
                                    this.props.handleClose()

                                })
                            })
                        }
                    })
                }).catch((error) => {
                    message.error(error.message)
                })
            } else {
                message.error('please check number limit')
            }
        } else {
            message.warning('please Check input filled')
            console.log(this.state.url)
        }
    }
    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        const { classes } = this.props
        return (
            // <div>
            <Dialog fullScreen open={true} onClose={this.props.handleClose} >
                <AppBar style={{ background: "#255a68", }} >
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={this.props.handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography className={classes.title} variant="h4" noWrap>
                            SignUp Form
                            </Typography>
                    </Toolbar>
                </AppBar>
                <main className={classes.content}>
                    <Paper className={classes.FromPaper} >
                        <form>
                            <Upload
                                name="avatar"
                                // style={{ textAlign: 'center', display: ' inline-block' }}
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                // beforeUpload={beforeUpload}
                                onChange={this.handleChange}
                            >
                                {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" style={{
                                    width: '100%',
                                    borderRadius: "50%",
                                    height: "16vh",
                                }} /> : uploadButton}
                            </Upload>

                            <TextField
                                className={classes.inpt}
                                id="standard-name"
                                label="Name"
                                margin="normal"
                                onChange={(ev) => this.onChnage(ev, 'name')}
                            /><br />
                            <TextField
                                className={classes.inpt}
                                id="standard-name"
                                label="Last Name"
                                margin="normal"
                                onChange={(ev) => this.onChnage(ev, 'lname')}
                            /><br />
                            <TextField
                                className={classes.inpt}
                                id="standard-name"
                                type='email'
                                label="Email"
                                margin="normal"
                                onChange={(ev) => this.onChnage(ev, 'email')}
                            /><br />
                            <TextField
                                className={classes.inpt}
                                id="standard-name"
                                type='password'
                                label="passward"
                                margin="normal"
                                onChange={(ev) => this.onChnage(ev, 'password')}
                            /><br />
                            <TextField
                                className={classes.inpt}
                                id="standard-name"
                                type='number'
                                label="Number"
                                margin="normal"
                                onChange={(ev) => this.onChnage(ev, 'number')}
                            /><br />
                            <TextField
                                className={classes.inpt}
                                id="standard-name"
                                label="City"
                                margin="normal"
                                onChange={(ev) => this.onChnage(ev, 'city')}
                            /><br />
                            <Button variant="outlined" color="inherit" className={classes.btn} onClick={this.submit}>SignUP</Button>
                        </form>
                    </Paper>
                </main>

            </Dialog>
            // </div>
        );
    }
}
export default withStyles(Styles)(SignUp)

