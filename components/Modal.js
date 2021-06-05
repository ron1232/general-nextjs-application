import { useState, useEffect } from 'react';
import styles from '@/styles/Modal.module.css';
import ReactDOM from 'react-dom';
import { TiTimes } from 'react-icons/ti';

export default function Modal({ show, onClose, children, title }) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => setIsBrowser(true));

  const handleClose = () => onClose();

  const modalContent = show ? (
    <>
      <div className={styles.overlay} onClick={handleClose}></div>
      <div className={styles['modal-container']}>
        <div className={styles.modal}>
          <div className={styles.header}>
            <button className={styles.button} onClick={handleClose}>
              <TiTimes size={30} />
            </button>
          </div>
          {title && <div>{title}</div>}
          <div className={styles.body}>{children}</div>
        </div>
      </div>
    </>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal-root')
    );
  } else {
    return null;
  }
}
