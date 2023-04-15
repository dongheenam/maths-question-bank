import { getServerSession } from 'next-auth';
import { authOptions } from '@/common/server/authUtils';

import createQuestion from './createQuestion';
import { NextResponse } from 'next/server';
import { questionSchema } from '@/app/questions/types';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.name) {
      throw new Error('Api called without a valid session.');
    }

    const body = await req.json();
    const questionData = questionSchema.parse(body);
    const _id = await createQuestion(questionData);
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
