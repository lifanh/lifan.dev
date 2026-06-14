import { ComparisonTable, DefinitionCard, KeyTakeaway, PhilosopherCard } from '../components/content';
import { KnowledgeCheck } from '../components/interactive/assessments';
import { module01Quiz } from './quizzes';

export function Module1Content() {
  return (
    <div className="space-y-8">
      <section id="section-1-1">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          1.1 What is Philosophy?
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Philosophy is one of humanity's oldest intellectual pursuits. The word itself comes from
          the Greek words <em>philos</em> (love) and <em>sophia</em> (wisdom), meaning "love of wisdom."
        </p>

        <DefinitionCard
          term="Philosophy"
          definition="The systematic study of fundamental questions about existence, knowledge, values, reason, mind, and language through rational argument and critical analysis."
        />

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Unlike other disciplines that focus on specific domains, philosophy asks the most basic questions:
        </p>

        <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300 mb-6">
          <li><strong>Metaphysics:</strong> What is the nature of reality? What exists?</li>
          <li><strong>Epistemology:</strong> What can we know? How do we know it?</li>
          <li><strong>Ethics:</strong> What should we do? What is good?</li>
          <li><strong>Logic:</strong> What makes reasoning valid?</li>
          <li><strong>Aesthetics:</strong> What is beauty? What is art?</li>
        </ul>

        <KeyTakeaway>
          <p>
            Philosophy doesn't give us facts like science does. Instead, it teaches us how to
            think critically, examine assumptions, and construct sound arguments. These skills
            are valuable in every area of life.
          </p>
        </KeyTakeaway>
      </section>

      <section id="section-1-2" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          1.2 Why Ancient Greece?
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Around 600 BCE, something remarkable happened in the Greek world. Thinkers began
          asking questions about nature and seeking <em>natural</em> rather than <em>supernatural</em> explanations.
        </p>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Before philosophy, people explained the world through myths. Why does the sun move
          across the sky? Because the god Helios drives his chariot. Why do seasons change?
          Because Persephone goes to the underworld.
        </p>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          The first philosophers asked: What if we could explain these things without invoking
          the gods? What if nature follows consistent, discoverable principles?
        </p>

        <ComparisonTable
          headers={['Mythological Explanation', 'Philosophical/Natural Explanation']}
          rows={[
            ['Zeus throws lightning bolts', 'Lightning is a natural electrical discharge'],
            ['Poseidon causes earthquakes', 'Earthquakes result from movements in the earth'],
            ['Gods determine your fate', 'Events follow natural causes'],
          ]}
        />

        <p className="text-slate-700 dark:text-slate-300 mt-4">
          Several factors made Greece fertile ground for this new way of thinking:
        </p>

        <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300 mb-6">
          <li><strong>Trade and travel:</strong> Greeks encountered different cultures and ideas</li>
          <li><strong>Democracy:</strong> Debate and persuasion were valued skills</li>
          <li><strong>Leisure class:</strong> Some had time to think beyond daily survival</li>
          <li><strong>Writing:</strong> Ideas could be recorded and examined</li>
        </ul>

        <InlineCheck
          question="What was the key shift that marked the birth of philosophy in ancient Greece?"
          options={[
            'Seeking natural explanations instead of mythological ones',
            'Worshipping a new set of gods',
            'Inventing written language',
            'Building the first city-states',
          ]}
          correctAnswer={0}
          explanation="The decisive move was looking for natural, discoverable principles rather than attributing events to the gods."
        />
      </section>

      <section id="section-1-3" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          1.3 The Pre-Socratics
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          The philosophers before Socrates are called "Pre-Socratics." They asked a fundamental
          question: What is the basic substance or principle underlying all of reality?
        </p>

        <PhilosopherCard
          name="Thales of Miletus"
          years="c. 624 - 546 BCE"
          location="Miletus, Ionia"
          school="Pre-Socratic"
          keyIdeas={['Everything is made of water', 'Natural explanations for phenomena', 'First philosopher']}
          quote="Water is the principle of all things."
        />

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Thales proposed that water is the fundamental substance of everything. This seems
          naive today, but what matters is that he sought a <em>natural</em> explanation, not a
          mythological one.
        </p>

        <PhilosopherCard
          name="Heraclitus"
          years="c. 535 - 475 BCE"
          location="Ephesus, Ionia"
          school="Pre-Socratic"
          keyIdeas={['Everything flows (panta rhei)', 'Fire as the basic element', 'Unity of opposites']}
          quote="You cannot step into the same river twice."
        />

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Heraclitus focused on change. Reality is constantly in flux, like a river. The
          apparent stability we see is an illusion.
        </p>

        <PhilosopherCard
          name="Parmenides"
          years="c. 515 - 450 BCE"
          location="Elea, Italy"
          school="Pre-Socratic"
          keyIdeas={['Reality is unchanging', 'Change is an illusion', 'What is, is']}
          quote="What is, is. What is not, is not."
        />

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Parmenides took the opposite view: change is impossible. If something exists, it
          cannot come from nothing or become nothing. Therefore, reality must be eternal,
          unchanging, and one.
        </p>

        <KeyTakeaway>
          <p>
            The debate between Heraclitus (everything changes) and Parmenides (nothing changes)
            set up one of philosophy's most enduring questions: How do we reconcile the appearance
            of change with the possibility of stable, knowable reality?
          </p>
        </KeyTakeaway>

        <InlineCheck
          question="Which philosopher argued that reality is unchanging and that change is an illusion?"
          options={['Thales', 'Heraclitus', 'Parmenides', 'Socrates']}
          correctAnswer={2}
          explanation="Parmenides claimed 'what is, is' — reality is eternal and unchanging, so the change we perceive must be an illusion. Heraclitus argued the opposite."
        />
      </section>

      <section id="section-1-4" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Module Summary
        </h2>

        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            In this module, you learned:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>Philosophy means "love of wisdom" and examines fundamental questions</li>
            <li>Philosophy began in ancient Greece around 600 BCE</li>
            <li>The Pre-Socratics sought natural rather than mythological explanations</li>
            <li>Thales, Heraclitus, and Parmenides asked about the basic nature of reality</li>
            <li>The change vs. permanence debate shaped all later philosophy</li>
          </ul>
        </div>

        <p className="text-slate-700 dark:text-slate-300 mt-6">
          <strong>Next up:</strong> In Module 2, you'll meet Socrates, the philosopher who
          changed everything by asking questions instead of giving answers.
        </p>
      </section>

      <section id="section-1-5" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Knowledge Check
        </h2>
        <p className="text-slate-700 dark:text-slate-300 mb-6">
          Test your understanding of the concepts covered in this module.
        </p>
        <KnowledgeCheck
          moduleId={1}
          title="Module 1: The Birth of Philosophy"
          questions={module01Quiz}
        />
      </section>
    </div>
  );
}
