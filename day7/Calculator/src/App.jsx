import { useState } from 'react'
import './App.css'

function App() {
  const [display, setDisplay] = useState('0')

  const appendValue = (value) => {
    setDisplay((prev) => {
      if (prev === 'Error') return value === '.' ? '0.' : value
      if (value === '.' && prev.includes('.')) return prev
      if (prev === '0' && value !== '.') return value
      return prev + value
    })
  }

  const handleOperator = (operator) => {
    setDisplay((prev) => {
      if (prev === 'Error') return '0'
      const operators = ['+', '-', '×', '÷']
      if (operators.includes(prev.slice(-1))) {
        return prev.slice(0, -1) + operator
      }
      return prev + operator
    })
  }

  const clearDisplay = () => setDisplay('0')

  const deleteLast = () => {
    setDisplay((prev) => {
      if (prev.length <= 1) return '0'
      return prev.slice(0, -1)
    })
  }

  const calculateResult = () => {
    try {
      const expression = display.replace(/×/g, '*').replace(/÷/g, '/')
      const result = Function(`"use strict"; return (${expression})`)()
      setDisplay(Number.isFinite(result) ? String(result) : 'Error')
    } catch {
      setDisplay('Error')
    }
  }

  return (
    <div className="calculator-app">
      <div className="calculator-card">
        <div className="calculator-header">
      
    
        </div>

        <div className="display">{display}</div>

        <div className="buttons">
          <button className="action" onClick={clearDisplay}>C</button>
          <button className="action" onClick={deleteLast}>⌫</button>
          <button className="action" onClick={() => handleOperator('÷')}>÷</button>
          <button className="operator" onClick={() => handleOperator('×')}>×</button>

          <button onClick={() => appendValue('7')}>7</button>
          <button onClick={() => appendValue('8')}>8</button>
          <button onClick={() => appendValue('9')}>9</button>
          <button className="operator" onClick={() => handleOperator('-')}>−</button>

          <button onClick={() => appendValue('4')}>4</button>
          <button onClick={() => appendValue('5')}>5</button>
          <button onClick={() => appendValue('6')}>6</button>
          <button className="operator" onClick={() => handleOperator('+')}>+</button>

          <button onClick={() => appendValue('1')}>1</button>
          <button onClick={() => appendValue('2')}>2</button>
          <button onClick={() => appendValue('3')}>3</button>
          <button className="equal" onClick={calculateResult}>=</button>

          <button className="zero" onClick={() => appendValue('0')}>0</button>
          <button onClick={() => appendValue('.')}>.</button>
        </div>
      </div>
    </div>
  )
}

export default App
