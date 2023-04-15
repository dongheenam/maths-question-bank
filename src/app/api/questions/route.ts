import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/utils';

import createQuestion from './createQuestion';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.name) {
      throw new Error('Api called without a valid session.');
    }

    const body = await req.json();
    const { topic, yearLevel, tags, problem, solution } = body;
    if (!topic || !yearLevel || !tags || !problem || !solution) {
      throw new Error(
        'Missing required fields in request body. Received: ' +
          JSON.stringify(body)
      );
    }
    const _id = await createQuestion({
      topic,
      yearLevel,
      tags,
      problem,
      solution,
    });
    if (!_id) {
      throw new Error('Question is created, but returned a null ID.');
    }
    return NextResponse.json({ _id });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
