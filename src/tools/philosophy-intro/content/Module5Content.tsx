import { DefinitionCard, KeyTakeaway, PhilosopherCard, QuoteBlock, ComparisonTable } from '../components/content';
import { KnowledgeCheck } from '../components/interactive/assessments';
import { module05Quiz } from './quizzes';

export function Module5Content() {
  return (
    <div className="space-y-8">
      <section id="section-5-1">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          5.1 Philosophy in the Age of Faith
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          After the fall of Rome (476 CE), Europe entered a period where Christianity dominated 
          intellectual life. Philosophy became intertwined with theology. The central question 
          became: How do faith and reason relate?
        </p>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          During this period, much of Greek philosophy was preserved and transmitted through 
          Islamic scholars, who translated Aristotle into Arabic and added their own commentaries.
        </p>
      </section>

      <section id="section-5-2" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          5.2 Augustine of Hippo
        </h2>

        <PhilosopherCard
          name="Augustine of Hippo"
          years="354 - 430 CE"
          location="North Africa (Roman Empire)"
          school="Christian Platonism"
          keyIdeas={['Original sin', 'Divine illumination', 'Free will', 'City of God']}
          quote="Faith seeks understanding."
        />

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Augustine was one of the most influential Christian thinkers. Before his conversion, 
          he explored various philosophies including Manichaeism and Neoplatonism. He eventually 
          synthesized Platonic philosophy with Christian doctrine.
        </p>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          For Augustine, Plato's Forms became ideas in the mind of God. The Form of the Good 
          became God himself. Knowledge comes not from recollecting Forms but through divine 
          illumination—God enlightening our minds.
        </p>

        <QuoteBlock
          quote="You have made us for yourself, O Lord, and our hearts are restless until they rest in you."
          author="Augustine"
          source="Confessions"
        />

        <KeyTakeaway>
          <p>
            Augustine showed how ancient philosophy could be integrated with Christian belief, 
            setting the pattern for medieval philosophy.
          </p>
        </KeyTakeaway>
      </section>

      <section id="section-5-3" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          5.3 Thomas Aquinas
        </h2>

        <PhilosopherCard
          name="Thomas Aquinas"
          years="1225 - 1274 CE"
          location="Italy"
          school="Scholasticism"
          keyIdeas={['Five Ways', 'Natural law', 'Faith and reason harmony', 'Natural theology']}
          quote="To one who has faith, no explanation is necessary. To one without faith, no explanation is possible."
        />

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Aquinas lived during the rediscovery of Aristotle's works in Western Europe. While 
          Augustine drew on Plato, Aquinas synthesized Christian theology with Aristotelian 
          philosophy.
        </p>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Aquinas believed that faith and reason are complementary. Reason can prove certain 
          truths about God (natural theology), while other truths require revelation.
        </p>

        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
          The Five Ways
        </h3>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Aquinas offered five arguments for God's existence:
        </p>

        <ol className="list-decimal pl-6 space-y-3 text-slate-700 dark:text-slate-300 mb-6">
          <li><strong>Motion:</strong> Things move, but nothing moves itself. There must be an unmoved mover.</li>
          <li><strong>Causation:</strong> Every effect has a cause. There must be a first cause.</li>
          <li><strong>Contingency:</strong> Things come into and go out of existence. Something must exist necessarily.</li>
          <li><strong>Gradation:</strong> Things have degrees of perfection. There must be a most perfect being.</li>
          <li><strong>Design:</strong> Nature shows order and purpose. There must be an intelligent designer.</li>
        </ol>

        <KeyTakeaway>
          <p>
            Aquinas argued that reason alone can lead us to God's existence, even without 
            revelation. His synthesis of faith and reason became the official philosophy of 
            the Catholic Church.
          </p>
        </KeyTakeaway>
      </section>

      <section id="section-5-4" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          5.4 Faith vs. Reason Debate
        </h2>

        <ComparisonTable
          headers={['Position', 'View', 'Example']}
          rows={[
            ['Faith alone', 'Reason is irrelevant or harmful to faith', 'Tertullian'],
            ['Reason supporting faith', 'Reason can prove some religious truths', 'Aquinas'],
            ['Faith seeking understanding', 'Faith comes first, then seek to understand', 'Anselm, Augustine'],
            ['Double truth', 'Faith and reason can reach different truths', 'Averroes (debated)'],
          ]}
        />

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          This debate continues today. Can religious beliefs be rationally justified? Do faith 
          and science conflict? Medieval philosophers laid the groundwork for these discussions.
        </p>
      </section>

      <section id="section-5-5" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Module Summary
        </h2>

        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>Medieval philosophy merged classical philosophy with Christian theology</li>
            <li>Augustine synthesized Christianity with Platonic ideas</li>
            <li>Aquinas combined Aristotelian philosophy with Christian doctrine</li>
            <li>The Five Ways attempt to prove God's existence through reason</li>
            <li>The relationship between faith and reason was the central problem</li>
          </ul>
        </div>

        <p className="text-slate-700 dark:text-slate-300 mt-6">
          <strong>Next up:</strong> In Module 6, we enter the modern era with Descartes, who 
          attempted to rebuild philosophy from the ground up.
        </p>
      </section>

      <section id="section-5-6" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Knowledge Check
        </h2>
        <p className="text-slate-700 dark:text-slate-300 mb-6">
          Test your understanding of the concepts covered in this module.
        </p>
        <KnowledgeCheck
          moduleId={5}
          title="Module 5: Medieval Philosophy"
          questions={module05Quiz}
        />
      </section>
    </div>
  );
}
