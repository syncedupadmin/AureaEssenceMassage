'use client';

import { useState, useEffect } from 'react';

interface BlockedDate {
  date: string;
  reason?: string;
}

interface AvailabilityTabProps {
  blockedDates: BlockedDate[];
  loading: boolean;
  onRefresh: () => void;
  onAddBlockedDate: (date: string, reason?: string) => Promise<void>;
  onRemoveBlockedDate: (date: string) => Promise<void>;
}

function formatDateDisplay(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
}

function getDaysInMonth(year: number, month: number): Date[] {
  const days: Date[] = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push(new Date(year, month, d));
  }

  return days;
}

function formatDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function AvailabilityTab({
  blockedDates,
  loading,
  onRefresh,
  onAddBlockedDate,
  onRemoveBlockedDate,
}: AvailabilityTabProps) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });
  const [newBlockDate, setNewBlockDate] = useState('');
  const [newBlockReason, setNewBlockReason] = useState('');
  const [adding, setAdding] = useState(false);
  const [removing, setRemoving] = useState<string | null>(null);

  const blockedDateSet = new Set(blockedDates.map((b) => b.date));
  const blockedDateMap = new Map(blockedDates.map((b) => [b.date, b.reason]));

  const days = getDaysInMonth(currentMonth.year, currentMonth.month);
  const firstDayOfWeek = new Date(currentMonth.year, currentMonth.month, 1).getDay();
  const today = formatDateKey(new Date());

  const monthName = new Date(currentMonth.year, currentMonth.month).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const goToPrevMonth = () => {
    setCurrentMonth((prev) => {
      if (prev.month === 0) {
        return { year: prev.year - 1, month: 11 };
      }
      return { year: prev.year, month: prev.month - 1 };
    });
  };

  const goToNextMonth = () => {
    setCurrentMonth((prev) => {
      if (prev.month === 11) {
        return { year: prev.year + 1, month: 0 };
      }
      return { year: prev.year, month: prev.month + 1 };
    });
  };

  const handleAddBlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlockDate) return;

    setAdding(true);
    try {
      await onAddBlockedDate(newBlockDate, newBlockReason || undefined);
      setNewBlockDate('');
      setNewBlockReason('');
    } finally {
      setAdding(false);
    }
  };

  const handleRemoveBlock = async (date: string) => {
    setRemoving(date);
    try {
      await onRemoveBlockedDate(date);
    } finally {
      setRemoving(null);
    }
  };

  const handleDayClick = async (date: Date) => {
    const dateKey = formatDateKey(date);
    if (dateKey < today) return; // Can't block past dates

    if (blockedDateSet.has(dateKey)) {
      await handleRemoveBlock(dateKey);
    } else {
      setAdding(true);
      try {
        await onAddBlockedDate(dateKey);
      } finally {
        setAdding(false);
      }
    }
  };

  // Get blocked dates for display (only future/current)
  const upcomingBlockedDates = blockedDates
    .filter((b) => b.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="space-y-6">
      {/* Quick Block Form */}
      <div className="bg-white rounded-sm border border-stone-200 p-6">
        <h3 className="text-lg font-medium text-stone-800 mb-4">Block a Date</h3>
        <form onSubmit={handleAddBlock} className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="date"
              value={newBlockDate}
              onChange={(e) => setNewBlockDate(e.target.value)}
              min={today}
              className="w-full px-4 py-3 border border-stone-200 rounded-sm text-stone-800 focus:outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200"
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              value={newBlockReason}
              onChange={(e) => setNewBlockReason(e.target.value)}
              placeholder="Reason (optional)"
              className="w-full px-4 py-3 border border-stone-200 rounded-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200"
            />
          </div>
          <button
            type="submit"
            disabled={!newBlockDate || adding}
            className="px-6 py-3 bg-stone-800 text-white rounded-sm font-light tracking-wide hover:bg-stone-700 transition-colors disabled:opacity-50"
          >
            {adding ? 'Adding...' : 'Block Date'}
          </button>
        </form>
      </div>

      {/* Calendar View */}
      <div className="bg-white rounded-sm border border-stone-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={goToPrevMonth}
            className="p-2 text-stone-600 hover:text-stone-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h3 className="text-lg font-medium text-stone-800">{monthName}</h3>
          <button
            onClick={goToNextMonth}
            className="p-2 text-stone-600 hover:text-stone-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-xs text-stone-500 font-medium py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells for days before the 1st */}
          {Array.from({ length: firstDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square"></div>
          ))}

          {/* Day cells */}
          {days.map((date) => {
            const dateKey = formatDateKey(date);
            const isBlocked = blockedDateSet.has(dateKey);
            const isPast = dateKey < today;
            const isToday = dateKey === today;

            return (
              <button
                key={dateKey}
                onClick={() => handleDayClick(date)}
                disabled={isPast || adding || removing === dateKey}
                className={`aspect-square flex items-center justify-center text-sm rounded-sm transition-colors relative ${
                  isPast
                    ? 'text-stone-300 cursor-not-allowed'
                    : isBlocked
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : isToday
                    ? 'bg-rose-50 text-rose-600 font-medium hover:bg-rose-100'
                    : 'hover:bg-stone-100 text-stone-700'
                }`}
                title={isBlocked ? `Blocked${blockedDateMap.get(dateKey) ? `: ${blockedDateMap.get(dateKey)}` : ''}` : ''}
              >
                {date.getDate()}
                {removing === dateKey && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                    <div className="w-4 h-4 border-2 border-stone-300 border-t-rose-400 rounded-full animate-spin"></div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex items-center gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-100 rounded-sm"></div>
            <span>Blocked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-rose-50 rounded-sm border border-rose-200"></div>
            <span>Today</span>
          </div>
        </div>
      </div>

      {/* Blocked Dates List */}
      <div className="bg-white rounded-sm border border-stone-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
          <h3 className="text-lg font-medium text-stone-800">Blocked Dates</h3>
          <button
            onClick={onRefresh}
            disabled={loading}
            className="p-2 text-stone-500 hover:text-stone-700 transition-colors"
            title="Refresh"
          >
            <svg
              className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>

        {upcomingBlockedDates.length === 0 ? (
          <div className="p-8 text-center">
            <svg
              className="w-12 h-12 text-stone-300 mx-auto mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-stone-500 font-light">No upcoming blocked dates</p>
          </div>
        ) : (
          <div className="divide-y divide-stone-100">
            {upcomingBlockedDates.map((blocked) => (
              <div
                key={blocked.date}
                className="px-6 py-4 flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-stone-800">{formatDateDisplay(blocked.date)}</p>
                  {blocked.reason && (
                    <p className="text-sm text-stone-500">{blocked.reason}</p>
                  )}
                </div>
                <button
                  onClick={() => handleRemoveBlock(blocked.date)}
                  disabled={removing === blocked.date}
                  className="p-2 text-stone-400 hover:text-red-500 transition-colors"
                  title="Unblock date"
                >
                  {removing === blocked.date ? (
                    <div className="w-5 h-5 border-2 border-stone-300 border-t-rose-400 rounded-full animate-spin"></div>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
