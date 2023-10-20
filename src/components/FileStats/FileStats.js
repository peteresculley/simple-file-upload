import './fileStats.css';
import { useEffect, useMemo, useState } from 'react';

import { ImageInput } from '../ImageInput';

const emptyStats = {
  width: 0,
  height: 0,
  megapixels: 0
};

export const FileStats = ({ file, onFileSelected, showFileChosenError }) => {
  const [filePath, setFilePath] = useState('');
  const [stats, setStats] = useState(emptyStats);
  useEffect(() => {
    URL.revokeObjectURL(filePath);
    setFilePath(file ? URL.createObjectURL(file) : '');
  }, [file]); // eslint-disable-line react-hooks/exhaustive-deps

  const sizeFormatted = useMemo(() => {
    if (!file) return '0 B';

    const size = file.size;
    if (size < 1000) {
      return `${size} B`;
    }
    if (size < 1000000) {
      return `${size / 1000} KB`;
    }
    if (size < 1000000000) {
      return `${size / 1000000} MB`;
    }
  }, [file]);

  useEffect(() => {
    if (!filePath) {
      return;
    }

    setStats(emptyStats);

    const image = new Image();
    let triggerOnLoad = true;
    image.onload = function() {
      if(!triggerOnLoad) return;

      setStats({
        width: this.width,
        height: this.height,
        megapixels: this.width * this.height / 1000000
      });
    };
    image.src = filePath;

    return () => {
      triggerOnLoad = false;
    };
  }, [filePath]);

  if (!file) {
    return null;
  }

  return (
    <div className='file-stats'>
      <ImageInput show={true} onFileSelected={onFileSelected} showFileChosenError={showFileChosenError} />
      <div>Name: {file.name}</div>
      <div>Type: {file.type}</div>
      <div>Size: {sizeFormatted}</div>
      <div>Dimensions: {stats.width}x{stats.height}</div>
      <div>Megapixels: {stats.megapixels}</div>
      <a className='download-container' href={filePath} download={file.name}>
        <button className='download'>Download</button>
      </a>
    </div>
  );
};
