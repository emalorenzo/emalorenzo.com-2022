import { Text, TextProps } from '@chakra-ui/react';
import { parseISO, format } from 'date-fns';

interface Props {
  date: string;
}

export const Date = ({ date, ...props }: Props & TextProps) => {
  if (!date) {
    return null;
  }
  const parsedDate = parseISO(date);
  return (
    <Text as="time" dateTime={date} {...props}>
      {format(parsedDate, 'LLLL	d, yyyy')}
    </Text>
  );
};
