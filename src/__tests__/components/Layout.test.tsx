import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Layout from '../../components/layout/Layout';
describe('ComponentName', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
  });
});