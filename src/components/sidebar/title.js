import React, {Component} from "react";
import styled from "styled-components";
import { FormGroup, Label, Input } from 'reactstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div
`display: flex;
 flex-direction: column;
 padding-left: .2em;
 margin: 0 auto;

`;
const SmallWrapper = styled.div
`display: flex;
 flex-direction:row;
`;
const ImageWrapper = styled.div
`
    border:1px solid black;
    border-radius: 80px;
    margin-top: 3em;
    margin-left: 3em;
    margin-bottom:2em;
    width: 150px;
    height: 150px;
`;
const UserImg = styled(FontAwesomeIcon)

    `position:absolute;
    margin-top:4em;
    margin-left: 4em;
         
    `;

const EditBtn = styled(FontAwesomeIcon)
     `cursor:pointer;
     position:absolute;
     float: right;
     margin-left: 15.8em;
     transition: transform .2s;
     &:hover{
        transform: scale(0.8);
     }
     `;

const Name = styled.h2
    `padding-left: 3px;
    font-size:36px;
    `;

const Ocupation = styled.h3
    `
     font-weight: light;
     text-align:center;
     font-size:26px;
    `;

const Form = styled.form 
     `  border: 1px solid black;
        background-color:grey;
        padding: 5px;
        position: absolute;
        margin-top:8em;
        left: 70%;
        transform: translate(-50%, -50%);
        z-index:1;
        @media (min-width: 600px) {
            top: 25vh;
        }
        @media (max-width: 320px) {
            top: 50vh;
        }
        text-align: center;
    `;
    


const Button = styled.button
    `background-color: darkgray;
     border:1px solid black;
     padding:.2em;
     width: 80px;
     text-align: center;
     &:hover{
         background-color: grey;
         
         }
       
    `;

    class Title extends Component {
        constructor(props) {
            super(props)
            this.state = {
                name: this.getStorage('title_name') || '',
                profession: this.getStorage('title_profession') || '',
                editName: false
            }
            this.toggleEditName = this.toggleEditName.bind(this);
            this.handleNameChange = this.handleNameChange.bind(this);
            this.handleProfessionChange = this.handleProfessionChange.bind(this);
        }
    
        componentDidUpdate(prevState, prevProps) {
            if (this.state.name !== prevState.name) {
                this.setStorage('title_name', this.state.name)
            }
            if (this.state.profession !== prevState.profession) {
                this.setStorage('title_profession', this.state.profession)
            }
        }
    
        setStorage(key,value){
            localStorage.setItem(key,JSON.stringify(value));
        }
    
        getStorage(key) {
            return JSON.parse(localStorage.getItem(key))
        }
    
        handleSubmit(e) {
            e.preventDefault();
            this.toggleEditName();
        }
    
        toggleEditName() {
            this.setState(prevState => ({
                editName: !prevState.editName
            }));
        }
    
        handleNameChange(e) {
            this.setState( {name: e.target.value.trim()} )
        }
    
        handleProfessionChange(e) {
            this.setState( {profession: e.target.value.trim()} )
        }
    
        render(){
            const {name, profession, editName} = this.state;
    
            return(
            
                    <Wrapper>
                        <ImageWrapper>
                            <UserImg icon= {faUserCircle}/>
                        </ImageWrapper>
                        {editName &&
                            <Form className="d-flex flex-column" onSubmit={ (e) => this.handleSubmit(e) }>
                                
                                <label className="">Name</label>
                                <input
                                    maxLength="25"
                                    defaultValue= {name}
                                    onChange={ (e) => this.handleNameChange(e) }
                                ></input>
                                <label>Profession</label>
                                <input
                                    maxLength="20"
                                    defaultValue= {profession}
                                    onChange={(e) => this.handleProfessionChange(e) }
                                ></input>
                                <Button className="mt-2 ml-5 rounded">Edit</Button>
                               
                            </Form> 
                        }
                        <SmallWrapper>
                        <Name>{name ? name : 'Your name'}</Name>
                        <EditBtn                            
                            icon={faEdit}
                            onClick={this.toggleEditName}
                        />
                        </SmallWrapper>
                        <Ocupation>{profession ? profession : 'Your profession'}</Ocupation>
                    </Wrapper>
                    
                
            )
        }
    
    }
    
    export default Title;