import { getBodyFromReq } from '@utils/api';
import { NextApiRequest, NextApiResponse } from 'next';

const PRODUCT = {
  image: '/default-product-image.jpg',
  name: 'ReactJS',
  description:
    'Repudiandae sint consequuntur vel. Amet ut nobis explicabo numquam expedita quia omnis voluptatem. Minus quidem ipsam quia iusto.',
};

const DEFAULT_NUMBER_OF_PAGES = 12 * 10 - 1;

const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  const { pages = DEFAULT_NUMBER_OF_PAGES } = getBodyFromReq(req);

  res.status(200).json(
    Array(Math.max(0, Number(pages)))
      .fill(PRODUCT)
      .map((x, i) => ({
        id: String(i),
        ...x,
      }))
  );
};

export default handler;
