/* eslint-disable import/no-cycle */
import { motion } from 'framer-motion';
import { Flex, Box } from '@chakra-ui/react';

const MotionFlex = motion.custom(Flex);
const MotionBox = motion.custom(Box);

export { MotionFlex, MotionBox };

export { Footer } from './footer';
export { Layout } from './layout';
export { PreviewAlert } from './previewAlert';
export { PostCard } from './postCard';
export { Date } from './date';
export { Fallback } from './fallback';
export { Callout } from './callout';
export { ChatBuble } from './chatBuble';
export { MXDComponents } from './mdxComponents';
