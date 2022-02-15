/* eslint-disable react/jsx-boolean-value */
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Wrapper = styled.button`
  overflow: hidden;
  border-radius: 50%;
  width: 200px;
  height: 200px;
  border: 2px solid hsl(0, 0%, 20%);
  background-color: hsl(252 7.936507936507936% 12.352941176470589%);
  display: grid;
  place-items: center;
`;

export const VideoAvatar = () => {
  return (
    <Wrapper>
      <motion.video
        width="150"
        height="150"
        autoPlay={true}
        loop
        muted
        initial={{ x: 150, rotate: 30 }}
        animate={{ x: 0, rotate: 0 }}
        transition={{ duration: 1 }}
        whileHover={{
          scale: 1.2,
          transition: { duration: 0.1 },
        }}
        whileTap={{ scale: 0.9, transition: { duration: 0.2 } }}
      >
        <source src="/video/ema.mp4" type="video/mp4" />
        {/* TODO: use real track */}
        <track
          src="fgsubtitles_en.vtt"
          kind="captions"
          srcLang="en"
          label="English"
        />
        Your browser does not support the video tag.
      </motion.video>
    </Wrapper>
  );
};
