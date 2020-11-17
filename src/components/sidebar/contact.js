import React, { Component } from 'react';
import  styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faAt } from '@fortawesome/free-solid-svg-icons';

const Widget = styled.div 
   `
        display:flex;
        flex-direction:column;
        margin-top: 2em;
        width:95%;
       
    `;


const Form = styled.form 
     `  background-color:grey;
        border: 1px solid black;
        padding: 5px;
        position: absolute;
        margin-top: 36vh;
        left:37%;
        z-index:1;
        text-align: center;
        @media (min-width: 600px) {
            top: 25vh;
        }
        @media (max-width: 320px) {
            top: 50vh;
        }
    `;

const List = styled.ul  
    `   margin-left:-1.8em;
        flex: 1;
        display:flex;
        justify-content: space-between;
        flex-direction:column;
        margin-bottom:10px;
    `;

const EditButton = styled(FontAwesomeIcon) 

    `cursor:pointer;
     margin-right: 2px;
     position:absolute;
     float: right;
     margin-left: 15.8em;
     transition: transform .2s;
     &:hover{
        transform: scale(0.8);
    
     }
    `;


const MiniWrapper = styled.div
    `display: flex;
     flex-direction:row;
     margin-top: 20px;
    `;

const Button = styled.button

 `  background-color: darkgray;
    border:1px solid black;
    padding:.2em;
    width: 80px;
    text-align: center;
    &:hover{
        background-color:gray;
        
        } 
`;

const Title = styled.h3 
`
padding-left: 5px
`;

class Contact extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email:  this.getStorage('contact_email') || '',
            phone:  this.getStorage('contact_phone') || '',
            github: this.getStorage('contact_github') || '',
            contactEdit: false,
        }

        this.sumbitContactForm = this.sumbitContactForm.bind(this);
        this.toggleContactEdit = this.toggleContactEdit.bind(this);
    }

    componentDidUpdate(prevState) {
        if(this.state.email !== prevState.email) {
            this.setStorage('contact_email', this.state.email)
        }

        if(this.state.phone !== prevState.phone) {
            this.setStorage('contact_phone', this.state.phone)
        }

        if(this.state.github !== prevState.github) {
            this.setStorage('contact_github', this.state.github)
        }
    }

    setStorage(key, value) {
        localStorage.setItem(key, JSON.stringify(value))
    }

    getStorage(key) {
        return JSON.parse(localStorage.getItem(key))
    }

    toggleContactEdit() {
        this.setState( prevState => (
            { contactEdit: !prevState.contactEdit }
        ))
    }

    sumbitContactForm(e) {
        e.preventDefault();
        this.toggleContactEdit();
    }

    changeEmail(e) {
        const newValue = e.target.value;
        this.setState( { email: newValue })
    }

    changePhone(e) {
        const newValue = e.target.value;
        this.setState( { phone: newValue } )
    }

    changeGithub(e) {
        const newValue = e.target.value;
        this.setState( { github: newValue } )
    }

    render() {
        const { contactEdit, email, phone, github} = this.state

        return(
            <Widget>
            <MiniWrapper>
                <Title>CONTACT</Title>
                <EditButton 
                        onClick={this.toggleContactEdit}
                        icon={faEdit}/>
            </MiniWrapper>
                {contactEdit &&
                    <Form  className="d-flex flex-column" onSubmit={(e) => this.sumbitContactForm(e)}>
                        <label>Email</label>
                        <input 
                            maxLength='220' 
                            defaultValue={email} 
                            onChange={ (e)=>this.changeEmail(e) } 
                            type='email'
                        ></input>
                        <label>Phone</label>
                        <input 
                            maxLength='15' 
                            defaultValue={phone} 
                            onChange={ (e)=>this.changePhone(e) }    
                        ></input>
                        <label>Github Page</label>
                        <input 
                            maxLength='225' 
                            defaultValue={github} 
                            onChange={ (e)=>this.changeGithub(e) }
                        ></input>

                        <Button className="mt-2 ml-5 rounded">Edit</Button>
                    </Form>
                }
                    
                <List>
                    <div>
                        <FontAwesomeIcon  icon={faAt} className="mt-3"/>
                        <span className=" ml-1 mb-3">{email ? email : 'Enter your email'}</span>
                    </div>
                    <div>
                        <FontAwesomeIcon  icon={faPhone} className=" mt-3"/>
                        <span className=" ml-1 mb-3">{phone ? phone : 'Enter your phone'} </span>
                    </div>
                    <div>
                        <FontAwesomeIcon  icon={faGithub} className=" mt-3"/>
                        <span className=" ml-1 mb-3">{github ? github : 'github.com/yourpage'}</span>
                    </div>
                </List>
            </Widget>
        )
    }
}

export default Contact;