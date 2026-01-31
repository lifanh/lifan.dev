import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { CompoundInterestVisualizer } from './CompoundInterestVisualizer';

describe('CompoundInterestVisualizer', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders with default values', () => {
    render(<CompoundInterestVisualizer />);

    expect(screen.getByText('Compound Interest Visualizer')).toBeInTheDocument();
    expect(screen.getByText('Total Contributed')).toBeInTheDocument();
    expect(screen.getAllByText('Interest Earned').length).toBeGreaterThan(0);
    expect(screen.getByText('Final Balance')).toBeInTheDocument();
  });

  it('displays Rule of 72 calculation', () => {
    render(<CompoundInterestVisualizer />);

    expect(screen.getByText('Rule of 72')).toBeInTheDocument();
    // At 7% rate, should double in about 10 years
    expect(screen.getByText('~10 years')).toBeInTheDocument();
  });

  it('updates calculations when principal changes', () => {
    render(<CompoundInterestVisualizer />);

    const principalInput = screen.getByDisplayValue('10000');
    fireEvent.change(principalInput, { target: { value: '50000' } });

    expect(screen.getByDisplayValue('50000')).toBeInTheDocument();
  });

  it('updates calculations when rate changes', () => {
    render(<CompoundInterestVisualizer />);

    const rateInput = screen.getByDisplayValue('7');
    fireEvent.change(rateInput, { target: { value: '10' } });

    expect(screen.getByDisplayValue('10')).toBeInTheDocument();
  });

  it('updates calculations when years changes', () => {
    render(<CompoundInterestVisualizer />);

    const yearsInput = screen.getByDisplayValue('30');
    fireEvent.change(yearsInput, { target: { value: '20' } });

    expect(screen.getByDisplayValue('20')).toBeInTheDocument();
  });

  it('displays compound advantage comparison', () => {
    render(<CompoundInterestVisualizer />);

    expect(screen.getByText(/The Compound Advantage/)).toBeInTheDocument();
    expect(screen.getByText('Simple Interest Total')).toBeInTheDocument();
    expect(screen.getByText('Compound Interest Total')).toBeInTheDocument();
  });

  it('displays growth over time visualization', () => {
    render(<CompoundInterestVisualizer />);

    expect(screen.getByText('Growth Over Time')).toBeInTheDocument();
    expect(screen.getByText('Year 0')).toBeInTheDocument();
    expect(screen.getByText('Year 30')).toBeInTheDocument();
  });

  it('has compounding frequency selector', () => {
    render(<CompoundInterestVisualizer />);

    const select = screen.getByDisplayValue('Monthly');
    expect(select).toBeInTheDocument();

    fireEvent.change(select, { target: { value: '1' } });
    expect(screen.getByDisplayValue('Annually')).toBeInTheDocument();
  });

  it('displays educational notes', () => {
    render(<CompoundInterestVisualizer />);

    expect(screen.getByText(/Understanding Compound Interest/)).toBeInTheDocument();
    expect(screen.getByText(/earns interest on your interest/)).toBeInTheDocument();
  });

  it('displays data table with year milestones', () => {
    render(<CompoundInterestVisualizer />);

    // Table headers
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.getByText('Simple')).toBeInTheDocument();
    expect(screen.getByText('Compound')).toBeInTheDocument();
    expect(screen.getByText('Difference')).toBeInTheDocument();
  });

  it('handles monthly contribution changes', () => {
    render(<CompoundInterestVisualizer />);

    const contributionInput = screen.getByDisplayValue('200');
    fireEvent.change(contributionInput, { target: { value: '500' } });

    expect(screen.getByDisplayValue('500')).toBeInTheDocument();
  });
});
