import { fireEvent, screen } from '@testing-library/react';
import { useRouter, redirect } from 'next/navigation';

jest.mock('../../api/questions/getQuestion', () => (_id: string) => {
  if (_id === 'existingId') {
    return Promise.resolve({
      _id,
      topic: 'Number',
      yearLevel: '7',
      tags: ['adds', 'subtracts'],
      problem: 'what is two plus two?',
      solution: 'zero',
      reference: 'textbook',
      isExtension: false,
    });
  } else {
    return Promise.resolve(null);
  }
});
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    refresh: jest.fn(),
  })),
  redirect: jest.fn((url: string) => {
    throw new Error(`redirect called to: ${url}`);
  }),
}));
import Page from './page';
import { renderAsyncComponent } from '@/common/tests/utils';

const renderPage = async () => {
  return await renderAsyncComponent(Page, { params: { _id: 'existingId' } });
};

test('renders without crashing', async () => {
  await renderPage();
  expect(screen.getByText(/view/i)).toBeTruthy();
});

test('renders the question correctly', async () => {
  await renderAsyncComponent(Page, { params: { _id: 'existingId' } });
  expect(screen.getByText(/number/i)).toBeTruthy;
  expect(screen.getByText(/7/)).toBeTruthy;
  expect(screen.getByText(/no/i)).toBeTruthy;
  expect(screen.getByText(/adds/i)).toBeTruthy;
  expect(screen.getByText(/subtracts/i)).toBeTruthy;
  expect(screen.getByText(/what is two plus two/)).toBeTruthy;
  expect(screen.getByText(/zero/)).toBeTruthy;
});

test('should redirect to /questions if the question does not exist', async () => {
  try {
    await renderPage();
  } catch (error: any) {
    expect(error.message).toMatch(/redirect called to: \/questions/);
  }
});

test('should edit question correctly', async () => {
  await renderPage();
  fireEvent.click(screen.getByText(/edit question/i));
  await screen.findByRole('form');

  const topicInput = screen.getByLabelText(/topic/i);
  const yearLevelInput = screen.getByLabelText(/year/i);
  const tagsInput = screen.getByRole('add tag');
  const problemInput = screen.getByLabelText(/problem/i);
  const solutionInput = screen.getByLabelText(/solution/i);
  const referenceInput = screen.getByLabelText(/reference/i);
  const extensionInput = screen.getByLabelText(/extension/i);
  const submitButton = screen.getByText(/submit/i);
});
