import { DefinitionCard, KeyTakeaway, PhilosopherCard, QuoteBlock, ComparisonTable } from '../components/content';
import { KnowledgeCheck } from '../components/interactive/assessments';
import { module12Quiz } from './quizzes';

export function Module12Content() {
  return (
    <div className="space-y-8">
      <section id="section-12-1">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">12.1 Philosophy Today</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-4">Contemporary philosophy engages with urgent questions: the nature of mind, foundations of ethics, justice in society, and meaning in a scientific age. Let's survey some key areas.</p>
      </section>

      <section id="section-12-2" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">12.2 Ethics: From Utilitarianism to Effective Altruism</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-4">Contemporary ethics continues the classical debates while addressing new challenges like global poverty, animal rights, and emerging technologies.</p>
        <ComparisonTable headers={['Ethical Theory', 'Key Idea', 'Contemporary Advocate']} rows={[['Utilitarianism', 'Maximize overall well-being', 'Peter Singer'], ['Deontology', 'Follow moral rules/duties', 'Christine Korsgaard'], ['Virtue Ethics', 'Cultivate good character', 'Alasdair MacIntyre'], ['Care Ethics', 'Relationships and care', 'Nel Noddings']]} />
        <DefinitionCard term="Effective Altruism" definition="A philosophical and social movement that uses evidence and reason to determine the most effective ways to benefit others, often focusing on neglected global problems." />
      </section>

      <section id="section-12-3" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">12.3 Philosophy of Mind</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-4">How does the mind relate to the brain? Can consciousness be explained scientifically? These questions are central to contemporary philosophy.</p>
        <DefinitionCard term="Hard Problem of Consciousness" definition="Why is there subjective experience at all? Even if we explain how the brain processes information, we haven't explained why there is 'something it is like' to be conscious." />
        <p className="text-slate-700 dark:text-slate-300 mb-4">Positions range from physicalism (mind is just brain) to dualism (mind is separate) to panpsychism (consciousness is fundamental to reality).</p>
      </section>

      <section id="section-12-4" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">12.4 Political Philosophy</h2>
        <PhilosopherCard name="John Rawls" years="1921 - 2002" location="United States" school="Liberal Political Philosophy" keyIdeas={['Veil of ignorance', 'Original position', 'Justice as fairness']} quote="Justice is the first virtue of social institutions." />
        <DefinitionCard term="Veil of Ignorance" definition="Rawls's thought experiment: choose principles of justice without knowing your place in society (race, gender, wealth). This ensures fairness." />
        <p className="text-slate-700 dark:text-slate-300 mb-4">Contemporary political philosophy debates liberalism, communitarianism, libertarianism, and cosmopolitanism. Questions of global justice, immigration, and democratic legitimacy remain pressing.</p>
      </section>

      <section id="section-12-5" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">12.5 Where to Go From Here</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-4">Philosophy continues to ask the big questions. Having completed this introduction, you might explore:</p>
        <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300 mb-6">
          <li>Primary texts by philosophers who interested you most</li>
          <li>Contemporary debates in ethics, mind, or politics</li>
          <li>Eastern philosophy: Buddhism, Confucianism, Taoism</li>
          <li>Applied ethics: bioethics, environmental ethics, AI ethics</li>
          <li>Philosophy of science, religion, art, or language</li>
        </ul>
        <KeyTakeaway><p>Philosophy is not a body of knowledge to memorize but a practice of careful thinking. The goal is not to have all the answers but to ask better questions and examine our assumptions critically.</p></KeyTakeaway>
      </section>

      <section id="section-12-6" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Course Summary</h2>
        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
          <p className="text-slate-700 dark:text-slate-300 mb-4">Congratulations on completing Introduction to Philosophy History! You've journeyed through:</p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li><strong>Ancient Philosophy:</strong> Pre-Socratics, Socrates, Plato, Aristotle</li>
            <li><strong>Medieval Philosophy:</strong> Augustine, Aquinas, faith and reason</li>
            <li><strong>Modern Philosophy:</strong> Descartes, empiricists, Kant</li>
            <li><strong>19th Century:</strong> Hegel, Marx, Nietzsche</li>
            <li><strong>20th Century:</strong> Existentialism, analytic philosophy</li>
            <li><strong>Contemporary:</strong> Ethics, mind, political philosophy</li>
          </ul>
        </div>
        <QuoteBlock quote="The unexamined life is not worth living." author="Socrates" />
      </section>

      <section id="section-12-7" className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Final Assessment</h2>
        <KnowledgeCheck moduleId={12} title="Module 12: Contemporary Philosophy" questions={module12Quiz} />
      </section>
    </div>
  );
}
