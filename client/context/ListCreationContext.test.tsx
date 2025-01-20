import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import {ListCreationProvider, useListCreation } from './ListCreationContext';

// Helper component to use the hook
const TestComponent = () => {
  const { selectedEmoji, selectedColor, setSelectedEmoji, setSelectedColor } =
    useListCreation();

  return (
    <div>
      <div data-testid="emoji">{selectedEmoji}</div>
      <div data-testid="color">{selectedColor}</div>
      <button onClick={() => setSelectedEmoji("🍎")}>Set Emoji</button>
      <button onClick={() => setSelectedColor("#FF5733")}>Set Color</button>
    </div>
  );
};

// Test: Ensure default values are correctly set
test('ListCreationContext provides default values', () => {
  render(
    <ListCreationProvider>
      <TestComponent />
    </ListCreationProvider>
  );

  expect(screen.getByTestId('emoji')).toHaveTextContent('🛒');
  expect(screen.getByTestId('color')).toHaveTextContent('#9CCAFF');
});

// Test: Ensure that context values are updated when the set functions are called
test('ListCreationContext updates values when set functions are called', () => {
  render(
    <ListCreationProvider>
      <TestComponent />
    </ListCreationProvider>
  );

  const emojiButton = screen.getByText('Set Emoji');
  const colorButton = screen.getByText('Set Color');

  // Initial values
  expect(screen.getByTestId('emoji')).toHaveTextContent('🛒');
  expect(screen.getByTestId('color')).toHaveTextContent('#9CCAFF');

  // Click the buttons to update values
  act(() => {
    emojiButton.click();
    colorButton.click();
  });

  // Updated values
  expect(screen.getByTestId('emoji')).toHaveTextContent('🍎');
  expect(screen.getByTestId('color')).toHaveTextContent('#FF5733');
});

// Test: Ensure that useListCreation throws an error when used outside the provider
test('useListCreation throws error when used outside of ListCreationContext', () => {
  const TestComponentWithoutProvider = () => {
    try {
      useListCreation();
      return null;
    } catch (error) {
      return <div>{error.message}</div>;
    }
  };

  render(<TestComponentWithoutProvider />);
  
  expect(screen.getByText('useListCreation must be used within a ListCreationContext')).toBeInTheDocument();
});
