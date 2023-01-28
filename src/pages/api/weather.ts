// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const latitude: number = 1.2;
  const longitude: number = 1.2;
  res.status(200).json({ name: 'John Doe' });
}
