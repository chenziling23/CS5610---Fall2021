import React from "react";
import './index.css';
import { connect } from 'react-redux';

const Box = ({onTodoClick, active, rowId}) =>{
    return (
        <div onClick={()=>onTodoClick(rowId)} className={active?'active box' : 'default box'}>
        </div>
    )
}

const mapToProps = (state, ownProps) => {
    return {
      state: state
    }
  }
  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      onTodoClick: (id) => {
        dispatch({
          type: 'PUT',
          id: id
        })
      }
    }
  }
  
  export default connect(mapToProps, mapDispatchToProps)(Box);