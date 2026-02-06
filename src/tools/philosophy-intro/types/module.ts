export interface Module {
  id: number;
  title: string;
  shortTitle: string;
  part: number;
  partTitle: string;
  description: string;
  estimatedTime: number;
  objectives: string[];
  sections: ModuleSection[];
}

export interface ModuleSection {
  id: string;
  title: string;
  type: 'content' | 'interactive' | 'quiz' | 'resources';
}

export interface ModuleProgress {
  moduleId: number;
  sectionsCompleted: string[];
  quizCompleted: boolean;
  quizScore: number | null;
  timeSpent: number;
  lastAccessed: string;
}

export const MODULES: Module[] = [
  {
    id: 1,
    title: 'The Birth of Philosophy',
    shortTitle: 'Origins',
    part: 1,
    partTitle: 'Ancient Philosophy',
    description: 'Discover how philosophy emerged in ancient Greece and the questions that started it all.',
    estimatedTime: 40,
    objectives: [
      'Explain what philosophy is and why it emerged in ancient Greece',
      'Identify the Pre-Socratic philosophers and their key questions',
      'Understand the shift from mythological to rational explanation',
      'Recognize the enduring relevance of ancient questions',
    ],
    sections: [
      { id: '1.1', title: 'What is Philosophy?', type: 'content' },
      { id: '1.2', title: 'Why Ancient Greece?', type: 'content' },
      { id: '1.3', title: 'The Pre-Socratics', type: 'content' },
      { id: '1.4', title: 'Timeline Explorer', type: 'interactive' },
      { id: '1.5', title: 'Knowledge Check', type: 'quiz' },
    ],
  },
  {
    id: 2,
    title: 'Socrates and the Socratic Method',
    shortTitle: 'Socrates',
    part: 1,
    partTitle: 'Ancient Philosophy',
    description: 'Meet the philosopher who changed everything by asking questions.',
    estimatedTime: 45,
    objectives: [
      'Describe Socrates\' life and historical significance',
      'Explain the Socratic method of questioning',
      'Apply Socratic questioning to examine beliefs',
      'Understand why Socrates was sentenced to death',
    ],
    sections: [
      { id: '2.1', title: 'The Life of Socrates', type: 'content' },
      { id: '2.2', title: '"I Know That I Know Nothing"', type: 'content' },
      { id: '2.3', title: 'The Socratic Method', type: 'content' },
      { id: '2.4', title: 'Socratic Dialogue Simulator', type: 'interactive' },
      { id: '2.5', title: 'The Trial and Death of Socrates', type: 'content' },
      { id: '2.6', title: 'Knowledge Check', type: 'quiz' },
    ],
  },
  {
    id: 3,
    title: 'Plato\'s World of Forms',
    shortTitle: 'Plato',
    part: 1,
    partTitle: 'Ancient Philosophy',
    description: 'Explore the theory that changed how we think about reality.',
    estimatedTime: 50,
    objectives: [
      'Explain Plato\'s Theory of Forms',
      'Interpret the Allegory of the Cave',
      'Understand Plato\'s view of knowledge vs. opinion',
      'Describe Plato\'s ideal state in the Republic',
    ],
    sections: [
      { id: '3.1', title: 'From Student to Founder', type: 'content' },
      { id: '3.2', title: 'The Theory of Forms', type: 'content' },
      { id: '3.3', title: 'The Allegory of the Cave', type: 'content' },
      { id: '3.4', title: 'Cave Allegory Visualizer', type: 'interactive' },
      { id: '3.5', title: 'Plato\'s Republic', type: 'content' },
      { id: '3.6', title: 'Knowledge Check', type: 'quiz' },
    ],
  },
  {
    id: 4,
    title: 'Aristotle\'s Systematic Philosophy',
    shortTitle: 'Aristotle',
    part: 1,
    partTitle: 'Ancient Philosophy',
    description: 'The student who challenged his teacher and built a system of everything.',
    estimatedTime: 50,
    objectives: [
      'Contrast Aristotle\'s approach with Plato\'s',
      'Explain Aristotle\'s four causes',
      'Understand virtue ethics and the golden mean',
      'Recognize Aristotle\'s influence on Western thought',
    ],
    sections: [
      { id: '4.1', title: 'The Student Who Disagreed', type: 'content' },
      { id: '4.2', title: 'Logic and Categories', type: 'content' },
      { id: '4.3', title: 'The Four Causes', type: 'content' },
      { id: '4.4', title: 'Virtue Ethics', type: 'content' },
      { id: '4.5', title: 'Philosopher Comparison Tool', type: 'interactive' },
      { id: '4.6', title: 'Knowledge Check', type: 'quiz' },
    ],
  },
  {
    id: 5,
    title: 'Medieval Philosophy',
    shortTitle: 'Medieval',
    part: 2,
    partTitle: 'Medieval & Early Modern Philosophy',
    description: 'How faith and reason wrestled for a thousand years.',
    estimatedTime: 45,
    objectives: [
      'Understand the role of religion in medieval philosophy',
      'Explain Augustine\'s synthesis of Christianity and Platonism',
      'Describe Aquinas\'s Five Ways to prove God\'s existence',
      'Recognize the tension between faith and reason',
    ],
    sections: [
      { id: '5.1', title: 'Philosophy in the Age of Faith', type: 'content' },
      { id: '5.2', title: 'Augustine of Hippo', type: 'content' },
      { id: '5.3', title: 'Thomas Aquinas', type: 'content' },
      { id: '5.4', title: 'Faith vs. Reason Debate', type: 'content' },
      { id: '5.5', title: 'Arguments Analyzer', type: 'interactive' },
      { id: '5.6', title: 'Knowledge Check', type: 'quiz' },
    ],
  },
  {
    id: 6,
    title: 'The Dawn of Modern Philosophy',
    shortTitle: 'Descartes',
    part: 2,
    partTitle: 'Medieval & Early Modern Philosophy',
    description: 'Descartes doubts everything and rebuilds knowledge from the ground up.',
    estimatedTime: 50,
    objectives: [
      'Explain Descartes\' method of doubt',
      'Understand "I think, therefore I am"',
      'Contrast rationalism and empiricism',
      'Identify the mind-body problem',
    ],
    sections: [
      { id: '6.1', title: 'The Scientific Revolution', type: 'content' },
      { id: '6.2', title: 'Descartes\' Method of Doubt', type: 'content' },
      { id: '6.3', title: 'Cogito Ergo Sum', type: 'content' },
      { id: '6.4', title: 'Rationalism vs. Empiricism', type: 'content' },
      { id: '6.5', title: 'Thought Experiment Lab', type: 'interactive' },
      { id: '6.6', title: 'Knowledge Check', type: 'quiz' },
    ],
  },
  {
    id: 7,
    title: 'British Empiricism',
    shortTitle: 'Empiricism',
    part: 2,
    partTitle: 'Medieval & Early Modern Philosophy',
    description: 'Locke, Berkeley, and Hume argue that all knowledge comes from experience.',
    estimatedTime: 45,
    objectives: [
      'Explain Locke\'s tabula rasa theory',
      'Understand Berkeley\'s idealism',
      'Describe Hume\'s skepticism about causation',
      'Trace the empiricist critique of innate ideas',
    ],
    sections: [
      { id: '7.1', title: 'Knowledge from Experience', type: 'content' },
      { id: '7.2', title: 'John Locke', type: 'content' },
      { id: '7.3', title: 'George Berkeley', type: 'content' },
      { id: '7.4', title: 'David Hume', type: 'content' },
      { id: '7.5', title: 'Epistemology Comparison', type: 'interactive' },
      { id: '7.6', title: 'Knowledge Check', type: 'quiz' },
    ],
  },
  {
    id: 8,
    title: 'Kant\'s Revolution',
    shortTitle: 'Kant',
    part: 3,
    partTitle: 'Enlightenment to 19th Century',
    description: 'How one philosopher tried to save both reason and experience.',
    estimatedTime: 55,
    objectives: [
      'Explain how Kant synthesized rationalism and empiricism',
      'Understand the categorical imperative',
      'Describe phenomena vs. noumena',
      'Recognize Kant\'s influence on modern ethics',
    ],
    sections: [
      { id: '8.1', title: 'Awakened from Dogmatic Slumber', type: 'content' },
      { id: '8.2', title: 'The Critique of Pure Reason', type: 'content' },
      { id: '8.3', title: 'The Categorical Imperative', type: 'content' },
      { id: '8.4', title: 'Ethics Decision Analyzer', type: 'interactive' },
      { id: '8.5', title: 'Kant\'s Legacy', type: 'content' },
      { id: '8.6', title: 'Knowledge Check', type: 'quiz' },
    ],
  },
  {
    id: 9,
    title: '19th Century Philosophy',
    shortTitle: '19th Century',
    part: 3,
    partTitle: 'Enlightenment to 19th Century',
    description: 'Hegel, Marx, and Nietzsche shake the foundations.',
    estimatedTime: 50,
    objectives: [
      'Explain Hegel\'s dialectic',
      'Understand Nietzsche\'s critique of morality',
      'Describe Marx\'s historical materialism',
      'Recognize the rise of existential themes',
    ],
    sections: [
      { id: '9.1', title: 'German Idealism', type: 'content' },
      { id: '9.2', title: 'Hegel\'s Dialectic', type: 'content' },
      { id: '9.3', title: 'Marx and Historical Materialism', type: 'content' },
      { id: '9.4', title: 'Nietzsche\'s Transvaluation', type: 'content' },
      { id: '9.5', title: 'Dialectic Visualizer', type: 'interactive' },
      { id: '9.6', title: 'Knowledge Check', type: 'quiz' },
    ],
  },
  {
    id: 10,
    title: 'Existentialism',
    shortTitle: 'Existentialism',
    part: 4,
    partTitle: '20th Century to Present',
    description: 'What does it mean to exist? The existentialists grapple with freedom and meaning.',
    estimatedTime: 50,
    objectives: [
      'Define existentialism and its key themes',
      'Explain Kierkegaard\'s leap of faith',
      'Understand Sartre\'s "existence precedes essence"',
      'Apply existentialist concepts to personal meaning',
    ],
    sections: [
      { id: '10.1', title: 'Existence Precedes Essence', type: 'content' },
      { id: '10.2', title: 'Kierkegaard: Father of Existentialism', type: 'content' },
      { id: '10.3', title: 'Sartre and Radical Freedom', type: 'content' },
      { id: '10.4', title: 'Camus and the Absurd', type: 'content' },
      { id: '10.5', title: 'Meaning Finder Exercise', type: 'interactive' },
      { id: '10.6', title: 'Knowledge Check', type: 'quiz' },
    ],
  },
  {
    id: 11,
    title: 'Analytic Philosophy',
    shortTitle: 'Analytic',
    part: 4,
    partTitle: '20th Century to Present',
    description: 'The linguistic turn and the pursuit of clarity.',
    estimatedTime: 45,
    objectives: [
      'Distinguish analytic from continental philosophy',
      'Explain the linguistic turn',
      'Understand logical positivism',
      'Recognize Wittgenstein\'s influence',
    ],
    sections: [
      { id: '11.1', title: 'The Analytic Tradition', type: 'content' },
      { id: '11.2', title: 'Russell and Early Analytic Philosophy', type: 'content' },
      { id: '11.3', title: 'Wittgenstein\'s Two Philosophies', type: 'content' },
      { id: '11.4', title: 'Logical Positivism', type: 'content' },
      { id: '11.5', title: 'Language Analysis Tool', type: 'interactive' },
      { id: '11.6', title: 'Knowledge Check', type: 'quiz' },
    ],
  },
  {
    id: 12,
    title: 'Contemporary Philosophy',
    shortTitle: 'Contemporary',
    part: 4,
    partTitle: '20th Century to Present',
    description: 'Where philosophy stands today and where it might go.',
    estimatedTime: 50,
    objectives: [
      'Survey major contemporary movements',
      'Understand ethics in the modern world',
      'Explore philosophy of mind debates',
      'Apply philosophical thinking to current issues',
    ],
    sections: [
      { id: '12.1', title: 'Philosophy Today', type: 'content' },
      { id: '12.2', title: 'Ethics: Utilitarianism to Effective Altruism', type: 'content' },
      { id: '12.3', title: 'Philosophy of Mind', type: 'content' },
      { id: '12.4', title: 'Political Philosophy', type: 'content' },
      { id: '12.5', title: 'Full Timeline Explorer', type: 'interactive' },
      { id: '12.6', title: 'Final Assessment', type: 'quiz' },
      { id: '12.7', title: 'Where to Go Next', type: 'resources' },
    ],
  },
];

export const PARTS = [
  { id: 1, title: 'Ancient Philosophy', modules: [1, 2, 3, 4] },
  { id: 2, title: 'Medieval & Early Modern Philosophy', modules: [5, 6, 7] },
  { id: 3, title: 'Enlightenment to 19th Century', modules: [8, 9] },
  { id: 4, title: '20th Century to Present', modules: [10, 11, 12] },
];
