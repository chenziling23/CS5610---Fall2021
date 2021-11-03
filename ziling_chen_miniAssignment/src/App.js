import React, { useState, useMemo } from 'react';
import './App.css';
import Box from './components/box';
import { connect } from 'react-redux';

function App ({ onTodoClick, state }) {
  const [box] = useState(state);
  const count = useMemo(() => {
    let t = state.filter((item) => item.active)
    return t.length
  }, [state])
  return (
    <>
      <h1>Count:{count}</h1>
      <div className="App">
        {
          box.map((item) => (
            <Box key={item.id} rowId={item.id} active={item.active} />
          ))
        }
      </div>
    </>
  );
}

const mapToProps = (state, ownProps) => {
  return {
    state: state
  }
}

export default connect(mapToProps)(App);
