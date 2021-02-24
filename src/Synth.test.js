import { render, screen } from '@testing-library/react';
import Synth from './Synth';

test('renders', () => {
  render(<Synth />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
