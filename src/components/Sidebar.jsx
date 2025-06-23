import { LogOut, PlusCircle, User, Settings, Trash2 } from 'lucide-react';

function Sidebar({ 
  user, 
  characters, 
  selectedCharacter, 
  onSelectCharacter, 
  onCreateCharacter, 
  onOpenSettings, 
  onLogout, 
  onDeleteCharacter,
  isLoading 
}) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Interviewers</h2>
        <button
          className="create-button"
          onClick={onCreateCharacter}
          aria-label="Create new interviewer"
        >
          <PlusCircle />
        </button>
      </div>
      <div className="characters-list">
        {isLoading ? (
          <div className="loading">Loading interviewers...</div>
        ) : characters.length === 0 ? (
          <div className="no-characters">
            <p>No interviewers yet</p>
            <button onClick={onCreateCharacter}>Create your first interviewer</button>
          </div>
        ) : (
          characters.map((character) => {
            const isSelected = selectedCharacter?._id === character._id;
            
            return (
              <div
                key={character._id}
                className={`character-item ${isSelected ? 'selected' : ''}`}
                onClick={() => onSelectCharacter(character)}
              >
                <div className="character-info" style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  <span>{character.companyName}</span>
                </div>
                
                {/* Delete button that only shows on hover or when selected */}
                <button
                  className="icon-button delete-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteCharacter(character);
                  }}
                  aria-label={`Delete ${character.companyName}`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            );
          })
        )}
      </div>
      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">
            {user.profileImage ? (
              <img src={user.profileImage} alt={user.username} />
            ) : (
              <User size={18} />
            )}
          </div>
          <span className="username">{user.username}</span>
        </div>
        <div className="user-actions">
          <button
            className="icon-button"
            onClick={onOpenSettings}
            aria-label="User settings"
          >
            <Settings size={20} />
          </button>
          <button
            className="icon-button"
            onClick={onLogout}
            aria-label="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
