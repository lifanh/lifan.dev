import React, { useState } from 'react';

export default function EconomicSim() {
  const [price, setPrice] = useState(10);
  const [supply, setSupply] = useState(100);

  // Simple linear demand curve: higher price -> lower demand
  const demand = Math.max(0, 200 - price * 5);

  // Revenue calculation
  const revenue = Math.min(demand, supply) * price;

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl max-w-2xl mx-auto transition-colors duration-200">
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Market Simulator</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm">Adjust price to see how it affects demand and total revenue.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Unit Price: <span className="text-emerald-600 dark:text-emerald-400">${price}</span>
            </label>
            <input
              type="range"
              min="1"
              max="40"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Supply Available: <span className="text-blue-600 dark:text-blue-400">{supply} units</span>
            </label>
            <input
              type="range"
              min="0"
              max="200"
              value={supply}
              onChange={(e) => setSupply(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg space-y-2 border border-slate-100 dark:border-transparent">
          <div className="flex justify-between">
            <span className="text-slate-600 dark:text-slate-400">Demand:</span>
            <span className="font-mono text-slate-900 dark:text-white">{demand} units</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600 dark:text-slate-400">Units Sold:</span>
            <span className="font-mono text-slate-900 dark:text-white">{Math.min(demand, supply)}</span>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700 pt-2 flex justify-between font-bold">
            <span className="text-slate-700 dark:text-slate-300">Revenue:</span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 text-lg">${revenue}</span>
          </div>
        </div>
      </div>

      {demand > supply && (
        <div className="text-amber-700 dark:text-amber-400 text-sm bg-amber-50 dark:bg-amber-900/20 p-2 rounded border border-amber-200 dark:border-amber-900/50">
          ⚠️ Shortage! Demand exceeds supply. You are missing out on sales.
        </div>
      )}
      {demand < supply && (
        <div className="text-blue-700 dark:text-blue-400 text-sm bg-blue-50 dark:bg-blue-900/20 p-2 rounded border border-blue-200 dark:border-blue-900/50">
          ℹ️ Surplus! Supply exceeds demand. You have excess inventory.
        </div>
      )}
    </div>
  );
}
