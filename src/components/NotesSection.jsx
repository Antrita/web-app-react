import { useState } from 'react';
import '../styles/NotesSection.css';

function NotesSection() {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      title: title || 'Untitled',
      content: content,
      date: new Date().toLocaleDateString()
    };
    setNotes([...notes, newNote]);
    setTitle('');
    setContent('');
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
    if (activeNote === id) setActiveNote(null);
  };

  return (
    <div className="notes-container">
      <div className="notes-sidebar">
        <div className="notes-header">
          <h2>My Notes</h2>
          <button className="add-button" onClick={() => setActiveNote('new')}>Add Note</button>
        </div>
        <div className="notes-list">
          {notes.map(note => (
            <div 
              key={note.id} 
              className={`note-item ${activeNote === note.id ? 'active' : ''}`}
              onClick={() => setActiveNote(note.id)}
            >
              <h3>{note.title}</h3>
              <p>{note.date}</p>
              <button onClick={() => deleteNote(note.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
      <div className="notes-editor">
        {activeNote === 'new' ? (
          <div className="new-note-form">
            <input
              type="text"
              placeholder="Note Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Note Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button onClick={addNote}>Save Note</button>
          </div>
        ) : activeNote ? (
          <div className="note-view">
            <h2>{notes.find(n => n.id === activeNote)?.title}</h2>
            <p>{notes.find(n => n.id === activeNote)?.content}</p>
          </div>
        ) : (
          <div className="no-note-selected">
            <p>Select a note or create a new one</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default NotesSection;
