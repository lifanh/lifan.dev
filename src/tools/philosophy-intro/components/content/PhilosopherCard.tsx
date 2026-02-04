import { BookMarked, Clock, MapPin, Users } from 'lucide-react';

interface PhilosopherCardProps {
  name: string;
  years: string;
  location: string;
  school: string;
  keyIdeas: string[];
  quote?: string;
}

export function PhilosopherCard({ name, years, location, school, keyIdeas, quote }: PhilosopherCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden my-6">
      <div className="bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-700 px-6 py-4 border-b border-slate-200 dark:border-slate-700">
        <h4 className="text-xl font-bold text-slate-900 dark:text-white">{name}</h4>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <Clock className="w-4 h-4" />
            <span>{years}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <Users className="w-4 h-4" />
            <span>{school}</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            <BookMarked className="w-4 h-4" />
            Key Ideas
          </div>
          <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-1">
            {keyIdeas.map((idea, index) => (
              <li key={index}>{idea}</li>
            ))}
          </ul>
        </div>

        {quote && (
          <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mt-4">
            <p className="text-slate-600 dark:text-slate-400 italic">"{quote}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
