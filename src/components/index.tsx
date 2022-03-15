import { CodeSnippet } from './CodeSnippet';

export { Date } from './Date';
export { Fallback } from './Fallback';
export { GlobalStyles } from './GlobalStyles';
export { Head } from './Head';
export { Header } from './Header';
export { OverflowHidden } from './OverflowHidden';
export { PostCard } from './postCard';
export { VideoAvatar } from './VideoAvatar';

export { CodeSnippet };

export const MXDComponents = {
  pre: (props) => <CodeSnippet {...props} />,
};