import { DefinitionCard, KeyTakeaway, PhilosopherCard, QuoteBlock, ComparisonTable } from '../components/content';
import { KnowledgeCheck } from '../components/interactive/assessments';
import { module08Quiz } from './quizzes';

export function Module8Content() {
  return (
    <div className="space-y-8">
      <section id="section-8-1">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">8.1 Awakened from Dogmatic Slumber</h2>
        <PhilosopherCard name="Immanuel Kant" years="1724 - 1804" location="Konigsberg, Prussia" school="German Idealism" keyIdeas={['Critique of Pure Reason', 'Categorical imperative', 'Phenomena vs noumena', 'Synthetic a priori']} quote="Two things fill the mind with ever new and increasing admiration and awe: the starry heavens above me and the moral law within me." />
        <p className="text-slate-700 dark:text-slate-300 mb-4">Kant said that Hume's skepticism "awakened him from his dogmatic slumber." He set out to save both science and morality from skeptical attack.</p>
      </section>

      <section id="section-8-2" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">8.2 The Critique of Pure Reason</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-4">Kant asked: How is knowledge possible? His answer revolutionized philosophy.</p>
        <p className="text-slate-700 dark:text-slate-300 mb-4">Both rationalists and empiricists assumed the mind passively receives the world. Kant argued the mind actively structures experience. Space, time, and causation are not "out there" but are conditions the mind imposes on experience.</p>
        <DefinitionCard term="Copernican Revolution in Philosophy" definition="Instead of knowledge conforming to objects, objects (as we experience them) conform to our cognitive faculties. We don't discover order in the world; we impose it." />
        <ComparisonTable headers={['Concept', 'Meaning']} rows={[['Phenomena', 'Things as they appear to us, structured by our minds'], ['Noumena', 'Things in themselves, unknowable'], ['A priori', 'Knowledge independent of experience'], ['Synthetic a priori', 'Knowledge that is both informative and necessary']]} />
        <KeyTakeaway><p>We can have certain knowledge of how things must appear to us, but we can never know things as they are in themselves. This limits but also secures our knowledge.</p></KeyTakeaway>
      </section>

      <section id="section-8-3" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">8.3 The Categorical Imperative</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-4">In ethics, Kant sought a universal moral principle grounded in reason alone. He called this the categorical imperative.</p>
        <DefinitionCard term="Categorical Imperative" definition="Act only according to that maxim which you can at the same time will to be a universal law. In other words, ask: What if everyone did this?" />
        <p className="text-slate-700 dark:text-slate-300 mb-4">Kant gave several formulations:</p>
        <ol className="list-decimal pl-6 space-y-2 text-slate-700 dark:text-slate-300 mb-6">
          <li><strong>Universal Law:</strong> Act only on maxims you could will to be universal laws</li>
          <li><strong>Humanity:</strong> Treat humanity, in yourself and others, always as an end and never merely as a means</li>
          <li><strong>Autonomy:</strong> Act as if you were a legislator in a kingdom of ends</li>
        </ol>
        <QuoteBlock quote="Act in such a way that you treat humanity, whether in your own person or in the person of any other, never merely as a means to an end, but always at the same time as an end." author="Kant" source="Groundwork of the Metaphysics of Morals" />
      </section>

      <section id="section-8-4" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">8.4 Kant's Legacy</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-4">Kant's philosophy transformed every area of thought. His ethics of duty influenced human rights discourse. His epistemology shaped debates about science and knowledge. His aesthetics influenced art criticism.</p>
        <KeyTakeaway><p>After Kant, philosophy could no longer ignore the role of the knowing subject. How we experience the world depends partly on what we bring to experience.</p></KeyTakeaway>
      </section>

      <section id="section-8-5" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Module Summary</h2>
        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>Kant synthesized rationalism and empiricism</li>
            <li>The mind actively structures experience</li>
            <li>We know phenomena (appearances) but not noumena (things in themselves)</li>
            <li>The categorical imperative provides a universal moral test</li>
            <li>Treat people as ends, never merely as means</li>
          </ul>
        </div>
        <p className="text-slate-700 dark:text-slate-300 mt-6"><strong>Next up:</strong> In Module 9, we explore the 19th century reactions to Kant from Hegel, Marx, and Nietzsche.</p>
      </section>

      <section id="section-8-6" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Knowledge Check</h2>
        <KnowledgeCheck moduleId={8} title="Module 8: Kant's Revolution" questions={module08Quiz} />
      </section>
    </div>
  );
}
