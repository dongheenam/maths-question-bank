import {
  render,
  screen,
  fireEvent,
  waitFor,
  getByLabelText,
  getByText,
} from '@testing-library/react';
import { ObjectId } from 'mongodb';
import QuestionForm from './QuestionForm';

describe('QuestionForm', () => {
  it('renders the form elements', () => {
    render(<QuestionForm />);
    expect(screen.getAllByRole('combobox')).toHaveLength(2);
    expect(screen.getAllByRole('textbox')).toHaveLength(3);
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  it('submits the form when all fields are filled in', async () => {
    const mockQuestion = {
      topic: 'Number',
      yearLevel: '7',
      tags: ['tag1', 'tag2'],
      problem: 'What is 2 + 2?',
      solution: '4',
    };
    const mockResponse = {
      ok: true,
      json: () => ({ _id: new ObjectId(123) }),
    };
    const fetchMock = jest.fn().mockResolvedValue(mockResponse);
    global.fetch = fetchMock;

    render(<QuestionForm />);
    fireEvent.change(screen.getByLabelText(/problem/i), {
      target: { value: mockQuestion.problem },
    });
    fireEvent.change(screen.getByLabelText(/solution/i), {
      target: { value: mockQuestion.solution },
    });
    fireEvent.change(screen.getByLabelText(/topic/i), {
      target: { value: mockQuestion.topic },
    });
    fireEvent.change(screen.getByLabelText(/year/i), {
      target: { value: mockQuestion.yearLevel },
    });
    const tagsInput = screen.getByText(/tags/i)
      .nextElementSibling as HTMLElement | null;
    if (!tagsInput) {
      throw new Error('Tags input not found');
    }
    fireEvent.change(getByLabelText(tagsInput, /0/), {
      target: { value: mockQuestion.tags[0] },
    });
    fireEvent.click(getByText(tagsInput, '+'));
    fireEvent.change(getByLabelText(tagsInput, /1/), {
      target: { value: mockQuestion.tags[1] },
    });
    fireEvent.click(getByText(tagsInput, '+'));

    fireEvent.click(screen.getByText(/create question/i));

    expect(fetchMock).toHaveBeenCalledWith('/api/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mockQuestion),
    });

    await waitFor(() =>
      expect(screen.getByText(/question created/i)).toBeTruthy()
    );
  });

  it("doesn't submit the form if there are validation errors", async () => {
    const mockQuestion = {
      topic: 'Number',
      yearLevel: '7',
      tags: [],
      problem: 'What is 2 + 2?',
      solution: '',
    };

    const fetchMock = jest.fn();
    global.fetch = fetchMock;

    render(<QuestionForm />);
    fireEvent.change(screen.getByLabelText(/problem/i), {
      target: { value: mockQuestion.problem },
    });
    fireEvent.change(screen.getByLabelText(/solution/i), {
      target: { value: mockQuestion.solution },
    });
    fireEvent.change(screen.getByLabelText(/topic/i), {
      target: { value: mockQuestion.topic },
    });
    fireEvent.change(screen.getByLabelText(/year/i), {
      target: { value: mockQuestion.yearLevel },
    });
    fireEvent.click(screen.getByText(/create question/i));

    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.getByText(/cannot be empty/i)).toBeTruthy();
  });

  it('displays an error message if there is an issue with the server response', async () => {
    const mockQuestion = {
      topic: 'Number',
      yearLevel: '7',
      tags: [],
      problem: 'What is 2 + 2?',
      solution: '4',
    };
    const mockResponse = { ok: false };
    const fetchMock = jest.fn().mockResolvedValue(mockResponse);
    global.fetch = fetchMock;

    render(<QuestionForm />);
    fireEvent.change(screen.getByLabelText(/problem/i), {
      target: { value: mockQuestion.problem },
    });
    fireEvent.change(screen.getByLabelText(/solution/i), {
      target: { value: mockQuestion.solution },
    });
    fireEvent.change(screen.getByLabelText(/topic/i), {
      target: { value: mockQuestion.topic },
    });
    fireEvent.change(screen.getByLabelText(/year/i), {
      target: { value: mockQuestion.yearLevel },
    });
    fireEvent.click(screen.getByText(/create question/i));

    expect(fetchMock).toHaveBeenCalledWith('/api/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mockQuestion),
    });

    await waitFor(() => expect(screen.getByText(/Server error/i)).toBeTruthy());
  });
});
