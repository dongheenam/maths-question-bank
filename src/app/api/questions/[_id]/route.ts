import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/common/server/authUtils';
import { questionSchema } from '@/app/questions/types';
import editQuestion from '../editQuestion';

type Params = {
  _id: string;
};
export async function PATCH(req: Request, { params }: { params: Params }) {
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
    const _id = params._id;
    if (!_id) {
      return NextResponse.json(
        {
          error: 'Question ID is required.',
        },
        { status: 400 }
      );
    }

    const body = await req.json();
    const questionData = questionSchema.parse({ ...body });
    await editQuestion({ _id, ...questionData });

    return NextResponse.json({ success: true });
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
