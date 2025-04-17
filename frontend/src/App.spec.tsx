// frontend/src/App.spec.tsx
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders headline', () => {
    render(<App />);
    // Check if the main headline exists
    expect(screen.getByRole('heading', { 
        name: /Vite \+ React/i, 
        level: 1 
    })).toBeInTheDocument();
  });
}); 