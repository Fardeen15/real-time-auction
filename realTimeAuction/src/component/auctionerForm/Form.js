import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Appbar from '../Appbar/Appbar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Stepper, Step, StepLabel, Typography, Button, Paper, Slide, Fab } from '@material-ui/core';
import { Input, Icon, DatePicker, Upload, Modal, Select, message } from 'antd';
import { storage, auth, db } from '../../firebaseConfige';
import { add } from '../../action/action';
const Option = Select.Option
const useStyles = (theme => ({
    content: {
        textAlign: 'center',
        flexGrow: 1,
        padding: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(1),
            paddingTop: theme.spacing(3)
        },
    },
    loginForm: {
        [theme.breakpoints.down('sm')]: {
            width: "70%",
            top: "26%",
            left: "13%",
        },
        width: "40%",
        position: "relative",
        top: "33%",
        left: "29%",
    },
    loginForm2: {
        [theme.breakpoints.down('sm')]: {
            width: "70%",
            top: "6%",
            left: "13%",
        },
        width: "40%",
        position: "relative",
        top: "22%",
        left: "29%",
    },

    paper: {
        height: "90vh"
    },
    fab: {
        position: "absolute",
        left: "5%",
        top: "13%",
        [theme.breakpoints.down('sm')]: {
            height: "7vh",
            width: "13%",
        },

    },
    Footer: {
        position: "fixed",
        [theme.breakpoints.down('sm')]: {
            width: "90%",
            left: "5%"
        },
        width: "70%",
        top: "60%",
        left: "13%",

    },
    inpt: {
        margin: "10px"
    }
}))
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
class AuctionerForm extends React.Component {
    constructor() {
        super()
        this.state = {
            previewVisible: false,
            previewImage: '',
            activeStep: 0,
            email: "",
            password: "",
            itemName: "",
            Desciption: "",
            categeroy: "Choose Category",
            price: "",
            bidEndDate: "",
            fileList: "",
            url: ""
        }
    }
    Change = (ev, val) => {
        if (val === 'bidEndDate') {
            var date = ev.format().slice(0, 10)
            this.setState({
                [val]: date
            })
        } else if (val === 'categeroy') {
            this.setState({
                [val]: ev
            })
        }
        else {
            this.setState({
                [val]: ev.target.value
            })
        }
    }
    handleNext = () => {
        this.setState({
            activeStep: this.state.activeStep + 1
        })
    }

    handleBack = () => {
        this.setState({
            activeStep: this.state.activeStep - 1
        })
    }

    handleReset = () => {
        this.setState({
            activeStep: 0
        })
    }
    upload = () => {
        auth.onAuthStateChanged((user) => {
            if (user && this.props.user) {
                var uid = user.uid
                var pp = this.props.user.user
                var pinfo = uid.Pinfo
                var data = `${pp}.${pinfo}.name`
                console.log()
                var obj = {
                    name : this.props.user[uid].Pinfo.name,
                    lname : this.props.user[uid].Pinfo.lname,
                    uid: user.uid,
                    itemName: this.state.itemName,
                    Desciption: this.state.Desciption,
                    categeroy: this.state.categeroy,
                    price: this.state.price,
                    bidEndDate: this.state.bidEndDate,
                    imageFile : this.state.fileList
                }
                if (obj.itemName && obj.Desciption && obj.categeroy && obj.price && obj.bidEndDate && obj.imageFile) {
                    this.props.add(obj)
                    message.success('Your Post Request Send')
                    this.setState({
                        itemName: "",
                        Desciption: "",
                        categeroy: "",
                        price: "",
                        bidEndDate: "",
                    }, () => {
                        this.props.history.push('/')
                    })
                } else {
                    message.error('Please filled All Field Correctly')
                    // console.log(this.props)
                }
            }
        })
    }
    getStepContent = (step) => {
        switch (step) {
            case 0:
                return 'PLease Enter Your Details';
            case 1:
                return 'Please Enter Item Details ';
            case 2:
                return 'Please Upload Item Pictures';
            default:
                return 'Unknown step';
        }
    }
    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };
    handleChange = ({ fileList }) => {
        this.setState({
            fileList,
            url: fileList[0].name
        })
    };
    render() {
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const category = ['TV','Mobile','Air Conditioner', 'Refrigirator' , 'Camera', 'Bike'];
        let steps = [1, 2, 3]
        const { classes } = this.props
        return (
            <div>
                <Appbar />
                <main className={classes.content}>
                    <Link to="/"> <Fab color="primary" aria-label="add" className={classes.fab}>
                        <ArrowBackIcon />
                    </Fab></Link>
                    <Paper className={classes.paper}>
                        <div className={this.state.activeStep === 1 ? classes.loginForm2 : classes.loginForm}>

                            {this.state.activeStep === 0 ?
                                <div >
                                    <h3>{this.getStepContent(this.state.activeStep)}</h3>
                                    <Input
                                        value={this.state.email}
                                        className={classes.inpt}
                                        onChange={(ev) => this.Change(ev, 'email')}
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Email"
                                    /><br />
                                    <Input
                                        value={this.state.password}
                                        className={classes.inpt}
                                        onChange={(ev) => this.Change(ev, 'password')}
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="Password"
                                    />,
                                </div>
                                : this.state.activeStep === 1 ?
                                    <div >
                                        <h3>{this.getStepContent(this.state.activeStep)}</h3>
                                        <Input
                                            value={this.state.itemName}
                                            className={classes.inpt}
                                            onChange={(ev) => this.Change(ev, 'itemName')}
                                            prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="Item name"
                                        />
                                        <Select
                                            showSearch
                                            className={classes.inpt}
                                            value={this.state.categeroy}
                                            style={{ width: "100%" }}
                                            onChange={(ev) => this.Change(ev, 'categeroy')}
                                        >
                                            {
                                                category.map((value)=>{
                                                    return <Option key = {value} value={value}>{value}</Option>
                                                })
                                            }
                                            
                                        </Select>
                                        <Input
                                            value={this.state.Desciption}
                                            className={classes.inpt}

                                            onChange={(ev) => this.Change(ev, 'Desciption')}
                                            prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="Item Description'"
                                        />
                                        <Input
                                            value={this.state.price}
                                            className={classes.inpt}
                                            type='number'
                                            onChange={(ev) => this.Change(ev, 'price')}
                                            prefix={<Icon type="dollar" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="Price"
                                        />
                                        <DatePicker
                                            defaultPickerValue={this.state.bidEndDate}
                                            className={classes.inpt}
                                            onChange={(ev) => this.Change(ev, 'bidEndDate')}
                                            placeholder="Select Bid End Date"
                                        />,
                                </div>
                                    : this.state.activeStep === 2 ?
                                        <div className="clearfix">
                                            <h3>{this.getStepContent(this.state.activeStep)}</h3>

                                            <Upload
                                                listType="picture-card"
                                                fileList={this.state.fileList}
                                                onPreview={this.handlePreview}
                                                onChange={this.handleChange}
                                            >
                                                {this.state.fileList.length >= 4 ? null : uploadButton}
                                            </Upload>
                                            <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                                                <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
                                            </Modal>
                                        </div>
                                        : null}
                            <div className={classes.Footer}>

                                <Stepper alternativeLabel activeStep={this.state.activeStep} >

                                    {steps.map(label => (
                                        <Step key={label}>
                                            <StepLabel >{label}</StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>
                                <div>
                                    {this.state.activeStep === steps.length ? (
                                        <div>
                                            <Typography className={classes.instructions}>
                                                All steps completed - you&apos;re finished
                                        </Typography>
                                            <Button onClick={this.handleReset} className={classes.button}>
                                                Reset
                                    </Button>
                                        </div>
                                    ) : (
                                            <div>
                                                <Typography className={classes.instructions}>{this.getStepContent(this.state.activeStep)}</Typography>
                                                <div>
                                                    <Button disabled={this.state.activeStep === 0} onClick={this.handleBack} className={classes.button}>
                                                        Back
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={this.state.activeStep === steps.length - 1 ? this.upload : this.handleNext}
                                                        className={classes.button}
                                                    >
                                                        {this.state.activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                </div>
                            </div>
                        </div>

                    </Paper>
                </main>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
const mapDispatchToProps = { add }
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(useStyles)(withRouter(AuctionerForm)));
