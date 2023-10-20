import './imageInput.css';
import { useCallback } from 'react';

export const ImageInput = ({ show, onFileSelected, showFileChosenError }) => {
  const onChange = useCallback((event) => {
    const files = event.target.files;
    if (files.length === 0) {
      showFileChosenError();
      return;
    }

    const file = files[0];
    const ext = file.name.split('.')[1];
    if (ext !== 'png' && ext !== 'jpg' && ext !== 'jpeg') {
      showFileChosenError();
      return;
    }

    onFileSelected(file);
  }, [showFileChosenError, onFileSelected]);

  if (!show) {
    return null;
  }

  return (
    <div className='image-input'>
      <label className='input-label'>
        <input type='file' accept='.png,.jpg,.jpeg' onChange={onChange} />
        Select Image
      </label>
    </div>
  );
};
