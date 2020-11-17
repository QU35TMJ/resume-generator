import React,{ Component } from "react";
import styled from 'styled-components';
import Profile from './profile';
import WorkExperience from './work';
import Education from './education';


const Container = styled.div
`   min-height: 100vh;
    float:right;
    background-color:#f7fcf9;
    padding-top:4em;
`;

class Main extends Component{
    render() {
        return(
            <Container className="col-7">
                <Profile/>
                <WorkExperience/>
                <Education/>
            </Container>
        )
    }
}

export default Main;