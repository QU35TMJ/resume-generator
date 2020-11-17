import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div 
     `
        position:relative;
        border-bottom:1px solid gray;
        margin:5px;
    `;    


const Text = styled.p 
    `WORD-BREAK: break-all;
     font-weight: light;
    `;
    
const Title = styled.h3
    ``;

const EditButton = styled(FontAwesomeIcon) 
    `   position:absolute;
        top:0;
        right:0;
        &:hover{
            cursor:pointer;
            transform: scale(0.8);
        }
    `;


const Form = styled.form
`   background-color:grey;
    border: 1px solid black;
    padding: 5px;
    position: absolute;
    margin-top: .2em;
    left:38%;
    z-index:1;
    text-align: center;
    @media (min-width: 600px) {
        top: .7vh;
    }
    @media (max-width: 320px) {
        top: 50vh;
    }
`;

const Button = styled.button 
`   background-color: darkgray;
    border:1px solid black;
    padding:.2em;
    width: 80px;
    text-align: center;
    &:hover{
    background-color:gray;
    border:1px solid black;
    } 
`;



const TextArea = styled.textarea 
 `max-height:200px;
 `;



class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profileText: this.getStorage('profile_text') || '',
            profileEditToggle: false,
        }

        this.handleProfileEditToggle = this.handleProfileEditToggle.bind(this);
        this.handleProfileSubmitForm = this.handleProfileSubmitForm.bind(this);
        this.handleProfileChange = this.handleProfileChange.bind(this);
    }

    componentDidUpdate(prevState) {
        if(this.state.profileText !== prevState.profileText) {
            this.setStorage('profile_text', this.state.profileText)
        }
    }

    setStorage(key, value) {
        localStorage.setItem(key, JSON.stringify(value))
    }

    getStorage(key) {
        return JSON.parse(localStorage.getItem(key))
    }

    handleProfileChange(e) {
        this.setState({
            profileText: e.target.value
        })
    }

    handleProfileSubmitForm(e) {
        e.preventDefault();
        this.handleProfileEditToggle();
    }

    handleProfileEditToggle() {
        this.setState(prevState => ({
            profileEditToggle: !prevState.profileEditToggle
        }));
    }

    render(){
        const {profileText, profileEditToggle} = this.state;
        
        return(
            <Container>
                <Title>PROFILE</Title>
                <EditButton
                    icon={faEdit}
                    onClick={(e) => {this.handleProfileEditToggle(e)}}
                />
                <Text>{profileText ? profileText : 'Please enter info you want to share about you.'}</Text>
                {profileEditToggle && 
                    <Form className="d-flex flex-column" onSubmit={this.handleProfileSubmitForm}>
                        <label>Profile Info</label>
                        <TextArea
                            maxLength="200"
                            defaultValue= {profileText}
                            onChange= {(e) => this.handleProfileChange(e)}
                        ></TextArea>
                        <Button className="mt-2 ml-5 rounded">Edit</Button>
                    </Form>
                }
            </Container>
        )
    }
}

export default Profile;