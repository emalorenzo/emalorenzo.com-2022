import { format, parseISO } from 'date-fns';

interface Props {
  date: string;
}

export const Date = ({ date }: Props) => {
  if (!date) {
    return null;
  }
  const parsedDate = parseISO(date);
  return <time dateTime={date}>{format(parsedDate, 'LLLL	d, yyyy')}</time>;
};
