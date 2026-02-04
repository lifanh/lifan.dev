import { DefinitionCard, KeyTakeaway, PhilosopherCard, QuoteBlock } from '../components/content';
import { KnowledgeCheck } from '../components/interactive/assessments';
import { module02Quiz } from './quizzes';

export function Module2Content() {
  return (
    <div className="space-y-8">
      <section id="section-2-1">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          2.1 The Life of Socrates
        </h2>

        <PhilosopherCard
          name="Socrates"
          years="c. 470 - 399 BCE"
          location="Athens, Greece"
          school="Classical Greek"
          keyIdeas={['Socratic method', 'Knowledge is virtue', 'Examined life', 'Intellectual humility']}
          quote="The unexamined life is not worth living."
        />

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Socrates never wrote anything down. Everything we know about him comes from his students, 
          primarily Plato and Xenophon. He was the son of a stonemason and a midwife, and he spent 
          his life in the streets and marketplaces of Athens, questioning anyone who would talk to him.
        </p>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Unlike the Pre-Socratics who focused on nature, Socrates turned philosophy toward 
          human concerns: How should we live? What is justice? What is virtue?
        </p>

        <QuoteBlock
          quote="I cannot teach anybody anything. I can only make them think."
          author="Socrates"
          source="as reported by Plato"
        />
      </section>

      <section id="section-2-2" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          2.2 "I Know That I Know Nothing"
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          The Oracle at Delphi proclaimed that no one was wiser than Socrates. This puzzled him 
          because he felt he knew nothing. So he set out to find someone wiser.
        </p>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          He questioned politicians, poets, and craftsmen. He found that while they claimed 
          knowledge, under examination their beliefs were confused or contradictory. Socrates 
          concluded he was indeed wiser, but only because he knew he didn't know.
        </p>

        <DefinitionCard
          term="Socratic Wisdom"
          definition="The recognition that true wisdom begins with acknowledging the limits of one's own knowledge. Knowing that you don't know is the first step toward genuine understanding."
        />

        <KeyTakeaway>
          <p>
            Socratic wisdom isn't about having all the answers. It's about being humble enough 
            to question what you think you know. This intellectual humility is the starting 
            point for genuine inquiry.
          </p>
        </KeyTakeaway>
      </section>

      <section id="section-2-3" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          2.3 The Socratic Method
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Socrates developed a distinctive way of doing philosophy through dialogue and questioning, 
          now called the Socratic method or elenchus.
        </p>

        <DefinitionCard
          term="Socratic Method (Elenchus)"
          definition="A form of cooperative dialogue where questions are asked to stimulate critical thinking, expose contradictions in beliefs, and lead toward deeper understanding."
        />

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          The method typically works like this:
        </p>

        <ol className="list-decimal pl-6 space-y-3 text-slate-700 dark:text-slate-300 mb-6">
          <li><strong>Start with a claim:</strong> Someone asserts they know something (e.g., "Justice is giving people what they deserve")</li>
          <li><strong>Ask for clarification:</strong> "What do you mean by 'deserve'?"</li>
          <li><strong>Find counterexamples:</strong> "But what about this case where..."</li>
          <li><strong>Reveal contradictions:</strong> "Doesn't that contradict what you said earlier?"</li>
          <li><strong>Refine or abandon:</strong> The person must revise their view or admit ignorance</li>
        </ol>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Socrates compared himself to a midwife who helps others give birth to ideas. He didn't 
          claim to have wisdom himself, only to help others discover theirs.
        </p>

        <KeyTakeaway>
          <p>
            The Socratic method isn't about winning arguments. It's about collaborative truth-seeking. 
            Both participants should be willing to follow the argument wherever it leads.
          </p>
        </KeyTakeaway>
      </section>

      <section id="section-2-4" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          2.4 Virtue and Knowledge
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Socrates held a radical view: virtue is knowledge. If you truly understand what is good, 
          you will do it. No one does wrong willingly; wrongdoing is always a result of ignorance.
        </p>

        <QuoteBlock
          quote="No one errs willingly."
          author="Socrates"
          source="Plato's Protagoras"
        />

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          This seems counterintuitive. Don't people sometimes know something is wrong and do it 
          anyway? Socrates would say that in such cases, they don't truly understand the wrongness. 
          If they did, they wouldn't do it.
        </p>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          This connects to his emphasis on self-examination. By questioning our beliefs, we can 
          discover what is truly good and align our actions with that understanding.
        </p>
      </section>

      <section id="section-2-5" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          2.5 The Trial and Death of Socrates
        </h2>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          In 399 BCE, at age 70, Socrates was put on trial. The charges were:
        </p>

        <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300 mb-6">
          <li><strong>Impiety:</strong> Not believing in the gods of Athens</li>
          <li><strong>Corrupting the youth:</strong> Teaching young people to question authority</li>
        </ul>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Socrates defended himself but refused to grovel or appeal to emotion. He was found guilty 
          and sentenced to death by drinking hemlock.
        </p>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          His friends offered to help him escape, but Socrates refused. He argued that he had 
          benefited from Athens' laws his whole life, and it would be wrong to break them now 
          just because the verdict went against him. He accepted his death calmly.
        </p>

        <QuoteBlock
          quote="The hour of departure has arrived, and we go our ways — I to die, and you to live. Which is better God only knows."
          author="Socrates"
          source="Plato's Apology"
        />

        <KeyTakeaway>
          <p>
            Socrates' death cemented his legacy. He didn't just teach philosophy; he lived and 
            died by his principles. His willingness to accept death rather than abandon his 
            commitment to truth and integrity inspired philosophers for millennia.
          </p>
        </KeyTakeaway>
      </section>

      <section id="section-2-6" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Module Summary
        </h2>

        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>Socrates shifted philosophy from nature to human concerns</li>
            <li>His wisdom lay in recognizing the limits of his knowledge</li>
            <li>The Socratic method uses questioning to expose contradictions</li>
            <li>He believed virtue is knowledge—no one does wrong knowingly</li>
            <li>He chose death over abandoning his principles</li>
          </ul>
        </div>

        <p className="text-slate-700 dark:text-slate-300 mt-6">
          <strong>Next up:</strong> In Module 3, we meet Socrates' most famous student, Plato, 
          who developed a grand philosophical system including the Theory of Forms.
        </p>
      </section>

      <section id="section-2-7" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Knowledge Check
        </h2>
        <p className="text-slate-700 dark:text-slate-300 mb-6">
          Test your understanding of the concepts covered in this module.
        </p>
        <KnowledgeCheck
          moduleId={2}
          title="Module 2: Socrates and the Socratic Method"
          questions={module02Quiz}
        />
      </section>
    </div>
  );
}
