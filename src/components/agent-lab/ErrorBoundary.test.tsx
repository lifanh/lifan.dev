import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { ErrorBoundary } from './ErrorBoundary';

function Boom({ throwOnRender }: { throwOnRender: boolean }) {
  if (throwOnRender) {
    throw new Error('synthetic boom');
  }
  return <p>recovered</p>;
}

function Harness() {
  const [throwing, setThrowing] = useState(true);
  return (
    <ErrorBoundary
      fallback={({ error, reset }) => (
        <div>
          <p>boundary caught: {error.message}</p>
          <button
            type="button"
            onClick={() => {
              setThrowing(false);
              reset();
            }}
          >
            recover
          </button>
        </div>
      )}
    >
      <Boom throwOnRender={throwing} />
    </ErrorBoundary>
  );
}

describe('ErrorBoundary', () => {
  it('renders fallback when a child throws and recovers when reset', () => {
    // Suppress the expected React error log
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    render(<Harness />);

    expect(screen.getByText(/boundary caught: synthetic boom/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /recover/i }));

    expect(screen.getByText(/recovered/i)).toBeInTheDocument();

    errorSpy.mockRestore();
  });

  it('renders the default fallback with a Reset lab button when no fallback is provided', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    render(
      <ErrorBoundary>
        <Boom throwOnRender />
      </ErrorBoundary>,
    );

    expect(screen.getByText(/Agent Lab hit an unexpected error/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reset lab/i })).toBeInTheDocument();

    errorSpy.mockRestore();
  });
});
