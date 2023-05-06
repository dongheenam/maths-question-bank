import { getServerSession } from 'next-auth';
import { authOptions } from '@/common/server/authUtils';

import createQuestion from './createQuestion';
import { NextResponse } from 'next/server';
import { questionSchema } from '@/app/questions/types';
import zodErrorParser from '@/common/zodErrorParser';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.name) {
      return NextResponse.json(
        {
          error: 'Api called without a valid session.',
        },
        { status: 401 }
      );
    }

    const body = await req.json();
    const result = questionSchema.safeParse(body);
    if (!result.success) {
      const errorMessage = zodErrorParser(result.error);
      throw new Error(errorMessage);
    }

    const _id = await createQuestion(result.data);
    if (!_id) {
      throw new Error('Database server error.');
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
