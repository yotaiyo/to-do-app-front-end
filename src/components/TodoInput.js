import React, { Component } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import timeImage from '../images/time.png'

import 'react-datepicker/dist/react-datepicker.css'

const currentTime = new Date()

const Wrapper = styled.div`
    width: 300px;
    margin: 0 auto;
    margin-top: 20px;
`

const TodoInputWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    background-color: #EEEEEE;
    padding: 5px;
`

const TimeIcon = styled.img`
    width: 25px;
    height: 25px;
    margin-top: 2px;
    margin-left: 10px;
`

const TextInput = styled.input`
    width: 200px;
    font-size: 15px;
    margin-left: 10px;
`

const AddButton = styled.div`
    margin-left: 10px;
    margin-right: 7px;
    background-color: #003399;
    color: white;
    padding: 3px;
`

const DatePickerWrapper = styled.div`
    margin-top: 5px;
    margin-right: 100px;
    position: absolute;
`

export class TodoInput extends Component {
    constructor(props){
        super(props);
    
        this.state = { showDatePicker: false, date: currentTime } 
    }

    onClickTimeIcon = (showDatePicker) => {
        this.setState({ showDatePicker: !showDatePicker})
    }

    handleChange(date) {
        this.setState({ date })
        this.setState({ showDatePicker: false })
    }

    render() {
        const onClickAddButton = this.props.onClickAddButton
        const setDeadline = this.props.setDeadline
        const showDatePicker = this.state.showDatePicker
        const date = this.state.date
        let input

        return (
            <Wrapper>
                <TodoInputWrapper>
                    <TimeIcon 
                        src={timeImage} 
                        alt='time' 
                        onClick={() => this.onClickTimeIcon(showDatePicker)}    
                    />
                    <TextInput 
                        ref={(node) => {input = node}} 
                    />

                    <AddButton onClick={() => {
                        const text = input.value
                        onClickAddButton(text, date)
                        this.setState({ date: currentTime })
                        input.value = ''
                    }}>
                        Add
                    </AddButton>
                </TodoInputWrapper>
                { showDatePicker ?
                    <DatePickerWrapper>
                        <DatePicker
                            selected={date}
                            onChange={(date) => {
                                this.handleChange(date)
                                setDeadline()
                            }}
                            inline
                        />
                    </DatePickerWrapper>
                : <div></div>
                }
            </Wrapper>
        )
    }
}