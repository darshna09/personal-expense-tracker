import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('renders the welcome message', () => {
    render(<App />);
    expect(screen.getByText(/vite \+ react/i)).toBeInTheDocument();
  });
});
