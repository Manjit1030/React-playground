function Button({ label, onClick, variant }) {
  return (
    <button className={`button button--${variant}`} type="button" onClick={onClick}>
      {label}
    </button>
  );
}

export default Button;
