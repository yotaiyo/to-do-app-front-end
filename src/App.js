import React, { Component } from 'react'
import styled from 'styled-components'
import './App.css'
import { TodoInput } from './components/TodoInput'

const Wrapper = styled.div``

const Title = styled.div`
  font-size: 30px;
  box-shadow: 0px 5px 10px -3px rgba(0,0,0,0.5);
  padding: 10px;
`

class App extends Component {
  render(){

  return (
    <Wrapper className="App">
      <Title>yotaiyo`s To-Do App</Title>
      <TodoInput />
    </Wrapper>
  )}
}

export default App