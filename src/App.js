import React, { Component } from 'react'
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

class App extends Component {
  constructor(props){
    super(props);

    this.state = { todos: [], showOnlyCompleted: false, showOnlyActive: false, showSortedTodos: false, isDeadline: false } 
  }

  onClickAddButton = ( text, date ) => {
    const { todos, isDeadline } = this.state
    const id = todos.length
    const completed = false
    const deadline = isDeadline ? date : undefined
    todos.push({ id, text, completed, deadline })

    this.setState({ todos })
    this.setState({ isDeadline: false })
  }

  onClickCheckButton = ( id ) => {
    const todos = this.state.todos
    const completed = todos[id].completed
    todos[id] = Object.assign(todos[id], {completed: !completed})
    
    this.setState({ todos })
  }

  onClickAll = () => {
    this.setState({ showOnlyCompleted: false, showOnlyActive: false, showSortedTodos: false })
  }

  onClickCompleted = () => {
    this.setState({ showOnlyCompleted: true, showOnlyActive: false, showSortedTodos: false })
  }

  onClickActive = () => {
    this.setState({ showOnlyCompleted: false, showOnlyActive: true, showSortedTodos: false })
  }

  onClickSort = () => {
    const todos = this.state.todos
    const sortedTodos = sortTodos(todos, currentTime)

    sortedTodos.forEach((todo, index) => {      
      sortedTodos[index].id = index
    })

    this.setState({ todos: sortedTodos })
    this.setState({ showOnlyCompleted: false, showOnlyActive: false, showSortedTodos: true })
  }

  deleteCompleted = () => {
    let todos = this.state.todos
    todos = todos.filter(todo => !todo.completed)

    todos.forEach((todo, index) => {      
      todos[index].id = index
    })
    
    this.setState({ todos })
  }

  setDeadline = () => {
    this.setState({ isDeadline: true })
  }

  deleteDeadline = () => {
    this.setState({ isDeadline: false })
  }

  render() {
    return (
      <Wrapper className="App">
        <Title>yotaiyo`s To-Do App</Title>
        <TodoInput 
          onClickAddButton={this.onClickAddButton}
          setDeadline={this.setDeadline}
          deleteDeadline={this.deleteDeadline}
          isDeadline={this.state.isDeadline}
        />
        <TodoList 
          todos={this.state.todos} 
          showOnlyCompleted={this.state.showOnlyCompleted} 
          showOnlyActive={this.state.showOnlyActive}
          showSortedTodos={this.state.showSortedTodos}
          onClickCheckButton={this.onClickCheckButton}
        />
        <Footer 
          onClickAll={this.onClickAll} 
          onClickCompleted={this.onClickCompleted} 
          onClickActive={this.onClickActive}
          onClickSort={this.onClickSort}
          showOnlyCompleted={this.state.showOnlyCompleted} 
          showOnlyActive={this.state.showOnlyActive} 
          showSortedTodos={this.state.showSortedTodos}
          onClickDeleteButton={this.deleteCompleted}
        />
      </Wrapper>
    )
  }
}

export default App