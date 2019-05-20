import React from 'react'
import styled from 'styled-components'
import deleteImage from '../images/delete.png'
import sortImage from '../images/sort.png'

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 10px;
`

const SquereButton = styled.div`
    padding-left: 10px;
    padding-right: 10px;
    border-top: solid 1px;
    border-bottom: solid 1px;
    border-left: solid 1px;
    font-size: 20px;
    @media (max-width: 768px) {
        font-size: 12px;
    }
`

const CircleButton = styled.img`
    width: 18px;
    height: 18px;
    padding: 5px;
    border-radius: 70px;
    box-shadow:0px 0px 3px 2px #C0C0C0;
    margin-left: 50px;
    margin-top: 5px;
    @media (max-width: 768px) {
        width: 10px;
        height: 10px;
        padding: 3px;
    }
` 

export const Footer = ({ onClickAll, onClickCompleted, onClickActive, onClickSort, showOnlyCompleted, showOnlyActive, onClickDeleteButton }) => {
    return (
        <Wrapper>
            <SquereButton 
                onClick={onClickAll} 
                style={{ backgroundColor: !showOnlyCompleted && !showOnlyActive ? '#EEEEEE' : undefined }}
            >
                All
            </SquereButton>
            <SquereButton 
                onClick={onClickCompleted} 
                style={{ backgroundColor: showOnlyCompleted ? '#EEEEEE' : undefined }}
            >
                Completed
            </SquereButton>
            <SquereButton 
                onClick={onClickActive}
                style={{ backgroundColor: showOnlyActive ? '#EEEEEE' : undefined, borderRight: 'solid 1px' }}
            >
                Active
            </SquereButton>
            <CircleButton
                src={sortImage}
                alt='sort'
                onClick={onClickSort}
            />
            <CircleButton 
                src={deleteImage} 
                alt='delete' 
                onClick={onClickDeleteButton}
            />
        </Wrapper>
    )
}