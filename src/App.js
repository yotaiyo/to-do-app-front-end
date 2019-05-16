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

    this.state = { todos: [], showOnlyCompleted: false, showOnlyActive: false } 
  }

  render(){
    const onClickAddButton = ( text ) => {
      const todos = this.state.todos
      const id = todos.length
      const completed = false

      todos.push({ id, text, completed })

      this.setState({ todos })
    }

    const onClickCheckButton = ( id ) => {
      const todos = this.state.todos  
      const completed = todos[id].completed
      todos[id] = Object.assign(todos[id], {completed: !completed})
      
      this.setState({ todos })
    }
    
    const onClickAll = () => {
      this.setState({ showOnlyCompleted: false, showOnlyActive: false })
    }

    const onClickCompleted = () => {
      this.setState({ showOnlyCompleted: true, showOnlyActive: false })
    }

    const onClickActive = () => {
      this.setState({ showOnlyCompleted: false, showOnlyActive: true })
    }

    const deleteCompleted = () => {
      let todos = this.state.todos
      todos = todos.filter(todo => !todo.completed)
      
      this.setState({ todos })
    }

    return (
      <Wrapper className="App">
        <Title>yotaiyo`s To-Do App</Title>
        <TodoInput 
          onClick={onClickAddButton}
        />
        <TodoList 
          todos={this.state.todos} 
          showOnlyCompleted={this.state.showOnlyCompleted} 
          showOnlyActive={this.state.showOnlyActive} 
          onClick={onClickCheckButton} 
        />
        <Footer 
          onClickAll={onClickAll} 
          onClickCompleted={onClickCompleted} 
          onClickActive={onClickActive}
          showOnlyCompleted={this.state.showOnlyCompleted} 
          showOnlyActive={this.state.showOnlyActive} 
          onClickDeleteButton={deleteCompleted}
        />
      </Wrapper>
    )
  }
}

export default App