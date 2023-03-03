import React from 'react'
import "./Item.scss"

export default function Item({name, isDone, onToggle, id, onDelete, onChecked, dueDate}) {
    
  const newDueDate = new Date(dueDate)

  return (
    <div>
        <input onChange={onToggle}  onClick={onChecked} checked={isDone} type="checkbox" className='inp' />
       <label htmlFor=""></label>
        <span>{name}</span>
        <span className='date-class' >{`${newDueDate.toLocaleDateString()} ${newDueDate.toLocaleTimeString()}`}</span>
        <button onClick={onDelete}>x</button>
    </div>
  )
}
