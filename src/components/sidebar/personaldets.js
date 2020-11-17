
import React, { Component } from 'react'
import styled from "styled-components";
import Title from './title';
import Contact from "./contact";



const Container = styled.div
    `   min-height: 100vh;
        border-right: 1px solid black;
        background-color: #f7fcf9;
    `;

class Sidebar extends Component {
    render() {
        return(
            <Container className="col-5">
                <Title />
                <Contact />
            </Container>
        )
    }
}

export default Sidebar;