import './Navigation.css';

export const Navigation = () => {
  const handleChangeContrast = () => {

  };

  return (
    <nav className='container-fluid'>
      <ul>
        <li>Tomato Timer</li>
      </ul>
      <ul>
        <li>
          <i className='ri-contrast-fill' onClick={handleChangeContrast} />
        </li>
      </ul>
    </nav>
  );
};
