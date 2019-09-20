import React from 'react'
import { withStyles} from '@material-ui/core/styles';
import { Paper } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
const useStyles = (theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(1),
        },
    },
}))
class Profile extends React.Component {
    render() {
        const { classes } = this.props
        return (
            <main className = {classes.content}>
                <Paper>
                    <h1>Profile</h1>
                </Paper>
            </main>
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
