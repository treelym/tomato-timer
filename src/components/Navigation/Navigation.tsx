const Navigation = () => {
  return (
    <nav className='navbar' role='navigation' aria-label='main navigation'>
      <div className="container">
        <div className='navbar-brand'>
          <span className='navbar-item'>Tomato Timer</span>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a className="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a className="button is-light">
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
