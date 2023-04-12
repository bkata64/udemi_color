import { fireEvent, logRoles, render, screen } from '@testing-library/react';
import App, { replaceCamelWithSpaces } from './App';

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

test('Disabled button has gray background and reverts to red', () => {
  render(<App />);
  const colorButton = screen.getByRole('button', {name: 'Change to blue'});   
  const checkbox = screen.getByRole('checkbox', {name: 'Disable button'});
  
  fireEvent.click(checkbox);    
  expect(colorButton).toHaveStyle({backgroundColor: 'gray'});
  
  fireEvent.click(checkbox);   
  expect(colorButton).toHaveStyle({backgroundColor: 'red'});
});

test('Clicked disabled button has gray background and reverts to blue', () => {
  render(<App />);
  const colorButton = screen.getByRole('button', {name: 'Change to blue'});   
  const checkbox = screen.getByRole('checkbox', {name: 'Disable button'});
  
  fireEvent.click(colorButton);

  fireEvent.click(checkbox);    
  expect(colorButton).toHaveStyle({backgroundColor: 'gray'});
  
  fireEvent.click(checkbox);   
  expect(colorButton).toHaveStyle({backgroundColor: 'blue'});
});

describe('spaces before camel-case capital letters', () => {
  test('Works for no inner capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red');
  });
  test('Works for one inner capital letter', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue');
  });
  test('Works for multiple inner capital letters', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
  });
})