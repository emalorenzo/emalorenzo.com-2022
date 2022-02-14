import React from 'react';
import { Flex, FlexProps } from '@chakra-ui/react';

import { ChatBuble } from 'src/components';
import { useInterval } from 'src/hooks';

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

export const Chat = ({
  chatData,
  initialDelay,
  ...props
}: Props & FlexProps) => {
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

  return (
    <Flex {...props} direction="column" justify="flex-start">
      {chat}
    </Flex>
  );
};

Chat.defaultProps = {
  initialDelay: 2000,
};
