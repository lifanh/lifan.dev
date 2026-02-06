import { DefinitionCard, KeyTakeaway, PhilosopherCard, QuoteBlock, ComparisonTable } from '../components/content';
import { KnowledgeCheck } from '../components/interactive/assessments';
import { module09Quiz } from './quizzes';

export function Module9Content() {
  return (
    <div className="space-y-8">
      <section id="section-9-1">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">9.1 German Idealism</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-4">The 19th century saw dramatic philosophical developments. German idealists tried to complete Kant's project, while others challenged the entire tradition.</p>
      </section>

      <section id="section-9-2" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">9.2 Hegel's Dialectic</h2>
        <PhilosopherCard name="G.W.F. Hegel" years="1770 - 1831" location="Germany" school="Absolute Idealism" keyIdeas={['Dialectic', 'Absolute Spirit', 'History as progress', 'Master-slave dialectic']} quote="The owl of Minerva spreads its wings only with the falling of dusk." />
        <p className="text-slate-700 dark:text-slate-300 mb-4">Hegel saw history as the development of Spirit (Geist) toward self-understanding. This happens through a dialectical process:</p>
        <DefinitionCard term="Hegelian Dialectic" definition="A process where a thesis generates its antithesis (opposition), and the tension is resolved in a synthesis that transcends both while preserving what was true in each." />
        <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-6 my-6">
          <p className="text-slate-700 dark:text-slate-300"><strong>Thesis:</strong> An initial position or idea</p>
          <p className="text-slate-700 dark:text-slate-300"><strong>Antithesis:</strong> The opposite or negation of the thesis</p>
          <p className="text-slate-700 dark:text-slate-300"><strong>Synthesis:</strong> A higher unity that reconciles both</p>
        </div>
        <p className="text-slate-700 dark:text-slate-300 mb-4">For Hegel, this process operates in thought, history, and reality itself. History is progress toward freedom and rationality.</p>
      </section>

      <section id="section-9-3" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">9.3 Marx and Historical Materialism</h2>
        <PhilosopherCard name="Karl Marx" years="1818 - 1883" location="Germany/England" school="Marxism" keyIdeas={['Historical materialism', 'Class struggle', 'Alienation', 'Critique of capitalism']} quote="The philosophers have only interpreted the world; the point is to change it." />
        <p className="text-slate-700 dark:text-slate-300 mb-4">Marx "turned Hegel on his head." While Hegel saw ideas driving history, Marx argued that material economic conditions are fundamental.</p>
        <DefinitionCard term="Historical Materialism" definition="The theory that economic conditions (modes of production) form the base that shapes social structures, politics, and ideas (the superstructure)." />
        <p className="text-slate-700 dark:text-slate-300 mb-4">Marx analyzed capitalism as a system of exploitation where workers are alienated from their labor, products, fellow workers, and human nature itself. He predicted capitalism would give way to communism through class struggle.</p>
        <QuoteBlock quote="Workers of the world, unite! You have nothing to lose but your chains." author="Marx and Engels" source="The Communist Manifesto" />
      </section>

      <section id="section-9-4" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">9.4 Nietzsche's Transvaluation</h2>
        <PhilosopherCard name="Friedrich Nietzsche" years="1844 - 1900" location="Germany" school="Existentialism precursor" keyIdeas={['Will to power', 'Ubermensch', 'Eternal recurrence', 'Master/slave morality']} quote="God is dead. God remains dead. And we have killed him." />
        <p className="text-slate-700 dark:text-slate-300 mb-4">Nietzsche proclaimed the "death of God"—not a theological claim but a cultural observation. Traditional values, based on religion, have lost their power. We must create new values.</p>
        <DefinitionCard term="Will to Power" definition="The fundamental drive of life, not toward survival or pleasure, but toward growth, expansion, and self-overcoming." />
        <p className="text-slate-700 dark:text-slate-300 mb-4">Nietzsche criticized traditional morality as "slave morality"—a morality of the weak designed to restrain the strong. He called for a "transvaluation of all values" and the emergence of the Ubermensch (overman) who creates their own values.</p>
        <KeyTakeaway><p>Nietzsche challenges us to examine where our values come from. Are they life-affirming or life-denying? Do they express strength or weakness?</p></KeyTakeaway>
      </section>

      <section id="section-9-5" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Module Summary</h2>
        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>Hegel: History is Spirit's development through dialectic</li>
            <li>Marx: Material conditions, not ideas, drive history</li>
            <li>Nietzsche: God is dead; we must create new values</li>
            <li>All three influenced 20th century thought profoundly</li>
          </ul>
        </div>
        <p className="text-slate-700 dark:text-slate-300 mt-6"><strong>Next up:</strong> In Module 10, we explore existentialism and its response to these challenges.</p>
      </section>

      <section id="section-9-6" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Knowledge Check</h2>
        <KnowledgeCheck moduleId={9} title="Module 9: 19th Century Philosophy" questions={module09Quiz} />
      </section>
    </div>
  );
}
