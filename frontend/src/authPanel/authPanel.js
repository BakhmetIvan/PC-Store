import { Component } from "react";
import './authPanel.css';
import Login from "../login/login";
import Register from "../register/register";

class AuthPanel extends Component{
    constructor(props){
        super(props);
        this.state = {
            modalIsOpen: false
        }
    }
    
    handleModals = () => {
        this.setState((state) => {
            return{
                modalIsOpen: !state.modalIsOpen
            }
        })
        
    }

    render(){
        return(
            <div>
                {/* <Login onModalClose={this.props.onModalClose}/> */}
                {/* <Register onModalClose={this.props.onModalClose}/> */}
                {this.state.modalIsOpen 
                ? <Login onModalClose={this.props.onModalClose} handleModal={this.handleModals} modalActive={this.state.modalIsOpen} isLoginVisible={this.props.isLoginVisible}/> 
                : <Register onModalClose={this.props.onModalClose} handleModal={this.handleModals} modalActive={this.state.modalIsOpen}/>
                }
            </div>
        )
    }
}

export default AuthPanel;