import { NextApiRequest } from 'next';

export const getBodyFromReq = (req: NextApiRequest): Record<string, unknown> => {
  try {
    if (req.method === 'POST') {
      return JSON.parse(req.body);
    }
  } catch (e) {}

  return {};
};
