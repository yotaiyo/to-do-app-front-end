import React from 'react'
import styled from 'styled-components'
import deleteImage from '../images/delete.png'

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 10px;
`

const Button = styled.div`
    padding-left: 10px;
    padding-right: 10px;
    border-top: solid 1px;
    border-bottom: solid 1px;
    border-left: solid 1px;
    font-size: 20px;
`

const DeleteCompletedTodoButton = styled.img`
    width: 18px;
    height: 18px;
    padding: 5px;
    border-radius: 70px;
    box-shadow:0px 0px 3px 2px #C0C0C0;
    margin-left: 50px;
    margin-top: 5px;
` 

export const Footer = ({ onClickAll, onClickCompleted, onClickActive, onClickSort, showOnlyCompleted, showOnlyActive, showSortedTodos, onClickDeleteButton }) => {
    return (
        <Wrapper>
            <Button 
                onClick={onClickAll} 
                style={{ backgroundColor: !showOnlyCompleted && !showOnlyActive && !showSortedTodos ? '#EEEEEE' : undefined }}
            >
                All
            </Button>
            <Button 
                onClick={onClickCompleted} 
                style={{ backgroundColor: showOnlyCompleted ? '#EEEEEE' : undefined }}
            >
                Completed
            </Button>
            <Button 
                onClick={onClickActive}
                style={{ backgroundColor: showOnlyActive ? '#EEEEEE' : undefined}}
            >
                Active
            </Button>
            <Button 
                onClick={onClickSort}
                style={{ backgroundColor: showSortedTodos ? '#EEEEEE' : undefined, borderRight: 'solid 1px'}}
            >
                Sort
            </Button>
            <DeleteCompletedTodoButton 
                src={deleteImage} 
                alt='delete' 
                onClick={onClickDeleteButton}
            />
        </Wrapper>
    )
}