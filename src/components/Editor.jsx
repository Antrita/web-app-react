// src/components/Editor.js
import { useState } from 'react';

function Editor({ activeNote, updateNote }) {
  const [showTodoInput, setShowTodoInput] = useState(false);
  const [newTodo, setNewTodo] = useState('');

  if (!activeNote) {
    return <div className="no-note">No note selected</div>;
  }

  const onEditField = (field, value) => {
    updateNote({
      ...activeNote,
      [field]: value
    });
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const updatedTasks = [
      ...activeNote.tasks,
      { id: Date.now(), text: newTodo, completed: false }
    ];

    updateNote({
      ...activeNote,
      tasks: updatedTasks
    });

    setNewTodo('');
    setShowTodoInput(false);
  };

  const toggleTodo = (taskId) => {
    const updatedTasks = activeNote.tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );

    updateNote({
      ...activeNote,
      tasks: updatedTasks
    });
  };

  const deleteTodo = (taskId) => {
    const updatedTasks = activeNote.tasks.filter(task => task.id !== taskId);
    
    updateNote({
      ...activeNote,
      tasks: updatedTasks
    });
  };

  return (
    <div className="editor">
      <input
        type="text"
        className="editor-title"
        value={activeNote.title}
        onChange={(e) => onEditField('title', e.target.value)}
        autoFocus
      />
      
      <div className="task-section">
        <div className="task-header">
          <h3>Tasks</h3>
          <button onClick={() => setShowTodoInput(true)}>Add Task</button>
        </div>
        
        {showTodoInput && (
          <form onSubmit={addTodo} className="todo-form">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="New task..."
              autoFocus
            />
            <button type="submit">Add</button>
            <button type="button" onClick={() => setShowTodoInput(false)}>Cancel</button>
          </form>
        )}

        <div className="tasks-list">
          {activeNote.tasks.map(task => (
            <div key={task.id} className="task-item">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTodo(task.id)}
              />
              <span className={task.completed ? 'completed' : ''}>
                {task.text}
              </span>
              <button onClick={() => deleteTodo(task.id)}>×</button>
            </div>
          ))}
        </div>
      </div>

      <textarea
        className="editor-content"
        value={activeNote.content}
        onChange={(e) => onEditField('content', e.target.value)}
        placeholder="Write your note here..."
      />
    </div>
  );
}

export default Editor;