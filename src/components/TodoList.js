import React from 'react'
import styled from 'styled-components'

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
`

export const TodoList = ({ todos }) => {
    return (
        <Wrapper style={ todos.length !== 0 ? { borderTop: 'solid 1px' } : undefined }>  
            {todos.map((todo) => (
                <TodoCard key={todo.id}>{todo.text}</TodoCard>
            ))} 
        </Wrapper>
    )
}