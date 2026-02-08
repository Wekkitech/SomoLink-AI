import { User, Mail, Shield, Smartphone, Pen } from "lucide-react";
import { useUser } from "../context/UserContext";

export default function UserProfilePage() {
  
  const {user} = useUser();

  return (
    <div className="p-6 space-y-6">
      {/* Profile Header Card */}
      <div className="bg-white border border-gray-100 rounded p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full">
            <User className="w-6 h-6 text-gray-400" />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-700">
              {user.username}
            </div>
            <div className="text-sm text-gray-400">{user.email}</div>
            <div className="text-xs text-gray-500 mt-1">{user.role}</div>
          </div>
        </div>
        <button className="text-indigo-600 text-sm flex items-center gap-1">
          <Pen size={14} /> Edit
        </button>
      </div>

      {/* Account Details Card */}
      <div className="bg-white border border-gray-100 rounded p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Account Details
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Mail size={14} />
            Email: <span className="text-gray-700">{user.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Shield size={14} />
            Role: <span className="text-gray-700">{user.role}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <User size={14} />
            Last Login:{" "}
            <span className="text-gray-700"> "Today at 9:42 AM",</span>
          </div>
        </div>
      </div>
    </div>
  );
}
