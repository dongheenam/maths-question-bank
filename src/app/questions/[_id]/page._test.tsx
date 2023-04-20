import { render, screen } from '@testing-library/react';
import Page from './page';
import { ObjectId } from 'mongodb';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/app/questions/QuestionForm');

describe('questions/[_id] page', () => {
  const _id = new ObjectId();
  const mockQuestion = {
    _id,
    topic: 'Number',
    yearLevel: '7',
    tags: ['addition', 'subtraction'],
    problem: 'What is 1 + 1?',
    solution: '2',
  };

  it('renders the page when a valid question ID is provided', async () => {
    const PageComponent = await Page({ params: { _id: _id.toHexString() } });
    const { container } = render(PageComponent);
    await screen.findByText('View question');

    expect(container).toMatchSnapshot();
    expect(screen.getByText(`Topic: ${mockQuestion.topic}`)).toBeTruthy();
    expect(screen.getByText(`Year: ${mockQuestion.yearLevel}`)).toBeTruthy();
    expect(
      screen.getByText(`Tags: ${mockQuestion.tags.join(', ')}`)
    ).toBeTruthy();
    expect(screen.getByText(`Problem\n${mockQuestion.problem}`)).toBeTruthy();
    expect(screen.getByText(`Solution\n${mockQuestion.solution}`)).toBeTruthy();
  });
});
