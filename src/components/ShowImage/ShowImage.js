import './showImage.css';
import { useCallback, useEffect, useState } from 'react';

export const ShowImage = ({ file }) => {
  const [filePath, setFilePath] = useState('');
  useEffect(() => {
    URL.revokeObjectURL(filePath);
    setFilePath(file ? URL.createObjectURL(file) : '');
  }, [file]); // eslint-disable-line react-hooks/exhaustive-deps

  const downloadFile = useCallback(() => {
    const a = document.createElement('a');
    a.href = filePath;
    a.download = file.name;
    a.click();
  }, [filePath, file]);

  if (!file) {
    return null;
  }

  return (
    <div className='show-image'>
      <div className='show-image-container'>
        <img src={filePath} alt='' onClick={downloadFile} title='Download' />
      </div>
    </div>
  );
};
