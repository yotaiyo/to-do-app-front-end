import React from 'react'
import styled from 'styled-components'
import checkBlackImage from '../images/check-black.png'
import checkGrayImage from '../images/check-gray.png'

const DateToString = (time) => {
    const year = time.getFullYear()
    const month = time.getMonth() + 1
    const date = time.getDate()
    return `${year}/${month}/${date}`
}


const Wrapper = styled.div`
    margin: 0 auto;
    margin-top: 10px;
    width: 600px;
    font-size: 20px;
    @media (max-width: 768px) {
        font-size: 12px;
        width: 300px;
    }
`
const TodoCard = styled.div`
    border-left: solid 1px;
    border-right: solid 1px;
    border-bottom: solid 1px;
    text-align: left;
    padding-left: 10px;
    display: flex;
    flex-direction: row;
`

const TodoBody = styled.div`
    font-size: 20px;
    @media (max-width: 768px) {
        font-size: 12px;
    }
`

const ToggleButton = styled.img`
    margin: 0 0 0 auto;
    width: 15px;
    height: 15px;
    margin-top: 8px;
    padding-left: 10px;
    padding-right: 10px;
    border-left: solid 1px #EEEEEE;
    @media (max-width: 768px) {  
        width: 10px;
        height: 10px;
        margin-top: 4px;
    }
`

const DeadlineCardWrapper = styled.div`
    font-size: 12px;
    margin-top: 7px;
    margin-bottom: 5px;
    margin-left: 10px;
    padding-left: 5px;
    padding-right: 5px;
    text-align: left;
    border-radius: 5px;
    box-shadow:0px 0px 3px 0.5px #C0C0C0;
    @media (max-width: 768px) {
        margin-top: 4px;
        font-size: 10px;
    }
`

const DeadlineCard = ({ currentTime, deadline }) => {
    if (currentTime > deadline) {
        return <DeadlineCardWrapper>締切は終了しました。</DeadlineCardWrapper>
    } 
    return <DeadlineCardWrapper>{DateToString(deadline)}まで</DeadlineCardWrapper>
}

export const TodoList = ({ todos, onClickCheckButton, showOnlyCompleted, showOnlyActive }) => {
    let listNum = 0
    if (todos.length === 0) {
        return <Wrapper>Todoはありません。</Wrapper>
    }
    return (
        <Wrapper>  
            {todos.map((todo) => {
                const { id, text, completed, deadline } = todo
                const showCompleted = showOnlyCompleted ? completed : true
                const showActive = showOnlyActive ? !completed : true 
                const show = showCompleted && showActive
                listNum += show ? 1 : 0 

                return (
                    show ? 
                        <TodoCard key={id} style={{ borderTop: listNum === 1 ? 'solid 1px' : undefined }}>
                            <TodoBody style={{ textDecoration: completed ? 'line-through' : undefined }}>{text}</TodoBody>
                            {deadline ? <DeadlineCard currentTime={new Date()} deadline={deadline}/> : <div />}
                            <ToggleButton 
                                src={completed ? checkBlackImage : checkGrayImage} 
                                alt='check'
                                onClick={() => onClickCheckButton(id)}
                            />
                        </TodoCard>
                    : <div key={id} />
            )})} 
        </Wrapper>
    )
}