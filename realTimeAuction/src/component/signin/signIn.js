import React from 'react'
import { Paper, TextField, InputAdornment, IconButton } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { withStyles } from '@material-ui/core/styles';
const useStyles = (theme => ({

    root: {
        [theme.breakpoints.down('sm')]: {
            width: "70%",
            height: "50vh",
        },
        width: "50%",
        height: "40vh",
        padding: "24px 24px",
        marginTop: "10px",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: " translate(-50%, -50%)",
    },
}))

class SignIN extends React.Component {

    render() {
        const { classes } = this.props
        return (
            <main>
                <Paper className={classes.root}>
                    <TextField
                        id="outlined-adornment-password"
                        // className={clsx(classes.margin, classes.textField)}
                        variant="outlined"
                        type='password'
                        label="Password"
                    // value={values.password}
                    // onChange={handleChange('password')}

                    />
                    <TextField
                        id="outlined-adornment-password"
                        variant="outlined"
                        type='email'
                        label="Email"
                    // value={values.password}
                    // onChange={handleChange('password')}

                    />
                </Paper>
            </main>

        )
    }
}
export default withStyles(useStyles)(SignIN)