import React, { useState } from 'react'
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
    @media (max-width: 768px) {
        width: 250px;
    }
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
    @media (max-width: 768px) {
        width: 20px;
        height: 20px;
    }
`

const TextInput = styled.input`
    width: 200px;
    font-size: 15px;
    margin-left: 10px;
    outline: 0;
    font-family: 'Vollkorn', serif;
    @media (max-width: 768px) {
        width: 120px;
        font-size: 10px;
    }
`

const AddButton = styled.div`
    margin-left: 10px;
    margin-right: 7px;
    background-color: #003399;
    color: white;
    padding: 3px;
    @media (max-width: 768px) {
        font-size: 12px;
    }
`

const DatePickerWrapper = styled.div`
    margin-top: 5px;
    margin-right: 100px;
    position: absolute;
    @media (max-width: 768px) {
        margin-right: 50px;
    }
`

const UpdateOrDeleteDeadlineWrapper = styled.div`
    margin-top: 5px;
    margin-right: 100px;
    position: absolute;
    background-color: white;
    width: 300px;
    text-align: center;
    box-shadow:0px 0px 3px 0.5px #C0C0C0;
    @media (max-width: 768px) {
        width: 200px;
        margin-right: 50px;
    }
`

const UpdateDeadline = styled.div`
    border-bottom: solid 1px #EEEEEE;
`

const DeleteDeadline = styled.div``

export const TodoInput = ({ onClickAddButton, setDeadline, deleteDeadline, isDeadline }) => {
    const [showTimeComponent, setShowTimeComponent] = useState(false)
    const [date, setDate] = useState(currentTime)
    const [showPleaseInputTodo, setShowPleaseInputTodo] = useState(false)
    const [showCharacterLimit, setShowCharacterLimit] = useState(false)
    let input

    const onClickTimeIcon = (showTimeComponent) => {
        setShowTimeComponent(!showTimeComponent)
    }

    const handleChange = (date) => {
        setDate(date)
        setShowTimeComponent(false)        
    }

    return (
        <Wrapper>
            { showPleaseInputTodo ? 
                <Warning>Todoを入力して下さい</Warning>
            : <div />
            }
            { showCharacterLimit ?
                <Warning>15文字以上入力できません</Warning>
            : <div />
            }
            <TodoInputWrapper>
                <TimeIcon 
                    src={timeImage} 
                    alt='time' 
                    onClick={() => onClickTimeIcon(showTimeComponent)}    
                />
                <TextInput 
                    ref={(node) => {input = node}}
                />

                <AddButton onClick={() => {
                    const text = input.value
                    if (text.length === 0) {
                        setShowPleaseInputTodo(true)
                        setShowCharacterLimit(false)                        
                    }
                    else if (text.length >= 15) {
                        setShowPleaseInputTodo(false)
                        setShowCharacterLimit(true)
                    }
                    else {
                        onClickAddButton(text, date)
                        setDate(currentTime)
                        setShowPleaseInputTodo(false)
                        setShowCharacterLimit(false)
                        input.value = ''
                    }
                    }}
                >
                    Add
                </AddButton>
            </TodoInputWrapper>
            { showTimeComponent && !isDeadline ?
                <DatePickerWrapper>
                    <DatePicker
                        selected={date}
                        onChange={(date) => {
                            handleChange(date)
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
                            setShowTimeComponent(true)
                            deleteDeadline()
                        }}
                    >
                        変更する
                    </UpdateDeadline>
                    <DeleteDeadline
                        onClick={() => {
                            setShowTimeComponent(false)                            
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