import React from 'react'
import styled from 'styled-components'
import './App.css'

const Wrapper = styled.div``

const Title = styled.div`
  font-size: 30px;
  box-shadow: 0px 5px 10px -3px rgba(0,0,0,0.5);
`

function App() {
  return (
    <Wrapper className="App">
      <Title>yotaiyo`s To-Do App</Title>
    </Wrapper>
  );
}

export default App;
