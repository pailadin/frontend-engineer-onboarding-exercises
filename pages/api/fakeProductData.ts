import { NextApiRequest, NextApiResponse } from 'next';

const PRODUCT = {
  image: '/annie-spratt-QckxruozjRg-unsplash.jpg',
  title: 'ReactJS',
  description:
    'Repudiandae sint consequuntur vel. Amet ut nobis explicabo numquam expedita quia omnis voluptatem. Minus quidem ipsam quia iusto.',
};

const handler = (_req: NextApiRequest, res: NextApiResponse): void => {
  res.status(200).json(Array(12 * 10).fill(PRODUCT));
};

export default handler;
