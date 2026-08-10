function Button({
  children,
  className = '',
  onClick,
  value,
  variant = 'number',
  wide = false,
  ariaLabel,
}) {
  return (
    <button
      type="button"
      className={[
        'calculator-button',
        `calculator-button--${variant}`,
        wide ? 'calculator-button--wide' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={() => onClick(value ?? children)}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}

export default Button
