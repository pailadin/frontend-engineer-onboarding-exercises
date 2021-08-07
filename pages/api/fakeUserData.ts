import { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  const {
    email = 'jdoe@example.com',
    firstName = 'Jane',
    lastName = 'Doe',
  } = req.method === 'POST' ? JSON.parse(req.body) : {};

  res.status(200).json({
    token: 'verylegitimatetoken',
    email,
    firstName,
    lastName,
  });
};

export default handler;
