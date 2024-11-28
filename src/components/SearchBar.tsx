import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { FileMetadata } from '../types';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFilterChange: (fileType: string) => void;
  selectedFilter: string;
  advancedFilters: {
    minSize?: number;
    maxSize?: number;
    location?: string;
    dateFrom?: string;
    dateTo?: string;
    owner?: string;
  };
  onAdvancedFiltersChange: (filters: any) => void;
}

export function SearchBar({
  searchQuery,
  onSearchChange,
  onFilterChange,
  selectedFilter,
  advancedFilters,
  onAdvancedFiltersChange,
}: SearchBarProps) {
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <select
          className="block w-40 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          value={selectedFilter}
          onChange={(e) => onFilterChange(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="image">Images</option>
          <option value="audio">Audio</option>
          <option value="video">Video</option>
        </select>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
        </button>
      </div>

      {showAdvanced && (
        <div className="grid grid-cols-3 gap-4 p-4 bg-white rounded-lg shadow">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Size Range (MB)</label>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                value={advancedFilters.minSize || ''}
                onChange={(e) => onAdvancedFiltersChange({
                  ...advancedFilters,
                  minSize: e.target.value ? Number(e.target.value) : undefined
                })}
              />
              <input
                type="number"
                placeholder="Max"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                value={advancedFilters.maxSize || ''}
                onChange={(e) => onAdvancedFiltersChange({
                  ...advancedFilters,
                  maxSize: e.target.value ? Number(e.target.value) : undefined
                })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <div className="flex space-x-2">
              <input
                type="date"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                value={advancedFilters.dateFrom || ''}
                onChange={(e) => onAdvancedFiltersChange({
                  ...advancedFilters,
                  dateFrom: e.target.value
                })}
              />
              <input
                type="date"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                value={advancedFilters.dateTo || ''}
                onChange={(e) => onAdvancedFiltersChange({
                  ...advancedFilters,
                  dateTo: e.target.value
                })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              placeholder="Filter by path..."
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
              value={advancedFilters.location || ''}
              onChange={(e) => onAdvancedFiltersChange({
                ...advancedFilters,
                location: e.target.value
              })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Owner</label>
            <input
              type="text"
              placeholder="Filter by owner..."
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
              value={advancedFilters.owner || ''}
              onChange={(e) => onAdvancedFiltersChange({
                ...advancedFilters,
                owner: e.target.value
              })}
            />
          </div>
        </div>
      )}
    </div>
  );
}