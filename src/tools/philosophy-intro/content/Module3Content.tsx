import { DefinitionCard, KeyTakeaway, PhilosopherCard, QuoteBlock, ComparisonTable } from '../components/content';
import { KnowledgeCheck } from '../components/interactive/assessments';
import { module03Quiz } from './quizzes';

export function Module3Content() {
  return (
    <div className="space-y-8">
      <section id="section-3-1">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          3.1 From Student to Founder
        </h2>

        <PhilosopherCard
          name="Plato"
          years="c. 428 - 348 BCE"
          location="Athens, Greece"
          school="Platonism"
          keyIdeas={['Theory of Forms', 'Allegory of the Cave', 'Philosopher-kings', 'Immortal soul']}
          quote="Reality is created by the mind. We can change our reality by changing our mind."
        />

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Plato was born into an aristocratic Athenian family. As a young man, he became a devoted 
          student of Socrates. After Socrates' execution in 399 BCE, Plato traveled widely before 
          returning to Athens to found the Academy—one of the first institutions of higher learning 
          in the Western world.
        </p>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Unlike Socrates, Plato wrote extensively. His works are mostly dialogues featuring Socrates 
          as the main character. However, many scholars believe that the views expressed, especially 
          in later dialogues, are Plato's own developments beyond Socrates.
        </p>
      </section>

      <section id="section-3-2" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          3.2 The Theory of Forms
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Plato's most influential idea is the Theory of Forms. He noticed that particular things 
          in the world are imperfect and changeable. No physical circle is perfectly round. No 
          act is perfectly just. Yet we can recognize circles and justice. How?
        </p>

        <DefinitionCard
          term="Forms (or Ideas)"
          definition="Perfect, eternal, unchanging templates or essences that exist in a realm beyond the physical world. Physical objects are imperfect copies of these Forms."
        />

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          According to Plato, there is a Form of Circularity—a perfect circle that no physical 
          circle can match but all physical circles approximate. There is a Form of Justice, 
          Beauty, Goodness, and so on.
        </p>

        <ComparisonTable
          headers={['Physical World', 'World of Forms']}
          rows={[
            ['Changing', 'Eternal and unchanging'],
            ['Perceived by senses', 'Grasped by reason'],
            ['Imperfect copies', 'Perfect originals'],
            ['Many particulars', 'One Form for each type'],
            ['Opinion (doxa)', 'Knowledge (episteme)'],
          ]}
        />

        <KeyTakeaway>
          <p>
            The Forms explain how we can have knowledge in a changing world. While physical 
            things come and go, the Forms remain eternal. True knowledge is knowledge of the Forms.
          </p>
        </KeyTakeaway>
      </section>

      <section id="section-3-3" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          3.3 The Allegory of the Cave
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          In his most famous passage, from the Republic, Plato illustrates his philosophy with 
          the Allegory of the Cave.
        </p>

        <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-6 my-6">
          <p className="text-slate-700 dark:text-slate-300 italic mb-4">
            Imagine prisoners chained in a cave since childhood. They face a wall and cannot turn 
            around. Behind them is a fire, and between the fire and the prisoners, people carry 
            objects that cast shadows on the wall.
          </p>
          <p className="text-slate-700 dark:text-slate-300 italic mb-4">
            The prisoners see only shadows and hear only echoes. They believe this is reality. 
            They give names to the shadows and consider themselves knowledgeable.
          </p>
          <p className="text-slate-700 dark:text-slate-300 italic">
            What if a prisoner were freed and forced to turn around? He would see the fire 
            and realize the shadows were mere reflections. If dragged outside, he would be 
            blinded by sunlight but eventually see the sun itself—the source of all light 
            and life.
          </p>
        </div>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          The allegory represents Plato's view of reality:
        </p>

        <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300 mb-6">
          <li><strong>The prisoners:</strong> Ordinary people trapped in ignorance</li>
          <li><strong>The shadows:</strong> The physical world we perceive</li>
          <li><strong>The fire:</strong> The physical sun that illuminates our world</li>
          <li><strong>The outside world:</strong> The realm of Forms</li>
          <li><strong>The sun:</strong> The Form of the Good, the highest Form</li>
        </ul>

        <KeyTakeaway>
          <p>
            The Allegory suggests that what we take for reality is like shadows on a wall. 
            Philosophy is the journey out of the cave—a painful process of enlightenment that 
            leads to true understanding.
          </p>
        </KeyTakeaway>
      </section>

      <section id="section-3-4" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          3.4 Plato's Republic
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          In the Republic, Plato describes his vision of an ideal society. Just as the individual 
          soul has three parts (reason, spirit, and appetite), so does the ideal state have 
          three classes:
        </p>

        <ComparisonTable
          headers={['Soul Part', 'Class', 'Virtue', 'Role']}
          rows={[
            ['Reason', 'Philosopher-kings', 'Wisdom', 'Rule'],
            ['Spirit', 'Guardians/Warriors', 'Courage', 'Defend'],
            ['Appetite', 'Producers', 'Moderation', 'Provide'],
          ]}
        />

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Plato argued that philosophers should be kings because only they understand the Forms, 
          especially the Form of the Good. Only those who know what is truly good can govern 
          well.
        </p>

        <QuoteBlock
          quote="Until philosophers rule as kings or those who are now called kings and leading men genuinely and adequately philosophize... cities will have no rest from evils."
          author="Plato"
          source="The Republic"
        />
      </section>

      <section id="section-3-5" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Module Summary
        </h2>

        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>Plato founded the Academy and wrote philosophical dialogues</li>
            <li>The Theory of Forms posits perfect, eternal templates for all things</li>
            <li>The Allegory of the Cave illustrates the journey from ignorance to knowledge</li>
            <li>Knowledge is of Forms; opinion is of the changing physical world</li>
            <li>Plato envisioned philosopher-kings ruling the ideal state</li>
          </ul>
        </div>

        <p className="text-slate-700 dark:text-slate-300 mt-6">
          <strong>Next up:</strong> In Module 4, we meet Aristotle, Plato's brilliant student 
          who challenged his teacher's ideas and developed his own comprehensive system.
        </p>
      </section>

      <section id="section-3-6" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Knowledge Check
        </h2>
        <p className="text-slate-700 dark:text-slate-300 mb-6">
          Test your understanding of the concepts covered in this module.
        </p>
        <KnowledgeCheck
          moduleId={3}
          title="Module 3: Plato's World of Forms"
          questions={module03Quiz}
        />
      </section>
    </div>
  );
}
