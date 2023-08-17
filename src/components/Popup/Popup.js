import './Popup.css';
import { useEffect } from 'react';

function Popup(props) {
  const { isOpen, onClose, children } = props;
  useEffect(() => {
    function handleEscClose(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscClose);
      return () => document.removeEventListener('keydown', handleEscClose);
    }
  }, [isOpen, onClose]);

  function closeByClickOnOverlay(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div className={`overlay ${isOpen ? 'visible' : ''}`} onMouseDown={closeByClickOnOverlay}>
      {children}
    </div>
  );
}

export default Popup;
