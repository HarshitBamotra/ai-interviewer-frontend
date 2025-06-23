import { useState } from 'react';
import { X, Upload } from 'lucide-react';

function CreateCharacterModal({ onClose, onSubmit }) {
  const [characterData, setCharacterData] = useState({
    companyName: '',
    interviewRound: '',
    additionalInformation: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCharacterData({
      ...characterData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true)
    onSubmit(characterData);
  };
  
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Create An Interviewer</h2>
          <button 
            className="close-button" 
            onClick={onClose}
            aria-label="Close modal"
          >
            <X />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="character-form">
          <div className="form-group">
            <label htmlFor="companyName">Company Name</label>
            <input
              id="name"
              name="companyName"
              type="text"
              value={characterData.companyName}
              onChange={handleChange}
              required
              placeholder="Enter company name"
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="interviewRound">Interview Round</label>
            <textarea
              id="personality"
              name="interviewRound"
              value={characterData.interviewRound}
              onChange={handleChange}
              required
              placeholder="Managerial/HR/Technical"
              className="form-textarea"
              rows={3}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="additionalInformation">Additional Information</label>
            <textarea
              id="backstory"
              name="additionalInformation"
              value={characterData.additionalInformation}
              onChange={handleChange}
              required
              placeholder="Enter any additional information like job role..."
              className="form-textarea"
              rows={5}
            />
          </div>
          
          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-button"
              disabled={!characterData.companyName || !characterData.interviewRound || !characterData.additionalInformation || isLoading}
            >
              {isLoading ? "Creating Interviewer..." : "Create Interviewer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCharacterModal;