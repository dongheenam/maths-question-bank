import { render, screen } from '@testing-library/react';

jest.mock(
  '../../api/questions/getQuestion',
  () => (_id: string) =>
    Promise.resolve({
      _id,
      topic: 'Number',
      yearLevel: '7',
      tags: ['adds', 'subtracts'],
      problem: 'what is two plus two?',
      solution: 'zero',
      reference: 'textbook',
      isExtension: false,
    })
);
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    refresh: jest.fn(),
  })),
}));
import Page from './page';

it('renders without crashing', async () => {
  const PageComponent = await Page({ params: { _id: '' } });
  render(PageComponent);
  expect(screen.getByText(/view/i)).toBeTruthy();
});

it('renders the question', async () => {
  const PageComponent = await Page({ params: { _id: '123' } });
  render(PageComponent);
  expect(screen.getByText(/number/i)).toBeTruthy;
  expect(screen.getByText(/7/)).toBeTruthy;
  expect(screen.getByText(/no/i)).toBeTruthy;
  expect(screen.getByText(/adds/i)).toBeTruthy;
  expect(screen.getByText(/subtracts/i)).toBeTruthy;
  expect(screen.getByText(/what is two plus two/)).toBeTruthy;
  expect(screen.getByText(/zero/)).toBeTruthy;
});
