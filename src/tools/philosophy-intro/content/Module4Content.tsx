import { DefinitionCard, KeyTakeaway, PhilosopherCard, QuoteBlock, ComparisonTable } from '../components/content';
import { KnowledgeCheck } from '../components/interactive/assessments';
import { module04Quiz } from './quizzes';

export function Module4Content() {
  return (
    <div className="space-y-8">
      <section id="section-4-1">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          4.1 The Student Who Disagreed
        </h2>

        <PhilosopherCard
          name="Aristotle"
          years="384 - 322 BCE"
          location="Athens, Greece (born in Stagira)"
          school="Aristotelianism"
          keyIdeas={['Four Causes', 'Golden Mean', 'Formal Logic', 'Virtue Ethics', 'Teleology']}
          quote="We are what we repeatedly do. Excellence, then, is not an act, but a habit."
        />

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Aristotle studied at Plato's Academy for twenty years. After Plato's death, he left 
          Athens, eventually becoming tutor to Alexander the Great. He later returned to found 
          his own school, the Lyceum.
        </p>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          While deeply influenced by Plato, Aristotle disagreed with the Theory of Forms. He 
          famously said, "Plato is dear to me, but dearer still is truth."
        </p>

        <QuoteBlock
          quote="Plato is dear to me, but dearer still is truth."
          author="Aristotle"
        />
      </section>

      <section id="section-4-2" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          4.2 Logic and Categories
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Aristotle created formal logic. His system of syllogisms was the standard for over 
          two thousand years.
        </p>

        <DefinitionCard
          term="Syllogism"
          definition="A form of logical argument with two premises and a conclusion. Example: All humans are mortal. Socrates is human. Therefore, Socrates is mortal."
        />

        <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-6 my-6">
          <p className="font-semibold text-slate-900 dark:text-white mb-3">Example Syllogism:</p>
          <ul className="space-y-2 text-slate-700 dark:text-slate-300">
            <li>Premise 1: All humans are mortal.</li>
            <li>Premise 2: Socrates is human.</li>
            <li className="font-semibold">Conclusion: Therefore, Socrates is mortal.</li>
          </ul>
        </div>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Aristotle also developed a system of categories—the most basic ways we can describe 
          things: substance, quantity, quality, relation, place, time, position, state, action, 
          and affection.
        </p>
      </section>

      <section id="section-4-3" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          4.3 The Four Causes
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          To fully explain anything, Aristotle said, we must identify its four causes:
        </p>

        <ComparisonTable
          headers={['Cause', 'Question', 'Example (Statue)']}
          rows={[
            ['Material', 'What is it made of?', 'Bronze'],
            ['Formal', 'What is its form/structure?', 'Shape of a human'],
            ['Efficient', 'What made it?', 'The sculptor'],
            ['Final', 'What is its purpose?', 'To honor a hero'],
          ]}
        />

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          The final cause (purpose or telos) was crucial for Aristotle. Unlike Plato, who placed 
          Forms in a separate realm, Aristotle believed that form and purpose are inherent in 
          things themselves.
        </p>

        <DefinitionCard
          term="Teleology"
          definition="The explanation of phenomena by their purposes or goals. Aristotle believed everything in nature has an inherent purpose toward which it strives."
        />
      </section>

      <section id="section-4-4" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          4.4 Virtue Ethics
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          In ethics, Aristotle asked: What is the purpose of human life? His answer: 
          <strong>eudaimonia</strong>—often translated as "happiness" but better understood as 
          "flourishing" or "living well."
        </p>

        <DefinitionCard
          term="Eudaimonia"
          definition="Human flourishing or well-being; the highest human good, achieved through living virtuously and exercising reason."
        />

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          How do we achieve eudaimonia? Through virtue. And virtue, for Aristotle, is a 
          <strong>mean between extremes</strong>—the "golden mean."
        </p>

        <ComparisonTable
          headers={['Deficiency', 'Virtue (Mean)', 'Excess']}
          rows={[
            ['Cowardice', 'Courage', 'Recklessness'],
            ['Stinginess', 'Generosity', 'Wastefulness'],
            ['Self-deprecation', 'Truthfulness', 'Boastfulness'],
            ['Insensibility', 'Temperance', 'Self-indulgence'],
          ]}
        />

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Virtue is not just about knowing the mean but developing the habit of hitting it. 
          We become virtuous by practicing virtue, just as we become musicians by playing music.
        </p>

        <QuoteBlock
          quote="Virtue is a state of character concerned with choice, lying in a mean relative to us."
          author="Aristotle"
          source="Nicomachean Ethics"
        />

        <KeyTakeaway>
          <p>
            Aristotle's ethics is about character, not rules. The virtuous person doesn't just 
            do the right thing; they do it at the right time, in the right way, for the right 
            reasons, and they enjoy doing it.
          </p>
        </KeyTakeaway>
      </section>

      <section id="section-4-5" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          4.5 Plato vs. Aristotle
        </h2>

        <ComparisonTable
          headers={['Topic', 'Plato', 'Aristotle']}
          rows={[
            ['Forms', 'Exist in separate realm', 'Exist within particular things'],
            ['Knowledge', 'Recollection of Forms', 'Abstraction from experience'],
            ['Method', 'Dialectic, mathematics', 'Observation, classification'],
            ['Focus', 'Eternal, unchanging', 'Change, development'],
            ['Politics', 'Philosopher-kings', 'Mixed constitution'],
          ]}
        />

        <KeyTakeaway>
          <p>
            Plato looked upward to eternal Forms; Aristotle looked around at the natural world. 
            Both approaches have shaped Western thought profoundly.
          </p>
        </KeyTakeaway>
      </section>

      <section id="section-4-6" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Module Summary
        </h2>

        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>Aristotle developed formal logic through syllogisms</li>
            <li>The Four Causes explain things: material, formal, efficient, final</li>
            <li>Forms exist within things, not in a separate realm</li>
            <li>Virtue is a mean between extremes</li>
            <li>Eudaimonia (flourishing) is the goal of human life</li>
          </ul>
        </div>

        <p className="text-slate-700 dark:text-slate-300 mt-6">
          <strong>Next up:</strong> In Module 5, we leap forward to the Medieval period, where 
          philosophers grappled with the relationship between faith and reason.
        </p>
      </section>

      <section id="section-4-7" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Knowledge Check
        </h2>
        <p className="text-slate-700 dark:text-slate-300 mb-6">
          Test your understanding of the concepts covered in this module.
        </p>
        <KnowledgeCheck
          moduleId={4}
          title="Module 4: Aristotle's Systematic Philosophy"
          questions={module04Quiz}
        />
      </section>
    </div>
  );
}
