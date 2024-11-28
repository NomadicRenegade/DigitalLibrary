import React from 'react';
import { Card, CardHeader, CardContent } from '../common';
import { AnalysisResult } from '../../types';
import { formatDate } from '../../utils/formatters';

interface AnalysisResultsProps {
  analysis: AnalysisResult;
}

export function AnalysisResults({ analysis }: AnalysisResultsProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900">Analysis Results</h3>
          <span className="text-sm text-gray-500">
            Confidence: {(analysis.confidence * 100).toFixed(1)}%
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(analysis.metadata).map(([key, value]) => (
            <div key={key}>
              <dt className="text-sm font-medium text-gray-500 capitalize mb-1">
                {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </dt>
              <dd className="text-sm text-gray-900 bg-gray-50 p-2 rounded break-words whitespace-pre-wrap">
                {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
              </dd>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}