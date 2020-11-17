import React,{Component} from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div 
     `
        position:relative;
        margin:5px;
    `;

const Job = styled.div 
    `   diplay: flex;
        flex-direction: column;
        border-bottom:1px solid gray;
        margin:5px;
        position: relative;
    `;

const JobPosition = styled.h4
    `WORD-BREAK: break-all;
    `;

const Company = styled.h5
    `WORD-BREAK: break-all;
    `;

const DateContainer = styled.h5 
    `display: flex;
    `;

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
    background-color:grey;
    
    } 
`;


const TextArea = styled.textarea 
 `  max-height:200px;
 `;

const Title = styled.h3 
`
`;

const Text = styled.p 
`   WORD-BREAK: break-all;
    font-weight: light;
`;


class WorkExperience extends Component {
    constructor(props){
        super(props)
        this.state = {
            jobPosition: this.getStorage('work_position') || '',
            jobCompany: this.getStorage('work_company') || '',
            jobDateStart: this.getStorage('work_date_start') || '',
            jobDateEnd: this.getStorage('work_date_end') || '',
            jobText: this.getStorage('work_text') || '',
            jobEditToggle: false
        }

        this.handleJobEditToggle = this.handleJobEditToggle.bind(this);
        this.handleJobSubmitForm = this.handleJobSubmitForm.bind(this);
    }

    componentDidUpdate(prevState) {
        if(this.state.jobPosition !== prevState.jobPosition) {
            this.setStorage('work_position', this.state.jobPosition)
        }

        if(this.state.jobCompany !== prevState.jobCompany) {
            this.setStorage('work_company', this.state.jobCompany)
        }

        if(this.state.jobDateStart !== prevState.jobDateStart) {
            this.setStorage('work_date_start', this.state.jobDateStart)
        }

        if(this.state.jobDateEnd !== prevState.jobDateEnd) {
            this.setStorage('work_date_end', this.state.jobDateEnd)
        }

        if(this.state.jobText !== prevState.jobText) {
            this.setStorage('work_text', this.state.jobText)
        }
    }

    setStorage(key, value) {
        localStorage.setItem(key, JSON.stringify(value))
    }

    getStorage(key) {
        return JSON.parse(localStorage.getItem(key))
    }


    handleJobPositionChange(e) {
        const text = e.target.value
        this.setState({ jobPosition: text })
    }

    handleJobCompanyChange(e) {
        const text = e.target.value
        this.setState({ jobCompany: text })
    }

    handleJobDateStartChange(e) {
        const value = e.target.value
        this.setState({ jobDateStart: value })
    }

    handleJobDateEndChange(e) {
        const value = e.target.value
        this.setState({ jobDateEnd: value })
    }

    handleJobTextChange(e) {
        const text = e.target.value
        this.setState({ jobText: text })
    }

    handleJobEditToggle() {
        this.setState(prevState => ({
            jobEditToggle: !prevState.jobEditToggle
        }));
    }

    handleJobSubmitForm(e) {
        e.preventDefault();
        this.handleJobEditToggle();
    }

    render() {
        const{ jobPosition, jobCompany, jobDateStart, jobDateEnd, jobText, jobEditToggle } = this.state

        return( 
            <Container>
                <Title>WORK EXPERIENCE</Title>
                <EditButton
                    icon={faEdit}
                    onClick={this.handleJobEditToggle}
                />
                <Job>
                    <JobPosition>Position: {jobPosition ? jobPosition : 'Enter your position in the job'}</JobPosition>
                    <Company>Company: {jobCompany ? jobCompany : 'Name of the company you worked for'}</Company>
                    <DateContainer> Date: {jobDateStart ? jobDateStart : 'date'} / 
                    {jobDateEnd ? jobDateEnd : 'date'} </DateContainer>
                    <Text>{jobText ? jobText : 'Please enter what you want to share about that job'}</Text>

                {jobEditToggle &&
                    <Form  className="d-flex flex-column"onSubmit={this.handleJobSubmitForm}>
                        <label>Position</label>
                        <input
                            maxLength="20"
                            placeholder='Position'
                            defaultValue={jobPosition}
                            onChange={(e) => this.handleJobPositionChange(e)}
                        ></input>
                        <label>Company</label>
                        <input
                            maxLength="20"
                            placeholder='Company'
                            defaultValue={jobCompany}
                            onChange={(e) => this.handleJobCompanyChange(e)}
                        ></input>
                        <label>Date Start</label>
                        <input
                            type="month"
                            defaultValue={jobDateStart}
                            onChange={(e) => this.handleJobDateStartChange(e)}
                        ></input>
                        <label>Date End</label>
                        <input
                            type="month"
                            defaultValue={jobDateEnd}
                            onChange={(e) => this.handleJobDateEndChange(e)}
                        ></input>
                        <label>Duties</label>
                        <TextArea
                            maxLength="200"
                            defaultValue= {jobText}
                            onChange= {(e) => this.handleJobTextChange(e)}
                        >                            
                        </TextArea>
                        <Button className="mt-2 ml-5 rounded">Edit</Button>
                    </Form>
                }
                </Job>
            </Container>
        )
    }
}

export default WorkExperience;