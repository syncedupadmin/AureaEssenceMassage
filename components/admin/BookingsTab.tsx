'use client';

import { useState } from 'react';
import type { BookingStatus } from '@/lib/schemas/booking';

interface Booking {
  id: string;
  lookupToken: string;
  status: BookingStatus;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  service: string;
  locationType: string;
  address?: string;
  preferredDate?: string;
  preferredTime?: string;
  confirmedDate?: string;
  confirmedTime?: string;
  message?: string;
  adminNotes?: string;
  cancellationReason?: string;
  createdAt: string;
  updatedAt: string;
}

interface BookingStats {
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
}

interface BookingsTabProps {
  bookings: Booking[];
  stats: BookingStats;
  loading: boolean;
  onRefresh: () => void;
  onSelectBooking: (booking: Booking) => void;
  selectedStatus: BookingStatus | 'all';
  onStatusFilterChange: (status: BookingStatus | 'all') => void;
}

const STATUS_CONFIG = {
  pending: { label: 'Pending', color: 'bg-amber-100 text-amber-800', dotColor: 'bg-amber-500' },
  confirmed: { label: 'Confirmed', color: 'bg-emerald-100 text-emerald-800', dotColor: 'bg-emerald-500' },
  completed: { label: 'Completed', color: 'bg-blue-100 text-blue-800', dotColor: 'bg-blue-500' },
  cancelled: { label: 'Cancelled', color: 'bg-stone-100 text-stone-600', dotColor: 'bg-stone-400' },
};

const TIME_LABELS: Record<string, string> = {
  morning: 'Morning (8am-12pm)',
  afternoon: 'Afternoon (12pm-5pm)',
  evening: 'Evening (5pm-9pm)',
};

const LOCATION_LABELS: Record<string, string> = {
  home: 'Home',
  hotel: 'Hotel',
  office: 'Office',
  event: 'Event',
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatDateTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function BookingsTab({
  bookings,
  stats,
  loading,
  onRefresh,
  onSelectBooking,
  selectedStatus,
  onStatusFilterChange,
}: BookingsTabProps) {
  const filters: { value: BookingStatus | 'all'; label: string; count: number }[] = [
    { value: 'all', label: 'All', count: stats.pending + stats.confirmed + stats.completed + stats.cancelled },
    { value: 'pending', label: 'Pending', count: stats.pending },
    { value: 'confirmed', label: 'Confirmed', count: stats.confirmed },
    { value: 'completed', label: 'Completed', count: stats.completed },
    { value: 'cancelled', label: 'Cancelled', count: stats.cancelled },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-sm border border-stone-200 p-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
            <span className="text-sm text-stone-500">Pending</span>
          </div>
          <p className="text-2xl font-light text-stone-800">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-sm border border-stone-200 p-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span className="text-sm text-stone-500">Confirmed</span>
          </div>
          <p className="text-2xl font-light text-stone-800">{stats.confirmed}</p>
        </div>
        <div className="bg-white rounded-sm border border-stone-200 p-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span className="text-sm text-stone-500">Completed</span>
          </div>
          <p className="text-2xl font-light text-stone-800">{stats.completed}</p>
        </div>
        <div className="bg-white rounded-sm border border-stone-200 p-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-stone-400"></div>
            <span className="text-sm text-stone-500">Cancelled</span>
          </div>
          <p className="text-2xl font-light text-stone-800">{stats.cancelled}</p>
        </div>
      </div>

      {/* Filter Pills & Refresh */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => onStatusFilterChange(filter.value)}
              className={`px-4 py-2 rounded-sm text-sm font-light transition-colors ${
                selectedStatus === filter.value
                  ? 'bg-stone-800 text-white'
                  : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-300'
              }`}
            >
              {filter.label}
              <span className="ml-2 opacity-70">({filter.count})</span>
            </button>
          ))}
        </div>
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

      {/* Bookings List */}
      {loading && bookings.length === 0 ? (
        <div className="bg-white rounded-sm border border-stone-200 p-12 text-center">
          <div className="w-8 h-8 border-2 border-stone-200 border-t-rose-400 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-stone-500 font-light">Loading bookings...</p>
        </div>
      ) : bookings.length === 0 ? (
        <div className="bg-white rounded-sm border border-stone-200 p-12 text-center">
          <svg
            className="w-12 h-12 text-stone-300 mx-auto mb-4"
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
          <p className="text-stone-500 font-light">No bookings found</p>
          <p className="text-sm text-stone-400 mt-1">
            {selectedStatus !== 'all' ? 'Try a different filter' : 'Bookings will appear here'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.map((booking) => {
            const statusConfig = STATUS_CONFIG[booking.status];
            return (
              <div
                key={booking.id}
                onClick={() => onSelectBooking(booking)}
                className="bg-white rounded-sm border border-stone-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {/* Left: Customer Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-medium text-stone-800 truncate">{booking.customerName}</h3>
                      <span className={`px-2 py-0.5 rounded-sm text-xs font-medium ${statusConfig.color}`}>
                        {statusConfig.label}
                      </span>
                    </div>
                    <p className="text-sm text-stone-500 truncate">{booking.service}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-stone-400">
                      <span className="font-mono">{booking.lookupToken}</span>
                      <span>{LOCATION_LABELS[booking.locationType] || booking.locationType}</span>
                    </div>
                  </div>

                  {/* Right: Date/Time */}
                  <div className="text-right flex-shrink-0">
                    {booking.status === 'confirmed' && booking.confirmedDate ? (
                      <>
                        <p className="font-medium text-emerald-700">{formatDate(booking.confirmedDate + 'T12:00:00')}</p>
                        <p className="text-sm text-emerald-600">
                          {TIME_LABELS[booking.confirmedTime || ''] || booking.confirmedTime}
                        </p>
                      </>
                    ) : booking.preferredDate ? (
                      <>
                        <p className="text-stone-600">{formatDate(booking.preferredDate + 'T12:00:00')}</p>
                        <p className="text-sm text-stone-400">
                          {TIME_LABELS[booking.preferredTime || ''] || booking.preferredTime || 'Flexible'}
                        </p>
                      </>
                    ) : (
                      <p className="text-stone-400 text-sm">No date preference</p>
                    )}
                    <p className="text-xs text-stone-400 mt-1">
                      Submitted {formatDateTime(booking.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
