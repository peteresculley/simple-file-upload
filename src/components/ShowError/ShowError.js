import './showError.css';

export const ShowError = ({ enabled }) => {
  if (!enabled) {
    return null;
  }

  return (
    <div className='show-error'>
      Please select a single png or jpg file
    </div>
  );
};
