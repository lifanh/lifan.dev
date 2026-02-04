import { DefinitionCard, KeyTakeaway, PhilosopherCard, QuoteBlock, ComparisonTable } from '../components/content';
import { KnowledgeCheck } from '../components/interactive/assessments';
import { module06Quiz } from './quizzes';

export function Module6Content() {
  return (
    <div className="space-y-8">
      <section id="section-6-1">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          6.1 The Scientific Revolution
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          The 17th century saw a revolution in how humans understood nature. Copernicus, Galileo, 
          and Newton showed that the universe operates according to mathematical laws, not 
          Aristotelian purposes.
        </p>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          This raised profound philosophical questions: If science reveals reality, what is 
          the foundation of scientific knowledge? How can we be certain of anything?
        </p>
      </section>

      <section id="section-6-2" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          6.2 Descartes' Method of Doubt
        </h2>

        <PhilosopherCard
          name="Rene Descartes"
          years="1596 - 1650"
          location="France"
          school="Rationalism"
          keyIdeas={['Cogito ergo sum', 'Method of doubt', 'Mind-body dualism', 'Clear and distinct ideas']}
          quote="I think, therefore I am."
        />

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Descartes wanted to find a foundation for knowledge that could not be doubted. His 
          method: doubt everything that can possibly be doubted until you find something certain.
        </p>

        <DefinitionCard
          term="Cartesian Doubt"
          definition="A method of systematic skepticism: reject any belief that can be doubted in order to find what is absolutely certain."
        />

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          What can be doubted?
        </p>

        <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300 mb-6">
          <li><strong>The senses:</strong> They sometimes deceive us (optical illusions)</li>
          <li><strong>The external world:</strong> We might be dreaming</li>
          <li><strong>Mathematics:</strong> An evil demon might be deceiving us</li>
        </ul>
      </section>

      <section id="section-6-3" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          6.3 Cogito Ergo Sum
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          After doubting everything, Descartes found one thing that cannot be doubted: the fact 
          that he is thinking. Even if he is being deceived, there must be an "I" being deceived.
        </p>

        <QuoteBlock
          quote="Cogito ergo sum — I think, therefore I am."
          author="Descartes"
          source="Meditations on First Philosophy"
        />

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          This became the foundation for all knowledge. From this certain starting point, 
          Descartes rebuilt philosophy:
        </p>

        <ol className="list-decimal pl-6 space-y-2 text-slate-700 dark:text-slate-300 mb-6">
          <li>I exist as a thinking thing</li>
          <li>I have the idea of a perfect being (God)</li>
          <li>This idea must come from a perfect being (therefore God exists)</li>
          <li>A perfect God would not systematically deceive me</li>
          <li>Therefore, my clear and distinct ideas are reliable</li>
          <li>The external world exists</li>
        </ol>

        <KeyTakeaway>
          <p>
            Descartes established the "I" as the starting point for philosophy—the subject 
            who thinks and knows. This turn to the subject defines modern philosophy.
          </p>
        </KeyTakeaway>
      </section>

      <section id="section-6-4" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          6.4 Rationalism vs. Empiricism
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Descartes was a rationalist, believing that reason alone can give us knowledge of 
          reality. He thought some ideas are innate—present in the mind from birth.
        </p>

        <ComparisonTable
          headers={['Rationalism', 'Empiricism']}
          rows={[
            ['Reason is primary source of knowledge', 'Experience is primary source of knowledge'],
            ['Some ideas are innate', 'Mind starts as a blank slate'],
            ['Certainty comes from clear ideas', 'Certainty comes from observation'],
            ['Descartes, Spinoza, Leibniz', 'Locke, Berkeley, Hume'],
          ]}
        />

        <DefinitionCard
          term="Mind-Body Problem"
          definition="How can mind (a non-physical thinking substance) interact with body (a physical extended substance)? Descartes' dualism makes this interaction mysterious."
        />

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Descartes' dualism—mind and body as two separate substances—raised a problem that 
          philosophers still debate: How can something non-physical (mind) affect something 
          physical (body)?
        </p>
      </section>

      <section id="section-6-5" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Module Summary
        </h2>

        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>Descartes used systematic doubt to find certain knowledge</li>
            <li>"I think, therefore I am" is the indubitable starting point</li>
            <li>Rationalism holds that reason, not experience, is primary</li>
            <li>Mind-body dualism raises the problem of their interaction</li>
            <li>Clear and distinct ideas provide the criterion for truth</li>
          </ul>
        </div>

        <p className="text-slate-700 dark:text-slate-300 mt-6">
          <strong>Next up:</strong> In Module 7, we meet the British Empiricists who challenged 
          rationalism and argued that all knowledge comes from experience.
        </p>
      </section>

      <section id="section-6-6" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Knowledge Check
        </h2>
        <p className="text-slate-700 dark:text-slate-300 mb-6">
          Test your understanding of the concepts covered in this module.
        </p>
        <KnowledgeCheck
          moduleId={6}
          title="Module 6: The Dawn of Modern Philosophy"
          questions={module06Quiz}
        />
      </section>
    </div>
  );
}
