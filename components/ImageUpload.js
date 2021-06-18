import { useState } from 'react';
import { API_URL } from '@/config/index';
import styles from '@/styles/Form.module.css';
import http from '@/services/http';
import ClipLoader from 'react-spinners/ClipLoader';

export default function ImageUpload({
  evtId,
  imageUploaded,
  isLoading,
  setIsLoading,
}) {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (image) {
      const formData = new FormData();
      formData.append('files', image);
      formData.append('ref', 'events');
      formData.append('refId', evtId);
      formData.append('field', 'image');
      setIsLoading(true);

      const { res, data } = await http(`${API_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        imageUploaded();
      }
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className={styles.form}>
      <h1>
        Upload Event Image{' '}
        {isLoading && <ClipLoader size={20} color={'black'} />}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type='file' onChange={handleFileChange} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            className='btn'
            type='submit'
            style={{ marginTop: '0.5rem', flex: '1' }}
          >
            Upload {isLoading && <ClipLoader size={10} color={'white'} />}
          </button>
        </div>
      </form>
    </div>
  );
}
