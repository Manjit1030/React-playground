import { useCallback, useEffect, useState } from 'react'
import Button from './Button.jsx'
import Display from './Display.jsx'

const operatorLabels = {
  add: '+',
  subtract: '-',
  multiply: 'x',
  divide: '÷',
}

function trimNumber(value) {
  if (!Number.isFinite(value)) {
    return 'Error'
  }

  const rounded = Number.parseFloat(value.toFixed(12))
  const text = String(rounded)

  if (text.length <= 14) {
    return text
  }

  return rounded.toExponential(8)
}

function calculate(firstValue, secondValue, operator) {
  switch (operator) {
    case 'add':
      return firstValue + secondValue
    case 'subtract':
      return firstValue - secondValue
    case 'multiply':
      return firstValue * secondValue
    case 'divide':
      return secondValue === 0 ? null : firstValue / secondValue
    default:
      return secondValue
  }
}

function Calculator() {
  const [displayValue, setDisplayValue] = useState('0')
  const [storedValue, setStoredValue] = useState(null)
  const [operator, setOperator] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  const [expression, setExpression] = useState('')

  const resetCalculator = useCallback(() => {
    setDisplayValue('0')
    setStoredValue(null)
    setOperator(null)
    setWaitingForOperand(false)
    setExpression('')
  }, [])

  const resetAfterError = useCallback(() => {
    if (displayValue === 'Error') {
      resetCalculator()
      return true
    }

    return false
  }, [displayValue, resetCalculator])

  const inputDigit = useCallback(
    (digit) => {
      if (resetAfterError()) {
        setDisplayValue(String(digit))
        return
      }

      if (waitingForOperand) {
        setDisplayValue(String(digit))
        setWaitingForOperand(false)
        return
      }

      setDisplayValue((currentValue) => {
        if (currentValue === '0') {
          return String(digit)
        }

        if (currentValue.replace('.', '').replace('-', '').length >= 14) {
          return currentValue
        }

        return `${currentValue}${digit}`
      })
    },
    [resetAfterError, waitingForOperand],
  )

  const inputDecimal = useCallback(() => {
    if (resetAfterError()) {
      setDisplayValue('0.')
      return
    }

    if (waitingForOperand) {
      setDisplayValue('0.')
      setWaitingForOperand(false)
      return
    }

    setDisplayValue((currentValue) =>
      currentValue.includes('.') ? currentValue : `${currentValue}.`,
    )
  }, [resetAfterError, waitingForOperand])

  const deleteDigit = useCallback(() => {
    if (displayValue === 'Error') {
      resetCalculator()
      return
    }

    if (waitingForOperand) {
      return
    }

    setDisplayValue((currentValue) => {
      if (currentValue.length <= 1 || currentValue === '-0') {
        return '0'
      }

      return currentValue.slice(0, -1)
    })
  }, [displayValue, resetCalculator, waitingForOperand])

  const applyPercentage = useCallback(() => {
    if (resetAfterError()) {
      return
    }

    const percentageValue = Number(displayValue) / 100
    setDisplayValue(trimNumber(percentageValue))
  }, [displayValue, resetAfterError])

  const chooseOperator = useCallback(
    (nextOperator) => {
      if (displayValue === 'Error') {
        resetCalculator()
        return
      }

      const inputValue = Number(displayValue)

      if (storedValue === null) {
        setStoredValue(inputValue)
        setExpression(`${trimNumber(inputValue)} ${operatorLabels[nextOperator]}`)
      } else if (waitingForOperand) {
        setExpression(`${trimNumber(storedValue)} ${operatorLabels[nextOperator]}`)
      } else if (operator) {
        const result = calculate(storedValue, inputValue, operator)

        if (result === null) {
          setDisplayValue('Error')
          setStoredValue(null)
          setOperator(null)
          setWaitingForOperand(true)
          setExpression('Cannot divide by zero')
          return
        }

        setStoredValue(result)
        setDisplayValue(trimNumber(result))
        setExpression(`${trimNumber(result)} ${operatorLabels[nextOperator]}`)
      }

      setOperator(nextOperator)
      setWaitingForOperand(true)
    },
    [displayValue, operator, resetCalculator, storedValue, waitingForOperand],
  )

  const performEquals = useCallback(() => {
    if (displayValue === 'Error') {
      resetCalculator()
      return
    }

    if (!operator || storedValue === null) {
      return
    }

    const inputValue = Number(displayValue)
    const result = calculate(storedValue, inputValue, operator)

    if (result === null) {
      setDisplayValue('Error')
      setStoredValue(null)
      setOperator(null)
      setWaitingForOperand(true)
      setExpression('Cannot divide by zero')
      return
    }

    setDisplayValue(trimNumber(result))
    setExpression(
      `${trimNumber(storedValue)} ${operatorLabels[operator]} ${trimNumber(
        inputValue,
      )} =`,
    )
    setStoredValue(null)
    setOperator(null)
    setWaitingForOperand(true)
  }, [displayValue, operator, resetCalculator, storedValue])

  const handleButtonPress = useCallback(
    (value) => {
      if (/^\d$/.test(value)) {
        inputDigit(value)
        return
      }

      if (value === '.') {
        inputDecimal()
        return
      }

      if (value === 'clear') {
        resetCalculator()
        return
      }

      if (value === 'delete') {
        deleteDigit()
        return
      }

      if (value === 'percent') {
        applyPercentage()
        return
      }

      if (value === 'equals') {
        performEquals()
        return
      }

      chooseOperator(value)
    },
    [
      applyPercentage,
      chooseOperator,
      deleteDigit,
      inputDecimal,
      inputDigit,
      performEquals,
      resetCalculator,
    ],
  )

  useEffect(() => {
    function handleKeyDown(event) {
      const { key } = event

      if (/^\d$/.test(key)) {
        event.preventDefault()
        inputDigit(key)
      } else if (key === '.') {
        event.preventDefault()
        inputDecimal()
      } else if (key === '+') {
        event.preventDefault()
        chooseOperator('add')
      } else if (key === '-') {
        event.preventDefault()
        chooseOperator('subtract')
      } else if (key === '*') {
        event.preventDefault()
        chooseOperator('multiply')
      } else if (key === '/') {
        event.preventDefault()
        chooseOperator('divide')
      } else if (key === 'Enter' || key === '=') {
        event.preventDefault()
        performEquals()
      } else if (key === 'Backspace') {
        event.preventDefault()
        deleteDigit()
      } else if (key === 'Delete') {
        event.preventDefault()
        deleteDigit()
      } else if (key === 'Escape') {
        event.preventDefault()
        resetCalculator()
      } else if (key === '%') {
        event.preventDefault()
        applyPercentage()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [
    applyPercentage,
    chooseOperator,
    deleteDigit,
    inputDecimal,
    inputDigit,
    performEquals,
    resetCalculator,
  ])

  return (
    <main className="calculator-shell">
      <div className="calculator" aria-label="Calculator">
        <Display expression={expression} value={displayValue} />

        <div className="calculator-keypad">
          <Button value="clear" variant="utility" onClick={handleButtonPress}>
            AC
          </Button>
          <Button
            value="delete"
            variant="utility"
            onClick={handleButtonPress}
            ariaLabel="Delete"
          >
            DEL
          </Button>
          <Button
            value="percent"
            variant="utility"
            onClick={handleButtonPress}
            ariaLabel="Percentage"
          >
            %
          </Button>
          <Button value="divide" variant="operator" onClick={handleButtonPress}>
            ÷
          </Button>

          <Button value="7" onClick={handleButtonPress}>
            7
          </Button>
          <Button value="8" onClick={handleButtonPress}>
            8
          </Button>
          <Button value="9" onClick={handleButtonPress}>
            9
          </Button>
          <Button value="multiply" variant="operator" onClick={handleButtonPress}>
            x
          </Button>

          <Button value="4" onClick={handleButtonPress}>
            4
          </Button>
          <Button value="5" onClick={handleButtonPress}>
            5
          </Button>
          <Button value="6" onClick={handleButtonPress}>
            6
          </Button>
          <Button value="subtract" variant="operator" onClick={handleButtonPress}>
            -
          </Button>

          <Button value="1" onClick={handleButtonPress}>
            1
          </Button>
          <Button value="2" onClick={handleButtonPress}>
            2
          </Button>
          <Button value="3" onClick={handleButtonPress}>
            3
          </Button>
          <Button value="add" variant="operator" onClick={handleButtonPress}>
            +
          </Button>

          <Button value="0" wide onClick={handleButtonPress}>
            0
          </Button>
          <Button value="." onClick={handleButtonPress} ariaLabel="Decimal">
            .
          </Button>
          <Button value="equals" variant="equals" onClick={handleButtonPress}>
            =
          </Button>
        </div>
      </div>
    </main>
  )
}

export default Calculator
