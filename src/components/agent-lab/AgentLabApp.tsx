import { useMemo, useState } from 'react';
import { scenarios } from '../../data/agent-lab/scenarios';
import { runScenario } from '../../lib/agent-lab/agentRunner';
import type { Scenario, TraceEvent } from '../../lib/agent-lab/types';
import ApprovalGate from './ApprovalGate';
import ToolCallPanel from './ToolCallPanel';
import TraceTimeline from './TraceTimeline';

export default function AgentLabApp() {
  const [selectedScenarioId, setSelectedScenarioId] = useState(scenarios[0].id);
  const [trace, setTrace] = useState<TraceEvent[]>([]);
  const [finalAnswer, setFinalAnswer] = useState('');
  const [needsApproval, setNeedsApproval] = useState(false);

  const selectedScenario = useMemo(
    () => scenarios.find((scenario: Scenario) => scenario.id === selectedScenarioId) ?? scenarios[0],
    [selectedScenarioId],
  );

  const run = async (approval = false) => {
    const result = await runScenario(selectedScenario, approval);
    setTrace(result.trace);
    setFinalAnswer(result.finalAnswer);
    setNeedsApproval(result.requiresApproval);
  };

  const latestToolCall = [...trace].reverse().find(event => event.type === 'tool_call');

  return (
    <section className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Agent Engineering Lab</h1>
        <p className="text-slate-600 dark:text-slate-300">Inspect each step of an agent workflow: tools, policy, approvals, and final recommendation.</p>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Scenario</label>
        <select value={selectedScenarioId} onChange={event => setSelectedScenarioId(event.target.value)} className="w-full p-2 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800">
          {scenarios.map(scenario => (
            <option key={scenario.id} value={scenario.id}>{scenario.title}</option>
          ))}
        </select>
        <button type="button" onClick={() => run(false)} className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors">Run simulation</button>
        <ApprovalGate visible={needsApproval} onApprove={() => run(true)} onReject={() => setNeedsApproval(false)} />
        <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-4">
          <h2 className="font-semibold mb-2">Final answer</h2>
          <p className="text-sm text-slate-700 dark:text-slate-300">{finalAnswer || 'Run a scenario to produce an answer.'}</p>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <h2 className="font-semibold mb-2">Trace timeline</h2>
          <TraceTimeline trace={trace} />
        </div>
        <div>
          <h2 className="font-semibold mb-2">Latest tool call payload</h2>
          <ToolCallPanel event={latestToolCall} />
        </div>
      </div>
    </section>
  );
}
