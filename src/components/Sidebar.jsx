function Sidebar({ notes, addNote, deleteNote, activeNoteId, setActiveNoteId }) {
    const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);
  
    return (
      <div className="sidebar">
        <div className="sidebar-header">
          <h1>Notes</h1>
          <button onClick={addNote}>Add Note</button>
        </div>
        <div className="sidebar-notes">
          {sortedNotes.map(note => (
            <div 
              className={`sidebar-note ${note.id === activeNoteId ? 'active' : ''}`}
              key={note.id}
              onClick={() => setActiveNoteId(note.id)}
            >
              <div className="sidebar-note-title">
                <strong>{note.title}</strong>
                <button onClick={() => deleteNote(note.id)}>Delete</button>
              </div>
              <p>{note.content && note.content.substr(0, 100) + '...'}</p>
              <small>
                Last modified: {new Date(note.lastModified).toLocaleDateString('en-GB', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </small>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default Sidebar;