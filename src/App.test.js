import { fireEvent, logRoles, render, screen } from '@testing-library/react';
import App from './App';

test('button has correct initial color', () => {
  const { container } = render(<App />);
  logRoles(container);
  const colorButton = screen.getByRole('button', {name: 'Change to blue'});
  expect(colorButton).toHaveStyle({backgroundColor: 'red'})
});

test('button turns blue when clicked', () => {
  render(<App />);
  const colorButton = screen.getByRole('button', {name: 'Change to blue'});
  fireEvent.click(colorButton);
  expect(colorButton).toHaveStyle({backgroundColor: 'blue'})
  expect(colorButton).toHaveTextContent('Change to red')
});

test('initial conditions', () => {
  render(<App />);
  const colorButton = screen.getByRole('button', {name: 'Change to blue'});  
  expect(colorButton).toBeEnabled();
  const checkbox = screen.getByRole('checkbox', {name: 'Disable button'});
  expect(checkbox).not.toBeChecked();
});

test('check behavior', () => {
  render(<App />);
  const colorButton = screen.getByRole('button', {name: 'Change to blue'});   
  const checkbox = screen.getByRole('checkbox', {name: 'Disable button'});
  fireEvent.click(checkbox);  
  expect(colorButton).toBeDisabled();
  fireEvent.click(checkbox); 
  expect(colorButton).toBeEnabled();
});