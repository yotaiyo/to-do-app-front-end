import React, { Component } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import timeImage from '../images/time.png'

import 'react-datepicker/dist/react-datepicker.css'

const currentTime = new Date()

const Warning = styled.div`
    margin-bottom: 10px;
`

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

const UpdateOrDeleteDeadlineWrapper = styled.div`
    margin-top: 5px;
    margin-right: 100px;
    position: absolute;
    background-color: white;
    width: 300px;
    text-align: center;
    box-shadow:0px 0px 3px 0.5px #C0C0C0;
`

const UpdateDeadline = styled.div`
    border-bottom: solid 1px #EEEEEE;
`

const DeleteDeadline = styled.div``

export class TodoInput extends Component {
    constructor(props){
        super(props);
    
        this.state = { showTimeComponent: false, date: currentTime, showPleaseInputTodo: false, showCharacterLimit: false } 
    }

    onClickTimeIcon = (showTimeComponent) => {
        this.setState({ showTimeComponent: !showTimeComponent})
    }

    handleChange(date) {
        this.setState({ date })
        this.setState({ showTimeComponent: false })
    }

    render() {
        const { onClickAddButton, setDeadline, deleteDeadline, isDeadline } = this.props
        const { showTimeComponent, date, showPleaseInputTodo, showCharacterLimit } = this.state
        let input

        return (
            <Wrapper>
                { showPleaseInputTodo ? 
                    <Warning>Todoを入力して下さい</Warning>
                : <div />
                }
                { showCharacterLimit ?
                    <Warning>20文字以上入力できません</Warning>
                : <div />
                }
                <TodoInputWrapper>
                    <TimeIcon 
                        src={timeImage} 
                        alt='time' 
                        onClick={() => this.onClickTimeIcon(showTimeComponent)}    
                    />
                    <TextInput 
                        ref={(node) => {input = node}}
                    />

                    <AddButton onClick={() => {
                        const text = input.value
                        if (text.length === 0) {
                            this.setState({ showPleaseInputTodo: true })
                        }
                        else if (text.length > 20) {
                            this.setState({ showCharacterLimit: true })
                        }
                        else {
                            onClickAddButton(text, date)
                            this.setState({ date: currentTime })
                            this.setState({ showPleaseInputTodo: false })
                            this.setState({ showCharacterLimit: false })
                            input.value = ''
                        }
                        }}>
                        Add
                    </AddButton>
                </TodoInputWrapper>
                { showTimeComponent && !isDeadline ?
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
                : <div />
                }
                { showTimeComponent && isDeadline ?
                    <UpdateOrDeleteDeadlineWrapper>
                        <UpdateDeadline 
                            onClick={() => {
                                this.setState({ showTimeComponent: true })
                                deleteDeadline()
                            }}
                        >
                            変更する
                        </UpdateDeadline>
                        <DeleteDeadline
                            onClick={() => {
                                this.setState({ showTimeComponent: false })
                                deleteDeadline()
                            }}
                        >
                            削除する
                        </DeleteDeadline>
                    </UpdateOrDeleteDeadlineWrapper>

                : <div />
                }
            </Wrapper>
        )
    }
}