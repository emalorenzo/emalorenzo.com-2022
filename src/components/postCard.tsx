import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import NextLink from 'next/link';

import { imageBuilder } from '@/lib/sanity';
import { COLORS } from '@/theme';

const CARD_HEIGHT = 400;

export const PostCard = ({ post }) => {
  const cardBackground = '#000';
  const {
    title = '',
    slug = '',
    mainImage,
    categories,
    excerpt = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vehicula ipsum id mauris dictum mattis. In sed pellentesque enim.',
  } = post;
  const image = imageBuilder
    .image(mainImage)
    .height(CARD_HEIGHT)
    .width(300)
    .url();
  console.log('post', post);

  const tags =
    categories?.length &&
    categories.map((categorie) => <span key={categorie}>{categorie}</span>);

  return (
    <NextLink href={`/blog/${slug}`} passHref>
      <a>
        <motion.div layoutId={`${slug}-container`} initial={{ y: 0 }}>
          <Image
            src={image || '/images/ema.png'}
            alt="post illustration"
            height={CARD_HEIGHT}
            width={300}
          />
          <div
            style={{
              backdropFilter: 'saturate(180%) blur(20px)',
            }}
          >
            {tags}
            <h3>{title}</h3>
            <p>{excerpt}</p>
          </div>
        </motion.div>
      </a>
    </NextLink>
  );
};
