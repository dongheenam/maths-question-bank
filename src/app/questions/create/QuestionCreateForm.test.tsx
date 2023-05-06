import {
  render,
  screen,
  fireEvent,
  waitFor,
  getByLabelText,
  getByText,
} from '@testing-library/react';
import { ObjectId } from 'mongodb';
import QuestionForm from './QuestionCreateForm';

const getInput = (label: RegExp): HTMLInputElement =>
  screen.getByLabelText(label);

it('renders the form elements with initial values', () => {
  render(<QuestionForm />);

  expect(getInput(/Topic/i).value).toBe('Number');
  expect(getInput(/Year/i).value).toBe('7');
  expect(getInput(/Extension/i).checked).toBe(false);
  expect(getInput(/Problem/i).value).toBe('');
  expect(getInput(/Solution/i).value).toBe('');
  expect(getInput(/Reference/i).value).toBe('');
});
