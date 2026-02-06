import { DefinitionCard, KeyTakeaway, PhilosopherCard, QuoteBlock, ComparisonTable } from '../components/content';
import { KnowledgeCheck } from '../components/interactive/assessments';
import { module10Quiz } from './quizzes';

export function Module10Content() {
  return (
    <div className="space-y-8">
      <section id="section-10-1">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">10.1 Existence Precedes Essence</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-4">Existentialism emerged in response to the crises of the 20th century: world wars, totalitarianism, the apparent meaninglessness of mass society. Its central claim: existence precedes essence.</p>
        <DefinitionCard term="Existence Precedes Essence" definition="We are not born with a fixed nature or purpose. We exist first, then define ourselves through our choices and actions." />
        <p className="text-slate-700 dark:text-slate-300 mb-4">For a hammer, essence precedes existence—someone designs it before making it. But humans have no designer, no preset purpose. We must create our own meaning.</p>
      </section>

      <section id="section-10-2" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">10.2 Kierkegaard: Father of Existentialism</h2>
        <PhilosopherCard name="Soren Kierkegaard" years="1813 - 1855" location="Denmark" school="Existentialism" keyIdeas={['Leap of faith', 'Subjective truth', 'Three stages of existence', 'Anxiety']} quote="Life can only be understood backwards; but it must be lived forwards." />
        <p className="text-slate-700 dark:text-slate-300 mb-4">Kierkegaard, a devout Christian, criticized the comfortable Christianity of his day. Genuine faith, he argued, requires a "leap"—a passionate, personal commitment that goes beyond rational proof.</p>
        <p className="text-slate-700 dark:text-slate-300 mb-4">He described three stages of existence:</p>
        <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300 mb-6">
          <li><strong>Aesthetic:</strong> Living for pleasure and novelty</li>
          <li><strong>Ethical:</strong> Living by moral duty and commitment</li>
          <li><strong>Religious:</strong> Living in passionate relation to God</li>
        </ul>
      </section>

      <section id="section-10-3" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">10.3 Sartre and Radical Freedom</h2>
        <PhilosopherCard name="Jean-Paul Sartre" years="1905 - 1980" location="France" school="Existentialism" keyIdeas={['Existence precedes essence', 'Radical freedom', 'Bad faith', 'Being and nothingness']} quote="Man is condemned to be free; because once thrown into the world, he is responsible for everything he does." />
        <p className="text-slate-700 dark:text-slate-300 mb-4">Sartre developed atheistic existentialism. Without God, there is no human nature defining what we should be. We are "condemned to be free"—there is no escape from choosing.</p>
        <DefinitionCard term="Bad Faith (Mauvaise foi)" definition="Self-deception where we pretend we have no choice, deny our freedom, or blame circumstances for our actions. It is an attempt to escape the anxiety of freedom." />
        <QuoteBlock quote="We are left alone, without excuse. That is what I mean when I say that man is condemned to be free." author="Sartre" source="Existentialism Is a Humanism" />
        <KeyTakeaway><p>For Sartre, to deny our freedom—to say "I had no choice"—is always bad faith. We are responsible for who we become.</p></KeyTakeaway>
      </section>

      <section id="section-10-4" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">10.4 Camus and the Absurd</h2>
        <PhilosopherCard name="Albert Camus" years="1913 - 1960" location="France/Algeria" school="Absurdism" keyIdeas={['The absurd', 'Revolt against meaninglessness', 'Myth of Sisyphus']} quote="One must imagine Sisyphus happy." />
        <p className="text-slate-700 dark:text-slate-300 mb-4">Camus focused on the "absurd"—the conflict between our desire for meaning and the universe's silence. He rejected both suicide and religious leaps of faith as responses.</p>
        <p className="text-slate-700 dark:text-slate-300 mb-4">In "The Myth of Sisyphus," Camus imagines Sisyphus, condemned to roll a boulder up a hill for eternity, as happy. The struggle itself is enough. We must revolt against meaninglessness by embracing life fully.</p>
        <QuoteBlock quote="The struggle itself toward the heights is enough to fill a man's heart. One must imagine Sisyphus happy." author="Camus" source="The Myth of Sisyphus" />
      </section>

      <section id="section-10-5" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Module Summary</h2>
        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>Existentialism: we define ourselves through choices, not nature</li>
            <li>Kierkegaard: faith requires a personal leap beyond reason</li>
            <li>Sartre: we are condemned to be free; bad faith denies this</li>
            <li>Camus: embrace the absurd and revolt through living fully</li>
          </ul>
        </div>
        <p className="text-slate-700 dark:text-slate-300 mt-6"><strong>Next up:</strong> In Module 11, we explore analytic philosophy's different approach to philosophical problems.</p>
      </section>

      <section id="section-10-6" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Knowledge Check</h2>
        <KnowledgeCheck moduleId={10} title="Module 10: Existentialism" questions={module10Quiz} />
      </section>
    </div>
  );
}
