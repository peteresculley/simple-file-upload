import './App.css';
import { useCallback, useRef, useState } from 'react';

import { FileStats, ImageInput, ShowImage, ShowError } from './components';

function App() {
  const [file, setFile] = useState();

  const onFileSelected = useCallback((file) => {
    setShowError(false);
    clearTimeout(errorTimeout.current);
    setFile(file);
  }, []);

  const [showError, setShowError] = useState(false);
  const errorTimeout = useRef();
  const showFileChosenError = useCallback(() => {
    setFile(undefined);
    clearTimeout(errorTimeout.current);
    setShowError(true);
    errorTimeout.current = setTimeout(() => {
      setShowError(false);
    }, 3000);
  }, []);

  const onDrop = useCallback((event) => {
    event.preventDefault();

    const files = event.dataTransfer.files;
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
  }, [onFileSelected, showFileChosenError]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <div className="App" onDrop={onDrop} onDragOver={onDragOver}>
      <ImageInput show={!file} onFileSelected={onFileSelected} showFileChosenError={showFileChosenError} />
      <ShowImage file={file} />
      <FileStats file={file} onFileSelected={onFileSelected} showFileChosenError={showFileChosenError} />
      <ShowError enabled={showError} />
    </div>
  );
}

export default App;
