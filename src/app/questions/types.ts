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
  _id: z.string(),
  topic: topicSchema,
  yearLevel: yearSchema,
  tags: z.array(z.string()),
  problem: z.string(),
  solution: z.string(),
  reference: z.string(),
  isExtension: z.boolean(),
});
// question fetched from MongoDB has an _id field of type ObjectId
// which cannot be used client-side
export type Question = z.infer<typeof questionSchema>;
export type QuestionServer = Omit<Question, '_id'> & { _id: ObjectId };
export const trimQuestion = (question: Question): Question => ({
  ...question,
  tags: [...new Set(question.tags.map((tag) => tag.trim().toLowerCase()))],
  problem: question.problem.trim(),
  solution: question.solution.trim(),
});

export const questionQuerySchema = questionSchema
  .pick({
    topic: true,
    yearLevel: true,
    tags: true,
    isExtension: true,
  })
  .extend({
    text: z.string(),
  })
  .partial();
export type QuestionQuery = z.infer<typeof questionQuerySchema>;
