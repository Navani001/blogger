import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CardAbout } from './../../../ui/components/card/card';
import userEvent from '@testing-library/user-event';

describe('CardAbout Component', () => {
  const defaultProps = {
    description: 'This is a test description that needs to be long enough to test truncation functionality. '.repeat(5),
    charLimit: 50
  };

  test('renders initial component with truncated description', () => {
    render(<CardAbout {...defaultProps} />);
    
    expect(screen.getByText(/About this Project/i)).toBeInTheDocument();
    expect(screen.getByText(/See More/i)).toBeInTheDocument();
    expect(screen.getByText(/This is a test description.+\.\.\./i)).toBeInTheDocument();
  });



  test('renders social media links', () => {
    render(<CardAbout />);
    
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute(
      'href',
      'https://github.com/Navani001'
    );
    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/navani-hk/'
    );
  });

  test('renders contact section with email', () => {
    render(<CardAbout />);
    
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
    expect(screen.getByText(/Have questions or suggestions?/i)).toBeInTheDocument();
    expect(screen.getByText('navaneetha2006krishnan@gmail.com')).toHaveAttribute(
      'href',
      'mailto:navaneetha2006krishnan@gmail.com'
    );
  });

  test('displays current year in copyright notice', () => {
    render(<CardAbout />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} All rights reserved`)).toBeInTheDocument();
  });


});