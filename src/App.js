import React, { Component } from 'react'
import styled from 'styled-components'
import './App.css'
import { TodoInput } from './components/TodoInput'
import { TodoList } from './components/TodoList'
import { Footer } from './components/Footer'

const Wrapper = styled.div`
  text-align: center;
  font-family: 'Vollkorn', serif;
`

const Title = styled.div`
  font-size: 30px;
  box-shadow: 0px 5px 5px -3px rgba(0,0,0,0.5);
  padding: 10px;
`

class App extends Component {
  constructor(props){
    super(props);

    this.state = { todos: [], showOnlyCompleted: false, showOnlyActive: false, setDeadline: false } 
  }

  onClickAddButton = ( text, date ) => {
    const todos = this.state.todos
    const id = todos.length
    const completed = false
    const setDeadline = this.state.setDeadline
    const deadline = setDeadline ? date : undefined

    todos.push({ id, text, completed, deadline })

    this.setState({ todos })
    this.setState({ setDeadline: false })
  }

  onClickCheckButton = ( id ) => {
    const todos = this.state.todos  
    const completed = todos[id].completed
    todos[id] = Object.assign(todos[id], {completed: !completed})
    
    this.setState({ todos })
  }

  onClickAll = () => {
    this.setState({ showOnlyCompleted: false, showOnlyActive: false })
  }

  onClickCompleted = () => {
    this.setState({ showOnlyCompleted: true, showOnlyActive: false })
  }

  onClickActive = () => {
    this.setState({ showOnlyCompleted: false, showOnlyActive: true })
  }

  deleteCompleted = () => {
    let todos = this.state.todos
    todos = todos.filter(todo => !todo.completed)
    
    this.setState({ todos })
  }

  setDeadline = () => {
    this.setState({ setDeadline: true })
  }

  render() {

    return (
      <Wrapper className="App">
        <Title>yotaiyo`s To-Do App</Title>
        <TodoInput 
          onClickAddButton={this.onClickAddButton}
          setDeadline={this.setDeadline}
        />
        <TodoList 
          todos={this.state.todos} 
          showOnlyCompleted={this.state.showOnlyCompleted} 
          showOnlyActive={this.state.showOnlyActive} 
          onClickCheckButton={this.onClickCheckButton}
        />
        <Footer 
          onClickAll={this.onClickAll} 
          onClickCompleted={this.onClickCompleted} 
          onClickActive={this.onClickActive}
          showOnlyCompleted={this.state.showOnlyCompleted} 
          showOnlyActive={this.state.showOnlyActive} 
          onClickDeleteButton={this.deleteCompleted}
        />
      </Wrapper>
    )
  }
}

export default App