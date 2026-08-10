import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

function getRows() {
  return screen.getAllByRole('row').slice(1) // drop header row
}

describe('App rendering', () => {
  it('renders the seed transactions in the table', () => {
    render(<App />)
    expect(getRows()).toHaveLength(8)
    expect(screen.getByText('Salary')).toBeInTheDocument()
    expect(screen.getByText('Rent')).toBeInTheDocument()
  })

  it('shows income with a "+" sign and expenses with a "-" sign', () => {
    render(<App />)
    const rows = getRows()
    const salaryRow = rows.find(r => within(r).queryByText('Salary'))
    const rentRow = rows.find(r => within(r).queryByText('Rent'))
    expect(within(salaryRow).getByText('+$5000')).toBeInTheDocument()
    expect(within(rentRow).getByText('-$1200')).toBeInTheDocument()
  })
})

describe('adding a transaction', () => {
  it('adds a new transaction and resets the form', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByPlaceholderText('Description'), 'Coffee')
    await user.type(screen.getByPlaceholderText('Amount'), '4')
    await user.click(screen.getByRole('button', { name: 'Add' }))

    expect(screen.getByText('Coffee')).toBeInTheDocument()
    expect(getRows()).toHaveLength(9)
    expect(screen.getByPlaceholderText('Description')).toHaveValue('')
    expect(screen.getByPlaceholderText('Amount')).toHaveValue(null)
  })

  it('does not add a transaction when description is empty', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByPlaceholderText('Amount'), '4')
    await user.click(screen.getByRole('button', { name: 'Add' }))

    expect(getRows()).toHaveLength(8)
  })

  it('does not add a transaction when amount is empty', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByPlaceholderText('Description'), 'Coffee')
    await user.click(screen.getByRole('button', { name: 'Add' }))

    expect(getRows()).toHaveLength(8)
    expect(screen.queryByText('Coffee')).not.toBeInTheDocument()
  })
})

describe('filtering transactions', () => {
  it('filters by type', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.selectOptions(screen.getByDisplayValue('All Types'), 'income')

    const rows = getRows()
    expect(rows).toHaveLength(1)
    expect(within(rows[0]).getByText('Salary')).toBeInTheDocument()
  })

  it('filters by category', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.selectOptions(screen.getByDisplayValue('All Categories'), 'food')

    const rows = getRows()
    expect(rows).toHaveLength(2)
    expect(rows.every(r => within(r).queryByText('food'))).toBe(true)
  })

  it('combines type and category filters', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.selectOptions(screen.getByDisplayValue('All Types'), 'expense')
    await user.selectOptions(screen.getByDisplayValue('All Categories'), 'salary')

    const rows = getRows()
    expect(rows).toHaveLength(1)
    expect(within(rows[0]).getByText('Freelance Work')).toBeInTheDocument()
  })

  it('shows no rows when the filter combination matches nothing', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.selectOptions(screen.getByDisplayValue('All Types'), 'income')
    await user.selectOptions(screen.getByDisplayValue('All Categories'), 'housing')

    expect(getRows()).toHaveLength(0)
  })
})
