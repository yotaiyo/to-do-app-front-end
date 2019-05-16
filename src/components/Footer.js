import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 30px;
`

const Button = styled.div`
    padding-left: 10px;
    padding-right: 10px;
    border-top: solid 1px;
    border-bottom: solid 1px;
    border-left: solid 1px;
`

export const Footer = ({ onClickAll, onClickCompleted, onClickActive }) => {
    return (
        <Wrapper>
            <Button onClick={onClickAll}>All</Button>
            <Button onClick={onClickCompleted}>Completed</Button>
            <Button onClick={onClickActive}>Active</Button>
            <Button style={{ borderRight: 'solid 1px' }}>Sort</Button>
        </Wrapper>
    )
}