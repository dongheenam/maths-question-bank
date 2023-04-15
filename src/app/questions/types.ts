import { ObjectId } from 'mongodb';

export const TOPICS = [
  'Number',
  'Algebra',
  'Measurement',
  'Geometry',
  'Statistics',
  'Probability',
  'Calculus',
] as const;
export type Topic = typeof TOPICS[number];

export const YEAR_LEVELS = ['7', '8', '9', '10', '11', '12'] as const;
export type YearLevel = typeof YEAR_LEVELS[number];

export interface Question {
  _id: ObjectId;
  topic: Topic;
  yearLevel: '7' | '8' | '9' | '10' | '11' | '12';
  tags: string[];
  problem: string;
  solution: string;
}
