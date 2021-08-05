// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  const { email, firstName, lastName } =
    req.method === 'POST'
      ? JSON.parse(req.body)
      : {
          email: 'jdoe@example.com',
          firstName: 'Jane',
          lastName: 'Doe',
        };

  res.status(200).json({
    token: 'verylegitimatetoken',
    email,
    firstName,
    lastName,
  });
};

export default handler;
