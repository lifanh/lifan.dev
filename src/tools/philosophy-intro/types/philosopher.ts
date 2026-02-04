export type PhilosophicalEra = 
  | 'ancient' 
  | 'medieval' 
  | 'early-modern' 
  | 'enlightenment'
  | 'modern' 
  | 'contemporary';

export type PhilosophicalSchool =
  | 'pre-socratic'
  | 'socratic'
  | 'platonism'
  | 'aristotelianism'
  | 'stoicism'
  | 'epicureanism'
  | 'skepticism'
  | 'neoplatonism'
  | 'scholasticism'
  | 'rationalism'
  | 'empiricism'
  | 'idealism'
  | 'materialism'
  | 'existentialism'
  | 'phenomenology'
  | 'analytic'
  | 'pragmatism'
  | 'postmodernism';

export interface Philosopher {
  id: string;
  name: string;
  birthYear: number;
  deathYear: number | null;
  era: PhilosophicalEra;
  schools: PhilosophicalSchool[];
  keyIdeas: string[];
  influences: string[];
  influenced: string[];
  quote: string;
  nationality: string;
}

export interface ThoughtExperiment {
  id: string;
  name: string;
  philosopher: string;
  era: PhilosophicalEra;
  description: string;
  steps: string[];
  questions: string[];
  relatedConcepts: string[];
}

export interface EthicalFramework {
  id: string;
  name: string;
  proponent: string;
  principle: string;
  howToApply: string[];
  strengths: string[];
  weaknesses: string[];
}

export interface PhilosophicalConcept {
  id: string;
  name: string;
  definition: string;
  relatedPhilosophers: string[];
  era: PhilosophicalEra;
  category: 'metaphysics' | 'epistemology' | 'ethics' | 'logic' | 'aesthetics' | 'political';
}
