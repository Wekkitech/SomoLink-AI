import React from "react";

/**
 * Summary and "Activate" button.
 * In real app, this triggers provisioning with backend.
 */
export default function StepReview({ school, onActivate }) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Review & Activate</h3>

      <div className="space-y-3">
        <div>
          <div className="text-sm text-gray-500">Interfaces</div>
          <div className="text-sm">
            {(school.interfaces || []).length} configured
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-500">Hotspots</div>
          <div className="text-sm">
            {(school.hotspots || []).length} configured
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-500">Access Points</div>
          <div className="text-sm">
            {(school.accessPoints || []).length} configured
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-500">Profiles</div>
          <div className="text-sm">
            {(school.profiles || []).length} defined
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-500">Users</div>
          <div className="text-sm">{(school.users || []).length} added</div>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={onActivate}
          className="px-3 py-2 rounded bg-green-600 text-white"
        >
          Activate School Network
        </button>
      </div>
    </div>
  );
}
