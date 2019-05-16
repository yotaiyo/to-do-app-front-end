import React from 'react'
import styled from 'styled-components'

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

const TextInput = styled.input`
    width: 200px;
    font-size: 15px;
`

const AddButton = styled.div`
    margin-left: 10px;
    background-color: #003399;
    color: white;
    padding: 3px;
`

export const TodoInput = () => {
    let input

    return (
        <Wrapper>
            <TodoInputWrapper>
                <TextInput 
                    ref={(node) => {input = node}} 
                />

                <AddButton onClick={() => {
                    input.value = ''
                }}>
                    Add
                </AddButton>
            </TodoInputWrapper>
        </Wrapper>
    )
}