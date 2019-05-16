import React from 'react'
import styled from 'styled-components'
import checkBlackImage from '../images/check-black.png'
import checkGrayImage from '../images/check-gray.png'

const Wrapper = styled.div`
    margin: 0 auto;
    margin-top: 10px;
    width: 600px;
`
const TodoCard = styled.div`
    border-left: solid 1px;
    border-right: solid 1px;
    border-bottom: solid 1px;
    text-align: left;
    padding-left: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const TodoBody = styled.div`
    font-size: 20px;
`

const ToggleButton = styled.img`
    width: 15px;
    height: 15px;
    margin-top: 8px;
    padding-left: 10px;
    padding-right: 10px;
    border-left: solid 1px #EEEEEE;
`

export const TodoList = ({ todos, onClick }) => {
    return (
        <Wrapper style={{ borderTop: todos.length !== 0 ? 'solid 1px' : undefined }}>  
            {todos.map((todo) => {
                const id = todo.id
                const text = todo.text
                const completed = todo.completed
                return (
                    <TodoCard key={id}>
                        <TodoBody style={{ textDecoration: completed ? 'line-through' : undefined }}>{text}</TodoBody>
                        <ToggleButton 
                            src={completed ? checkBlackImage : checkGrayImage} 
                            alt='check'
                            onClick={() => onClick(id)}
                        />
                    </TodoCard>
            )})} 
        </Wrapper>
    )
}