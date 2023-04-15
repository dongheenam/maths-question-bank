import { ObjectId } from 'mongodb';
import { z } from 'zod';

export const TOPICS = [
  'Number',
  'Algebra',
  'Measurement',
  'Geometry',
  'Statistics',
  'Probability',
  'Calculus',
] as const;
const topicSchema = z.enum(TOPICS);
export type Topic = z.infer<typeof topicSchema>;

export const YEAR_LEVELS = ['7', '8', '9', '10', '11', '12'] as const;
const yearSchema = z.enum(YEAR_LEVELS);
export type YearLevel = z.infer<typeof yearSchema>;

export const questionSchema = z.object({
  _id: z.string().optional(),
  topic: topicSchema,
  yearLevel: yearSchema,
  tags: z.array(z.string()),
  problem: z.string(),
  solution: z.string(),
});
export type Question = z.infer<typeof questionSchema>;
export const trimQuestion = (question: Question): Question => ({
  ...question,
  tags: [...new Set(question.tags.map((tag) => tag.trim().toLowerCase()))],
  problem: question.problem.trim(),
  solution: question.solution.trim(),
});
