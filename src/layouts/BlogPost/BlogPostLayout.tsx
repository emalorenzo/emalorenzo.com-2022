import { motion } from 'framer-motion';
import Image from 'next/image';

export const BlogPostLayout = ({ post, preview }) => {
  const { content, title, categories } = post;
  return (
    <main style={{ marginTop: '12rem', padding: '0 20rem' }}>
      <motion.article
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.5 }}
      >
        {content}
      </motion.article>
    </main>
  );
};
