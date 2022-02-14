import { Alert, AlertIcon, Link } from '@chakra-ui/react';

export const PreviewAlert = () => (
  <Alert status="warning">
    <AlertIcon />
    This page is a preview,
    <Link href="/api/exit-preview">Click here</Link>
    to exit preview mode.
  </Alert>
);
