import { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const Widget = styled.div 
`
        display:flex;
        flex-direction:column;
        border-bottom:1px solid gray;
        width:95%;
        margin: 0 auto;
    `;


const Form = styled.form 
` background-color:grey; 
border: 1px solid black;
padding: 5px;
position: absolute;
margin-top: 35vh;
left:40%;
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
`
    flex: 1;
    display:flex;
    justify-content: space-between;
    flex-direction:column;
    margin-bottom:10px;
`;

const EditButton = styled(FontAwesomeIcon)
`   position:absolute;
    margin-right:1.4em;
    right:0;
    &:hover{
        cursor:pointer;
        transform: scale(0.8);
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
        
    } 
`;

const Title = styled.h3 
`
`;

class Education extends Component {
    constructor(props){
        super(props)
        this.state = {
            location: this.getStorage('education_location') || '',
            dateStart: this.getStorage('education_date_start') || '',
            dateEnd: this.getStorage('education_date_end') || '',
            title: this.getStorage('education_title') || '',
            educationEdit: false,
        }
        this.sumbitEducationForm = this.sumbitEducationForm.bind(this);
        this.toggleEducationEdit = this.toggleEducationEdit.bind(this);
    }

    componentDidUpdate(prevState) {
        if(this.state.location !== prevState.location) {
            this.setStorage('education_location', this.state.location)
        }

        if(this.state.dateStart !== prevState.dateStart) {
            this.setStorage('education_date_start', this.state.dateStart)
        }

        if(this.state.dateEnd !== prevState.dateEnd) {
            this.setStorage('education_date_end', this.state.dateEnd)
        }

        if(this.state.title !== prevState.title) {
            this.setStorage('education_title', this.state.title)
        }
    }

    setStorage(key, value) {
        localStorage.setItem(key, JSON.stringify(value))
    }

    getStorage(key) {
        return JSON.parse(localStorage.getItem(key))
    }

    toggleEducationEdit() {
        this.setState( prevState => ({
            educationEdit: !prevState.educationEdit
        }))
    }

    sumbitEducationForm(e) {
        e.preventDefault();
        this.toggleEducationEdit();
    }

    changeLocation(e){
        const newValue = e.target.value;
        this.setState( {location:newValue} )
    }

    changeDateStart(e){
        const newValue = e.target.value;
        this.setState( {dateStart:newValue} )
    }

    changeDateEnd(e){
        const newValue = e.target.value;
        this.setState( {dateEnd:newValue} )
    }

    changeTitle(e) {
        const newValue = e.target.value;
        this.setState( {title:newValue} )
    }

    render() {
        const {educationEdit, location, dateStart, dateEnd, title} = this.state;

        return(
            <Widget>
                <Title>EDUCATION</Title>
                {educationEdit &&
                    <Form  className="d-flex flex-column" onSubmit={(e) => this.sumbitEducationForm(e)}>
                        <label>School</label>
                        <input 
                            defaultValue={location}
                            maxLength='220'
                            onChange={(e) => this.changeLocation(e)}
                        ></input>
                        <label>Date Start</label>
                        <input 
                            defaultValue={dateStart}
                            onChange={(e) => this.changeDateStart(e)}
                            type='month'
                            ></input>
                        <label>Date End</label>
                        <input
                            defaultValue={dateEnd}
                            onChange={(e) => this.changeDateEnd(e)}
                            type='month'
                        ></input>
                        <label>Title</label>
                        <input
                            defaultValue={title}
                            maxLength='220'
                            onChange={(e) => this.changeTitle(e)}
                        ></input>
                        <Button className="mt-2 ml-5 rounded">Edit</Button>
                    </Form>
                }
                        <EditButton 
                            onClick={this.toggleEducationEdit}
                            icon={faEdit}/>
                    <List>
                        <li>Studied in: {location ? location : 'Where you studied'}</li>
                        <li>Date: {dateStart ? dateStart : 'date'} / {dateEnd ? dateEnd : 'date'}</li>
                        <li>Title: {title ? title : ''}</li>
                    </List>
            </Widget>
        )

    }
}

export default Education;