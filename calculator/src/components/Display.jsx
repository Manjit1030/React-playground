function Display({ expression, value }) {
  return (
    <section className="calculator-display" aria-live="polite">
      <div className="calculator-display__expression">{expression || '\u00a0'}</div>
      <output className="calculator-display__value">{value}</output>
    </section>
  )
}

export default Display
