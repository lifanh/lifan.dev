import { DefinitionCard, KeyTakeaway, PhilosopherCard, QuoteBlock, ComparisonTable } from '../components/content';
import { KnowledgeCheck } from '../components/interactive/assessments';
import { module07Quiz } from './quizzes';

export function Module7Content() {
  return (
    <div className="space-y-8">
      <section id="section-7-1">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">7.1 Knowledge from Experience</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-4">The British empiricists challenged rationalism. They argued that there are no innate ideas—all knowledge comes from sensory experience.</p>
        <DefinitionCard term="Empiricism" definition="The view that all knowledge derives from sensory experience. The mind at birth is a 'blank slate' written upon by experience." />
      </section>

      <section id="section-7-2" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">7.2 John Locke</h2>
        <PhilosopherCard name="John Locke" years="1632 - 1704" location="England" school="Empiricism" keyIdeas={['Tabula rasa', 'Primary/secondary qualities', 'Natural rights', 'Social contract']} quote="No man's knowledge here can go beyond his experience." />
        <p className="text-slate-700 dark:text-slate-300 mb-4">Locke argued the mind at birth is a "tabula rasa" (blank slate). All ideas come from experience: either through sensation (external) or reflection (internal).</p>
        <DefinitionCard term="Primary vs Secondary Qualities" definition="Primary qualities (size, shape, motion) exist in objects. Secondary qualities (color, taste, sound) exist only in our minds as responses to objects." />
      </section>

      <section id="section-7-3" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">7.3 George Berkeley</h2>
        <PhilosopherCard name="George Berkeley" years="1685 - 1753" location="Ireland" school="Idealism" keyIdeas={['Esse est percipi', 'Immaterialism', 'Ideas as reality']} quote="To be is to be perceived." />
        <p className="text-slate-700 dark:text-slate-300 mb-4">Berkeley took empiricism to a radical conclusion: if we only know our perceptions, we have no reason to believe in matter at all. Reality consists only of minds and their ideas.</p>
        <KeyTakeaway><p>For Berkeley, a tree falling in a forest with no one around doesn't make a sound—because without perception, nothing exists. But God's perception ensures the world's continuity.</p></KeyTakeaway>
      </section>

      <section id="section-7-4" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">7.4 David Hume</h2>
        <PhilosopherCard name="David Hume" years="1711 - 1776" location="Scotland" school="Empiricism, Skepticism" keyIdeas={['Problem of induction', 'Causation as habit', 'Is-ought gap', 'Bundle theory of self']} quote="Reason is, and ought only to be the slave of the passions." />
        <p className="text-slate-700 dark:text-slate-300 mb-4">Hume was the most radical empiricist. He argued that causation is not something we observe but a habit of mind. We see one event follow another repeatedly, and we expect this pattern to continue—but we cannot prove it will.</p>
        <DefinitionCard term="Problem of Induction" definition="We cannot rationally justify the assumption that the future will resemble the past. Yet all scientific prediction depends on this assumption." />
        <QuoteBlock quote="When we run over libraries... what havoc must we make? If we take in our hand any volume... let us ask, Does it contain any abstract reasoning concerning quantity or number? No. Does it contain any experimental reasoning concerning matter of fact? No. Commit it then to the flames, for it can contain nothing but sophistry and illusion." author="Hume" source="An Enquiry Concerning Human Understanding" />
      </section>

      <section id="section-7-5" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Module Summary</h2>
        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>Empiricists reject innate ideas; all knowledge comes from experience</li>
            <li>Locke: the mind is a blank slate</li>
            <li>Berkeley: only minds and ideas exist</li>
            <li>Hume: causation is habit; induction cannot be justified</li>
          </ul>
        </div>
        <p className="text-slate-700 dark:text-slate-300 mt-6"><strong>Next up:</strong> In Module 8, Kant attempts to rescue knowledge from Hume's skepticism.</p>
      </section>

      <section id="section-7-6" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Knowledge Check</h2>
        <KnowledgeCheck moduleId={7} title="Module 7: British Empiricism" questions={module07Quiz} />
      </section>
    </div>
  );
}
