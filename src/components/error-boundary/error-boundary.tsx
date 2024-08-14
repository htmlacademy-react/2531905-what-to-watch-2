import { useRollbar } from '@rollbar/react';

function ErrorBoundary() {
  const rollbar = useRollbar();
  rollbar.error('Error occurred', 'Unknown error');

  return (
    <p>Error occurred</p>
  );
}

export default ErrorBoundary;
