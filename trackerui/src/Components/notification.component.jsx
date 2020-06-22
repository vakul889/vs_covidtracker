import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class Notification extends React.PureComponent {
    constructor(props){
        super(props)
        this.state = {
            open: false,
            severity: "",
            message: "",
            vertical: 'top',
            horizontal: 'center'
        }
    }
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({
            open: false
        });
    };

    componentDidMount(){
        setInterval(()=>{
            var severity = window.localStorage.getItem("severity");
            var message = window.localStorage.getItem("message");
            var redirect = window.localStorage.getItem("redirect");
            if(severity!==null && message!==null){
                this.setState({
                    severity: severity,
                    message: message,
                    open: true
                })
                window.localStorage.removeItem("severity");
                window.localStorage.removeItem("message")
                if(redirect !==null){
                    setTimeout(()=>{window.location.href = redirect},3000)
                }
                window.localStorage.removeItem("redirect")
            }
        },2000)
    }
    
    render(){
        if(this.state.severity!== ""){
            console.log("notify")
            return (
                <Snackbar anchorOrigin={{ vertical : "top", horizontal: "center" }} 
                    open={this.state.open} autoHideDuration={3000} onClose={this.handleClose} >
                <Alert onClose={this.handleClose} severity={this.state.severity}>
                    {this.state.message}                
                </Alert>
                </Snackbar>
            );
        }else {
            return (
                <></>
            )
        }
    }
}
