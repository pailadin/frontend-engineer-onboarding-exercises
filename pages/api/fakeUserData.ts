import { getBodyFromReq } from '@utils/api';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  const { email = 'jdoe@example.com', firstName = 'Jane', lastName = 'Doe' } = getBodyFromReq(req);

  res.status(200).json({
    token: 'verylegitimatetoken',
    email,
    firstName,
    lastName,
  });
};

export default handler;
