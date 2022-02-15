import React from 'react';
import styled from 'styled-components';

import { ChatBuble } from '@/components';
import { useInterval } from '@/hooks';

export interface Buble {
  id: number;
  content: React.ReactElement;
  duration: number;
}

interface Props {
  chatData: Buble[];
  initialDelay?: number;
}

export type Status = 'LOADING' | 'MESSAGE' | 'COMPACT';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const Chat = ({ chatData, initialDelay, ...props }: Props) => {
  const [bubleIndex, setBubleIndex] = React.useState(-1);

  const calculateInterval = () => {
    // loading first message
    if (bubleIndex < 0) {
      return initialDelay;
    }
    // buble duration
    if (bubleIndex < chatData.length) {
      return chatData[bubleIndex].duration;
    }
    // already iterated all bubles, stop interval passing null
    return null;
  };

  const calculateStatusForBuble = (i: number): Status => {
    switch (true) {
      case i - 1 === bubleIndex:
        return 'LOADING';
      case i === bubleIndex:
        return 'MESSAGE';
      case i < bubleIndex:
        return 'COMPACT';
      default:
        return null;
    }
  };

  useInterval(() => {
    setBubleIndex(bubleIndex + 1);
  }, calculateInterval());

  const chat = chatData.map(({ id, content }, i) => {
    const status = calculateStatusForBuble(i);
    return <ChatBuble key={id} status={status} content={content} />;
  });

  return <Wrapper {...props}>{chat}</Wrapper>;
};

Chat.defaultProps = {
  initialDelay: 2000,
};
