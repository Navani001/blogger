import { render, screen, fireEvent } from '@testing-library/react';
import { AnalysisTable } from '././../../../ui/components/table';
import '@testing-library/jest-dom';

describe('AnalysisTable', () => {
  const mockRows = [
    { id: 1, title: 'Test 1', url: 'url1', status: 'active', desc: 'desc1' },
    { id: 2, title: 'Test 2', url: 'url2', status: 'inactive', desc: 'desc2' },
    { id: 3, title: 'Test 3', url: 'url3', status: 'active', desc: 'desc3' },
  ];

  const mockHandleView = jest.fn();

  // Basic rendering test
  test('rendering title url desc in mock data ', () => {
    render(<AnalysisTable rows={mockRows} />);
    expect(screen.getByText('Test 1')).toBeInTheDocument();
    expect(screen.getByText('url1')).toBeInTheDocument();

    expect(screen.getByText('desc1')).toBeInTheDocument();

    
  });
  test('not rendering removed column in mock data ', () => {
    render(<AnalysisTable rows={mockRows} coloumn_remove={['id','title']} />);
    expect(screen.queryByText('Title')).not.toBeInTheDocument(); 
  });

  test('rendering active ', () => {
    render(<AnalysisTable rows={mockRows} />);
      // Check if IconButton exists

  // Check emoji content
  expect(screen.getByText('👁️')).toBeInTheDocument();
  

  });
  // Pagination test
 

  


});