import { DefinitionCard, KeyTakeaway, PhilosopherCard, QuoteBlock, ComparisonTable } from '../components/content';
import { KnowledgeCheck } from '../components/interactive/assessments';
import { module11Quiz } from './quizzes';

export function Module11Content() {
  return (
    <div className="space-y-8">
      <section id="section-11-1">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">11.1 The Analytic Tradition</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-4">While existentialism flourished on the continent, a different style of philosophy developed in Britain and America: analytic philosophy, focused on language, logic, and clarity.</p>
        <DefinitionCard term="Analytic Philosophy" definition="A tradition emphasizing clarity, logical analysis, and careful attention to language. It views many philosophical problems as arising from linguistic confusion." />
      </section>

      <section id="section-11-2" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">11.2 Russell and Early Analytic Philosophy</h2>
        <PhilosopherCard name="Bertrand Russell" years="1872 - 1970" location="England" school="Analytic Philosophy" keyIdeas={['Logical atomism', 'Theory of descriptions', 'Principia Mathematica']} quote="The good life is one inspired by love and guided by knowledge." />
        <p className="text-slate-700 dark:text-slate-300 mb-4">Russell believed that careful logical analysis could dissolve many philosophical problems. His theory of descriptions showed how to analyze statements about things that don't exist.</p>
      </section>

      <section id="section-11-3" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">11.3 Wittgenstein's Two Philosophies</h2>
        <PhilosopherCard name="Ludwig Wittgenstein" years="1889 - 1951" location="Austria/England" school="Analytic Philosophy" keyIdeas={['Picture theory of meaning', 'Language games', 'Family resemblance', 'Private language argument']} quote="Whereof one cannot speak, thereof one must be silent." />
        <p className="text-slate-700 dark:text-slate-300 mb-4">Wittgenstein developed two distinct philosophies:</p>
        <ComparisonTable headers={['Early Wittgenstein', 'Later Wittgenstein']} rows={[['Language pictures facts', 'Meaning is use'], ['One logical structure', 'Many language games'], ['Clear limits of language', 'Language as social practice'], ['Tractatus Logico-Philosophicus', 'Philosophical Investigations']]} />
        <KeyTakeaway><p>Later Wittgenstein argued that philosophical problems arise when language "goes on holiday"—when we misuse words outside their normal contexts.</p></KeyTakeaway>
      </section>

      <section id="section-11-4" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">11.4 Logical Positivism</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-4">The Vienna Circle developed logical positivism, which held that meaningful statements must be either analytic (true by definition) or empirically verifiable.</p>
        <DefinitionCard term="Verification Principle" definition="A statement is meaningful only if it is either analytically true or can in principle be verified by experience. Metaphysical claims, by this standard, are meaningless." />
        <p className="text-slate-700 dark:text-slate-300 mb-4">This threatened to dismiss most of traditional philosophy—ethics, metaphysics, aesthetics—as meaningless. The principle itself faced problems: is it verifiable?</p>
      </section>

      <section id="section-11-5" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Module Summary</h2>
        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>Analytic philosophy emphasizes clarity and logical analysis</li>
            <li>Russell used logic to dissolve philosophical problems</li>
            <li>Early Wittgenstein: language pictures reality</li>
            <li>Later Wittgenstein: meaning is use in language games</li>
            <li>Logical positivism tried to eliminate metaphysics</li>
          </ul>
        </div>
        <p className="text-slate-700 dark:text-slate-300 mt-6"><strong>Next up:</strong> In Module 12, we survey contemporary philosophy and its relevance today.</p>
      </section>

      <section id="section-11-6" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Knowledge Check</h2>
        <KnowledgeCheck moduleId={11} title="Module 11: Analytic Philosophy" questions={module11Quiz} />
      </section>
    </div>
  );
}
