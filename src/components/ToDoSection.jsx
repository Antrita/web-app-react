import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

function TodoSection() {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Work', tasks: [] },
    { id: 2, name: 'Home', tasks: [] },
    { id: 3, name: 'Other', tasks: [] }
  ]);
  
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [newTask, setNewTask] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const COLORS = ['#00C49F', '#FF8042'];

  const calculateStats = () => {
    const totalTasks = categories.reduce((acc, cat) => acc + cat.tasks.length, 0);
    const completedTasks = categories.reduce(
      (acc, cat) => acc + cat.tasks.filter(task => task.completed).length,
      0
    );
    return [
      { name: 'Completed', value: completedTasks },
      { name: 'Pending', value: totalTasks - completedTasks }
    ];
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    setCategories(categories.map(cat => {
      if (cat.id === selectedCategory) {
        return {
          ...cat,
          tasks: [...cat.tasks, {
            id: Date.now(),
            text: newTask,
            completed: false,
            date: new Date().toLocaleDateString()
          }]
        };
      }
      return cat;
    }));
    setNewTask('');
  };

  const toggleTask = (categoryId, taskId) => {
    setCategories(categories.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          tasks: cat.tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          )
        };
      }
      return cat;
    }));
  };

  const deleteTask = (categoryId, taskId) => {
    setCategories(categories.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          tasks: cat.tasks.filter(task => task.id !== taskId)
        };
      }
      return cat;
    }));
  };

  const editCategoryName = (categoryId) => {
    setEditingCategoryId(categoryId);
    setNewCategoryName(categories.find(cat => cat.id === categoryId)?.name || '');
  };

  const saveCategoryName = () => {
    if (!newCategoryName.trim()) return;
    
    setCategories(categories.map(cat => {
      if (cat.id === editingCategoryId) {
        return { ...cat, name: newCategoryName };
      }
      return cat;
    }));
    setEditingCategoryId(null);
    setNewCategoryName('');
  };

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h2>Task Manager</h2>
      </div>
      
      <div className="todo-content">
        <div className="categories-section">
          <div className="categories-table">
            {categories.map(category => (
              <div
                key={category.id}
                className={`category-tab ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="category-content">
                  {editingCategoryId === category.id ? (
                    <div className="category-edit">
                      <input
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        onBlur={saveCategoryName}
                        onKeyPress={(e) => e.key === 'Enter' && saveCategoryName()}
                        autoFocus
                      />
                    </div>
                  ) : (
                    <>
                      <span>{category.name}</span>
                      <div className="category-meta">
                        {category.tasks.length} tasks • 
                        {category.tasks.filter(t => t.completed).length} completed
                      </div>
                    </>
                  )}
                </div>
                <button
                  className="edit-category-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    editCategoryName(category.id);
                  }}
                >
                  ✎
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="main-content-area">
          <div className="tasks-section">
            <form onSubmit={addTask} className="task-form">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task..."
                className="task-input"
              />
              <button type="submit" className="add-task-btn">Add Task</button>
            </form>

            <div className="tasks-list">
              {categories
                .find(cat => cat.id === selectedCategory)
                ?.tasks.map(task => (
                  <div
                    key={task.id}
                    className={`task-item ${task.completed ? 'completed' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(selectedCategory, task.id)}
                    />
                    <span className="task-text">{task.text}</span>
                    <span className="task-date">{task.date}</span>
                    <button
                      onClick={() => deleteTask(selectedCategory, task.id)}
                      className="delete-task-btn"
                    >
                      ×
                    </button>
                  </div>
              ))}
            </div>
          </div>

          <div className="stats-section">
            <h3>Task Completion Status</h3>
            <div className="stats-grid">
              <div className="chart-container total-chart">
                <h4>Overall Completion</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={calculateStats()}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={70}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {calculateStats().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              {categories.map(category => {
                const categoryStats = [
                  {
                    name: 'Completed',
                    value: category.tasks.filter(task => task.completed).length
                  },
                  {
                    name: 'Pending',
                    value: category.tasks.filter(task => !task.completed).length
                  }
                ];
                
                return (
                  <div key={category.id} className="chart-container">
                    <h4>{category.name}</h4>
                    <ResponsiveContainer width="100%" height={150}>
                      <PieChart>
                        <Pie
                          data={categoryStats}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: ${value}`}
                          outerRadius={50}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {categoryStats.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoSection;