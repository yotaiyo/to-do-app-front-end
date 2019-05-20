import React, { useState } from 'react'
import styled from 'styled-components'
import './App.css'
import { TodoInput } from './components/TodoInput'
import { TodoList } from './components/TodoList'
import { Footer } from './components/Footer'

// 締切が近いもの=>締切が遅いもの=>締切が設定されていないもの=>締切が終了したもの=>完了したものの順にソートする
export const sortTodos = (todos, currentTime) => {
  const normalTodos = []
  const beforeDeadlineTodos = []
  const afterDeadlineTodos = []
  const completedTodos = []

  todos.forEach(todo => {
      const { deadline, completed } = todo

      if (!deadline && !completed) {
          normalTodos.push(todo)
      } else if (deadline && !completed) {
          currentTime < deadline ? beforeDeadlineTodos.push(todo) : afterDeadlineTodos.push(todo)
      } else {
          completedTodos.push(todo)
      }
  })

  beforeDeadlineTodos.sort((a,b) => {
      return a.deadline > b.deadline ? 1: -1
  })

  return beforeDeadlineTodos.concat(normalTodos).concat(afterDeadlineTodos).concat(completedTodos)
}

const currentTime = new Date()

const Wrapper = styled.div`
  text-align: center;
  font-family: 'Vollkorn', serif;
`

const Title = styled.div`
  font-size: 30px;
  box-shadow: 0px 5px 5px -3px rgba(0,0,0,0.5);
  padding: 10px;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`

const App = () =>  {
  const [todos, setTodos] = useState([])
  const [showOnlyCompleted, setShowOnlyCompleted] = useState(false)
  const [showOnlyActive, setShowOnlyActive] = useState(false)
  const [isDeadline, setIsDeadline] = useState(false)

  const setConcatTodos = ( text, date ) => {
    const id = todos.length
    const completed = false
    const deadline = isDeadline ? date : undefined

    const concatTodos = todos.concat([{ id, text, completed, deadline }])

    setTodos(concatTodos)
    setIsDeadline(false)
  }

  const onClickCheckButton = ( onClickId ) => {
    const newTodos = []
    todos.forEach((todo, index) => {
      const { id, text, completed, deadline } = todo
      index === onClickId ? newTodos.push({ id, text, completed: !completed, deadline: deadline}) : newTodos.push({ id, text, completed, deadline: deadline})
    })
    setTodos(newTodos)
  }

  const onClickAll = () => {
    setShowOnlyCompleted(false)
    setShowOnlyActive(false)
  }
  
  const onClickCompleted = () => {
    setShowOnlyCompleted(true)
    setShowOnlyActive(false)
  }
  
  const onClickActive = () => {
    setShowOnlyCompleted(false)
    setShowOnlyActive(true)
  }
  
  const onClickSort = () => {
    const sortedTodos = sortTodos(todos, currentTime)

    sortedTodos.forEach((todo, index) => {      
      sortedTodos[index].id = index
    })

    setTodos(sortedTodos)
  }

  const deleteCompleted = () => {
    const filterTodos = todos.filter(todo => !todo.completed)

    const newTodos = []
    filterTodos.forEach((todo, index) => { 
      const { text, completed, deadline } = todo
      newTodos.push({id: index, text, completed, deadline})
    })
    
    setTodos(newTodos)
  }

  const setDeadline = () => {
    setIsDeadline(true)
  }

  const deleteDeadline = () => {
    setIsDeadline(false)
  }

  return (
    <Wrapper className="App">
      <Title>yotaiyo`s To-Do App</Title>
      <TodoInput 
        setConcatTodos={setConcatTodos}
        setDeadline={setDeadline}
        deleteDeadline={deleteDeadline}
        isDeadline={isDeadline}
      />
      <TodoList 
        todos={todos} 
        showOnlyCompleted={showOnlyCompleted} 
        showOnlyActive={showOnlyActive}
        onClickCheckButton={onClickCheckButton}
      />
      <Footer 
        onClickAll={onClickAll} 
        onClickCompleted={onClickCompleted} 
        onClickActive={onClickActive}
        onClickSort={onClickSort}
        showOnlyCompleted={showOnlyCompleted} 
        showOnlyActive={showOnlyActive} 
        onClickDeleteButton={deleteCompleted}
      />
    </Wrapper>
  )
}

export default App