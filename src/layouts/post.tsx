import Image from 'next/image';
import { motion } from 'framer-motion';

export const PostLayout = ({ post, preview }) => {
  const { content, title, categories } = post;
  return (
    <main>
      <motion.article
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {content}
      </motion.article>
    </main>
  );
};
