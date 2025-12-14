"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Home, Users, MessageSquare, MessageCircle, Search, 
  Edit, Trash2, ExternalLink, TrendingUp, Activity, 
  ChevronRight, CheckCircle, Clock, 
  BarChart3, PieChart, Menu, X, Check, AlertCircle
} from "lucide-react";
import { adminAPI, userAPI } from "@/lib/api"; 
import RequireAuth from "@/components/auth/require-auth"; 
import { TableSkeleton } from "@/components/shared/skeleton";

const ConfirmationPopup = ({ 
  isOpen, 
  title, 
  message, 
  onConfirm, 
  onCancel, 
  isDangerous = false 
}: { 
  isOpen: boolean; 
  title: string; 
  message: string; 
  onConfirm: () => void; 
  onCancel: () => void; 
  isDangerous?: boolean;
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-[360px] text-center border border-gray-100 animate-popup">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${isDangerous ? 'bg-red-100' : 'bg-yellow-100'}`}>
          {/* icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className={`${isDangerous ? 'stroke-red-600' : 'stroke-yellow-600'} w-8 h-8`} fill="none" viewBox="0 0 24 24" strokeWidth={2}>
            {isDangerous ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            )}
          </svg>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-6">{message}</p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-4 py-2 rounded-xl font-medium text-white transition ${
              isDangerous ? 'bg-red-600 hover:bg-red-700' : 'bg-[#8A252C] hover:bg-[#7a2027]'
            }`}
          >
            {isDangerous ? 'Delete' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
};


const SuccessPopup = ({ message, onClose }: { message: string | null, onClose: () => void }) => {
  if (!message) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center w-[320px] animate-popup border border-gray-100">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="#16A34A" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <p className="text-xl font-bold text-gray-900">Success!</p>
        <p className="text-gray-500 mt-2 text-sm">{message}</p>

        <button
          onClick={onClose}
          className="mt-6 px-6 py-2 rounded-lg bg-[#8A252C] text-white font-medium hover:bg-[#7a2027] transition"
        >
          OK
        </button>
      </div>
    </div>
  );
};



const Modal = ({ isOpen, onClose, title, children }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in duration-200 flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center px-6 py-4 border-b bg-gradient-to-r from-gray-50 to-white shrink-0">
          <h3 className="font-bold text-xl text-gray-800">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition p-1 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
};


const Input = ({ label, name, defaultValue, placeholder }: any) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
    <input 
      name={name} 
      defaultValue={defaultValue} 
      placeholder={placeholder} 
      className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#8A252C]/20 focus:border-[#8A252C] outline-none transition" 
    />
  </div>
);

const Textarea = ({ label, name, defaultValue }: any) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
    <textarea 
      name={name} 
      defaultValue={defaultValue} 
      rows={3} 
      className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#8A252C]/20 focus:border-[#8A252C] outline-none transition" 
    />
  </div>
);

const Select = ({ label, name, defaultValue, options }: any) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
    <select 
      name={name} 
      defaultValue={defaultValue} 
      className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#8A252C]/20 focus:border-[#8A252C] outline-none bg-white transition"
    >
      {options.map((o: string) => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);


const ProfileAvatar = ({ src, alt, size = "w-10 h-10" }: { src?: string, alt: string, size?: string }) => (
  <div className={`${size} rounded-full bg-white border border-gray-200 shadow-sm overflow-hidden relative flex items-center justify-center shrink-0`}>
    <Image 
      src={src || "/profile.png"} 
      alt={alt} 
      fill
      className="object-cover"
      unoptimized
    />
  </div>
);



function StatCard({ label, value, color, icon: Icon, trend, trendValue }: any) {
  return (
    <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-sm hover:shadow-lg hover:border-gray-200 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-4 rounded-xl ${color.replace('text', 'bg').replace('600', '100')} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`w-7 h-7 ${color}`} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-semibold ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            <TrendingUp className={`w-3 h-3 ${trend === 'down' ? 'rotate-180' : ''}`} />
            {trendValue}
          </div>
        )}
      </div>
      <div>
        <p className="text-gray-600 text-sm font-medium mb-1">{label}</p>
        <p className={`text-4xl font-bold ${color}`}>{value}</p>
      </div>
    </div>
  );
}

function BarChart({ data, title }: any) {
  const maxValue = Math.max(...data.map((d: any) => d.value), 1);
  return (
    <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <BarChart3 className="w-5 h-5 text-gray-400" />
      </div>
      <div className="flex items-end justify-between gap-4 h-64">
        {data.map((d: any, i: number) => (
          <div key={i} className="flex flex-col items-center gap-3 flex-1 group">
            <div className="relative w-full">
              <div
                className="w-full bg-gradient-to-t from-[#8A252C] to-red-400 rounded-t-xl hover:from-[#7a2027] hover:to-red-500 transition-all cursor-pointer shadow-lg"
                style={{ height: `${(d.value / maxValue) * 200}px` }}
                title={`${d.label}: ${d.value}`}
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {d.value}
                </div>
              </div>
            </div>
            <p className="text-xs font-semibold text-gray-600 text-center">{d.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DonutChart({ data, title }: any) {
  const total = data.reduce((sum: number, d: any) => sum + d.value, 0);
  let currentAngle = 0;
  
  const slices = data.map((d: any) => {
    const percentage = total === 0 ? 0 : (d.value / total) * 100;
    const angle = total === 0 ? 0 : (d.value / total) * 360;
    const startAngle = currentAngle;
    currentAngle += angle;
    return { ...d, percentage, startAngle, angle };
  });

  const colors = ['#8A252C', '#ef4444', '#f59e0b', '#10b981'];

  return (
    <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <PieChart className="w-5 h-5 text-gray-400" />
      </div>
      <div className="flex items-center justify-center gap-8">
        <div className="relative w-48 h-48">
          <svg viewBox="0 0 100 100" className="transform -rotate-90">
            {slices.map((slice: any, i: number) => {
              if (slice.value === 0) return null;
              const startAngle = (slice.startAngle * Math.PI) / 180;
              const endAngle = ((slice.startAngle + slice.angle) * Math.PI) / 180;
              const outerRadius = 45;
              const innerRadius = 28;
              
              const x1 = 50 + outerRadius * Math.cos(startAngle);
              const y1 = 50 + outerRadius * Math.sin(startAngle);
              const x2 = 50 + outerRadius * Math.cos(endAngle);
              const y2 = 50 + outerRadius * Math.sin(endAngle);
              const x3 = 50 + innerRadius * Math.cos(endAngle);
              const y3 = 50 + innerRadius * Math.sin(endAngle);
              const x4 = 50 + innerRadius * Math.cos(startAngle);
              const y4 = 50 + innerRadius * Math.sin(startAngle);
              
              const largeArc = slice.angle > 180 ? 1 : 0;
              
              const pathData = `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4} Z`;
              
              return (
                <path
                  key={i}
                  d={pathData}
                  fill={colors[i % colors.length]}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">{total}</p>
              <p className="text-xs text-gray-500 font-medium">Total</p>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          {slices.map((slice: any, i: number) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: colors[i % colors.length] }}></div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{slice.label}</p>
                <p className="text-xs text-gray-500">{slice.percentage.toFixed(1)}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



function OverviewTab() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminAPI.getStatistics().then(res => {
      setStats(res?.data?.data || res?.data);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center p-20">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-[#8A252C]"></div>
    </div>
  );
  
  if (!stats) return <div className="text-center p-10 text-gray-500">No data available</div>;

  const statCards = [
    { label: "Total Users", value: stats.totalUsers || 0, color: "text-blue-600", icon: Users, trend: "up", trendValue: "Live" },
    { label: "Forums", value: stats.totalForums || 0, color: "text-green-600", icon: MessageSquare, trend: "up", trendValue: "Active" },
    { label: "Discussions", value: stats.totalDiscussions || 0, color: "text-yellow-600", icon: MessageCircle, trend: "up", trendValue: "Active" },
    { label: "Lost & Found", value: stats.totalLostFoundPosts || 0, color: "text-red-600", icon: Search, trend: "down", trendValue: "Reports" },
  ];

  const contentByType = [
    { label: "Forums", value: stats.totalForums || 0 },
    { label: "Discussions", value: stats.totalDiscussions || 0 },
    { label: "Lost Items", value: stats.totalLostFoundPosts || 0 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChart data={contentByType} title="Content Distribution" />
        <DonutChart 
          data={[
            { label: "Forums", value: stats.totalForums || 0 },
            { label: "Discussions", value: stats.totalDiscussions || 0 },
            { label: "Lost Items", value: stats.totalLostFoundPosts || 0 }
          ]} 
          title="Platform Engagement" 
        />
      </div>
    </div>
  );
}

function UsersTab({ showSuccess, showConfirm }: { showSuccess: (msg: string) => void, showConfirm: (title: string, message: string, onConfirm: () => void) => void }) {
  const [users, setUsers] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetch = () => {
    adminAPI.getUsers().then(res => {
      setUsers(res.data || []);
      setLoading(false);
    });
  };
  
  useEffect(() => { fetch(); }, []);

  const save = async (e: any) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const updates = {
      name: fd.get("name"),
      email: fd.get("email"),
      role: fd.get("role"),
      studentId: fd.get("studentId"),
      course: fd.get("course"),
      yearLevel: fd.get("yearLevel"),
      bio: fd.get("bio"),
      isActive: fd.get("isActive") === "on"
    };
    await adminAPI.updateUser(editing.userId, updates);
    setEditing(null); 
    showSuccess("User updated successfully!");
    fetch();
  };

  const handleDelete = (userId: number, userName: string) => {
    showConfirm(
      "Delete User",
      `Are you sure you want to delete ${userName}? This action cannot be undone.`,
      async () => {
        await adminAPI.deleteUser(userId);
        showSuccess("User deleted successfully");
        fetch();
      }
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="animate-pulse space-y-3">
                <div className="h-8 bg-gray-200 rounded w-1/3" />
                <div className="h-10 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <TableSkeleton rows={8} cols={5} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Users Management</h2>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border-2 border-gray-100 shadow-sm">
          <Users className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-semibold text-gray-700">Total: {users.length}</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-gray-50 to-white border-b-2 border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left font-bold text-gray-700">Profile</th>
                <th className="px-6 py-4 text-left font-bold text-gray-700">Name / Email</th>
                <th className="px-6 py-4 text-left font-bold text-gray-700">Role</th>
                <th className="px-6 py-4 text-left font-bold text-gray-700">Year Level</th>
                <th className="px-6 py-4 text-right font-bold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map(u => (
                <tr key={u.userId} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    {/* ✅ Using ProfileAvatar helper for circle & transparent PNGs */}
                    <ProfileAvatar src={u.profileImageUrl} alt={u.name} size="w-12 h-12" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{u.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{u.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${u.role === "ADMIN" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 font-medium">{u.yearLevel || "-"}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setEditing(u)} className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(u.userId, u.name)} className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={!!editing} onClose={() => setEditing(null)} title="Edit User">
        <form onSubmit={save} className="space-y-1">
          <Input label="Name" name="name" defaultValue={editing?.name} />
          <Input label="Email" name="email" defaultValue={editing?.email} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Student ID" name="studentId" defaultValue={editing?.studentId} />
            <Select label="Role" name="role" defaultValue={editing?.role || "USER"} options={["USER", "ADMIN"]} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Course" name="course" defaultValue={editing?.course} />
            <Input label="Year Level" name="yearLevel" defaultValue={editing?.yearLevel} />
          </div>
          <Textarea label="Bio" name="bio" defaultValue={editing?.bio} />
          <div className="flex items-center gap-3 mb-4 p-4 bg-gray-50 rounded-xl border-2 border-gray-100">
            <input type="checkbox" name="isActive" defaultChecked={editing?.isActive} id="active" className="w-4 h-4 accent-[#8A252C]" />
            <label htmlFor="active" className="text-sm font-semibold text-gray-700">Active Account</label>
          </div>
          <button className="w-full bg-gradient-to-r from-[#8A252C] to-[#7a2027] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">Save Changes</button>
        </form>
      </Modal>
    </div>
  );
}

function ForumsTab({ showSuccess, showConfirm }: { showSuccess: (msg: string) => void, showConfirm: (title: string, message: string, onConfirm: () => void) => void }) {
  const [forums, setForums] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [viewing, setViewing] = useState<any>(null);
  const [replies, setReplies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = () => adminAPI.getForums().then(res => {
    setForums(res.data || []);
    setLoading(false);
  });
  useEffect(() => { fetch(); }, []);

  useEffect(() => {
    if (viewing) adminAPI.getForumReplies(viewing.id).then(res => setReplies(res.data || []));
  }, [viewing]);

  const save = async (e: any) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    await adminAPI.updateForum(editing.id, { title: fd.get("title"), content: fd.get("content") });
    setEditing(null);
    showSuccess("Forum post updated");
    fetch();
  };

  const deleteReply = (id: number) => {
    showConfirm(
      "Delete Reply",
      "Are you sure you want to delete this reply? This action cannot be undone.",
      async () => {
        await adminAPI.deleteDiscussion(id);
        const newReplies = replies.filter(r => r.id !== id);
        setReplies(newReplies);
        showSuccess("Reply deleted");
      }
    );
  };

  if (loading) return <div className="flex justify-center p-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8A252C]"></div></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Forums Management</h2>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border-2 border-gray-100 shadow-sm">
          <MessageSquare className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-semibold text-gray-700">Total: {forums.length}</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-gray-50 to-white border-b-2 border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left font-bold text-gray-700">Title</th>
                <th className="px-6 py-4 text-left font-bold text-gray-700">Author</th>
                <th className="px-6 py-4 text-left font-bold text-gray-700">Replies</th>
                <th className="px-6 py-4 text-right font-bold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {forums.map(f => (
                <tr key={f.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-semibold text-gray-900 max-w-xs truncate">{f.title || <span className="italic text-gray-400">Untitled</span>}</td>
                  <td className="px-6 py-4 text-gray-600">{f.user?.name || f.authorName || "Unknown"}</td>
                  <td className="px-6 py-4 text-gray-600">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-bold">{f.replies || 0}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <a href={`/forum/discussion?id=${f.id}`} target="_blank" rel="noreferrer" className="text-gray-500 hover:bg-gray-100 p-2 rounded-lg transition" title="View"><ExternalLink className="w-4 h-4" /></a>
                      <button onClick={() => setViewing(f)} className="text-green-600 hover:bg-green-50 p-2 rounded-lg transition" title="Replies"><MessageCircle className="w-4 h-4" /></button>
                      <button onClick={() => setEditing(f)} className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition" title="Edit"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => showConfirm("Delete Forum", "Are you sure you want to delete this forum? This action cannot be undone.", async () => { await adminAPI.deleteForum(f.id); showSuccess("Forum deleted"); fetch(); })} className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition" title="Delete"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={!!editing} onClose={() => setEditing(null)} title="Edit Forum">
        <form onSubmit={save}>
          <Input label="Title" name="title" defaultValue={editing?.title} />
          <Textarea label="Content" name="content" defaultValue={editing?.content} />
          <button className="w-full bg-gradient-to-r from-[#8A252C] to-[#7a2027] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">Save Changes</button>
        </form>
      </Modal>

      <Modal isOpen={!!viewing} onClose={() => setViewing(null)} title="Forum Details & Replies">
        <div className="mb-6 p-4 bg-gradient-to-r from-[#8A252C]/5 to-red-50 rounded-xl border-2 border-[#8A252C]/10">
          <h3 className="text-xl font-bold text-[#8A252C] mb-2">{viewing?.title}</h3>
          <p className="bg-white p-4 rounded-lg text-gray-700 mb-2 text-sm border border-gray-200">{viewing?.content}</p>
          <div className="text-xs text-gray-500 flex items-center gap-2">
            <Users className="w-3 h-3" />
            Posted by: {viewing?.user?.name || "Unknown"}
          </div>
        </div>

        <div className="border-t-2 pt-4">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-[#8A252C]" />
            Replies ({replies.length})
          </h4>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {replies.length === 0 ? <p className="text-gray-400 italic text-sm text-center py-8">No replies yet.</p> :
              replies.map(r => (
                <div key={r.id} className="border-2 border-gray-100 p-3 rounded-xl bg-gray-50 flex justify-between items-start hover:bg-gray-100 transition">
                  <div className="flex-1">
                    <p className="text-sm text-gray-800 mb-1">{r.content}</p>
                    <p className="text-xs text-blue-600 font-medium">by {r.user?.name || "Unknown"}</p>
                  </div>
                  <button onClick={() => deleteReply(r.id)} className="text-red-500 hover:bg-red-100 p-1.5 rounded-lg flex-shrink-0 transition">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            }
          </div>
        </div>
      </Modal>
    </div>
  );
}

function DiscussionsTab({ showSuccess, showConfirm }: { showSuccess: (msg: string) => void, showConfirm: (title: string, message: string, onConfirm: () => void) => void }) {
  const [items, setItems] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetch = () => adminAPI.getDiscussions().then(res => {
    setItems(res.data || []);
    setLoading(false);
  });
  useEffect(() => { fetch(); }, []);

  const save = async (e: any) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    await adminAPI.updateDiscussion(editing.id, { content: fd.get("content") });
    setEditing(null);
    showSuccess("Discussion reply updated");
    fetch();
  };

  if (loading) return <div className="flex justify-center p-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8A252C]"></div></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">All Discussions</h2>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border-2 border-gray-100 shadow-sm">
          <MessageCircle className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-semibold text-gray-700">Total: {items.length}</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-gray-50 to-white border-b-2 border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left font-bold text-gray-700 w-1/4">Forum Topic</th>
                <th className="px-6 py-4 text-left font-bold text-gray-700 w-1/3">Reply Content</th>
                <th className="px-6 py-4 text-left font-bold text-gray-700 w-1/6">Author</th>
                <th className="px-6 py-4 text-right font-bold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map(d => (
                <tr key={d.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm font-semibold text-[#8A252C] truncate">{d.forum?.title || <span className="text-gray-400 italic">Deleted Forum</span>}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 truncate">{d.content}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{d.user?.name || "Unknown"}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setEditing(d)} className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => showConfirm("Delete Reply", "Are you sure you want to delete this reply? This action cannot be undone.", async () => { await adminAPI.deleteDiscussion(d.id); showSuccess("Reply deleted"); fetch(); })} className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={!!editing} onClose={() => setEditing(null)} title="Edit Reply">
        <form onSubmit={save}>
          <Textarea label="Reply Content" name="content" defaultValue={editing?.content} />
          <button className="w-full bg-gradient-to-r from-[#8A252C] to-[#7a2027] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">Save</button>
        </form>
      </Modal>
    </div>
  );
}

function LostFoundTab({ showSuccess, showConfirm }: { showSuccess: (msg: string) => void, showConfirm: (title: string, message: string, onConfirm: () => void) => void }) {
  const [items, setItems] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetch = () => adminAPI.getLostFound().then(res => {
    setItems(res.data || []);
    setLoading(false);
  });
  useEffect(() => { fetch(); }, []);

  const save = async (e: any) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    await adminAPI.updateLostFound(editing.id, { title: fd.get("title"), status: fd.get("status"), category: fd.get("category"), description: fd.get("description") });
    setEditing(null);
    showSuccess("Item updated successfully");
    fetch();
  };

  if (loading) return <div className="flex justify-center p-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8A252C]"></div></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Lost & Found Items</h2>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border-2 border-gray-100 shadow-sm">
          <Search className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-semibold text-gray-700">Total: {items.length}</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-gray-50 to-white border-b-2 border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left font-bold text-gray-700">Item</th>
                <th className="px-6 py-4 text-left font-bold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left font-bold text-gray-700">Category</th>
                <th className="px-6 py-4 text-left font-bold text-gray-700">Reporter</th>
                <th className="px-6 py-4 text-right font-bold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map(i => (
                <tr key={i.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-semibold text-gray-900">{i.title}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${i.status === "LOST" ? "bg-red-100 text-red-800" : i.status === "FOUND" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                      {i.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{i.category}</td>
                  <td className="px-6 py-4 text-gray-600">{i.user?.name || "Unknown"}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <a href={`/lost-and-found/view?id=${i.id}`} target="_blank" rel="noreferrer" className="text-gray-500 hover:bg-gray-100 p-2 rounded-lg transition">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button onClick={() => setEditing(i)} className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => showConfirm("Delete Item", "Are you sure you want to delete this item? This action cannot be undone.", async () => { await adminAPI.deleteLostFound(i.id); showSuccess("Item deleted"); fetch(); })} className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={!!editing} onClose={() => setEditing(null)} title="Edit Item">
        <form onSubmit={save}>
          <Input label="Title" name="title" defaultValue={editing?.title} />
          <Textarea label="Description" name="description" defaultValue={editing?.description} />
          <Select label="Status" name="status" defaultValue={editing?.status} options={["LOST", "FOUND", "CLAIMED"]} />
          <Input label="Category" name="category" defaultValue={editing?.category} />
          <button className="w-full bg-gradient-to-r from-[#8A252C] to-[#7a2027] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">Save Changes</button>
        </form>
      </Modal>
    </div>
  );
}



export function AdminDashboard() {
  const [tab, setTab] = useState("overview");
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeUsers, setActiveUsers] = useState<any[]>([]);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{ isOpen: boolean; title: string; message: string; onConfirm: () => void } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  
  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  
  const showConfirm = (title: string, message: string, onConfirm: () => void) => {
    setConfirmDialog({ isOpen: true, title, message, onConfirm });
  };

  const handleConfirm = () => {
    confirmDialog?.onConfirm();
    setConfirmDialog(null);
  };

  useEffect(() => {
    const fetchActiveUsers = async () => {
      try {
        const users = await userAPI.getActiveUsers();
        setActiveUsers(users || []);
      } catch (error) {
        console.error("Failed to fetch active users:", error);
      }
    };

    fetchActiveUsers();
    const interval = setInterval(fetchActiveUsers, 10 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkAdmin = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;
      
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(window.atob(base64));
        
        if (payload.role !== "ADMIN") {
          window.location.href = "/";
        }
        setIsAdmin(true);
      } catch (e) {
        window.location.href = "/";
      }
    };
    checkAdmin();
  }, []);

  const tabs = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "users", label: "Users", icon: Users },
    { id: "forums", label: "Forums", icon: MessageSquare },
    { id: "discussions", label: "Discussions", icon: MessageCircle },
    { id: "lost-found", label: "Lost & Found", icon: Search },
  ];

  if (!isAdmin) return <div>Loading...</div>;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans">
      <SuccessPopup message={successMsg} onClose={() => setSuccessMsg(null)} />
      <ConfirmationPopup
        isOpen={confirmDialog?.isOpen ?? false}
        title={confirmDialog?.title ?? ""}
        message={confirmDialog?.message ?? ""}
        onConfirm={handleConfirm}
        onCancel={() => setConfirmDialog(null)}
        isDangerous={true}
      />

      {/* Sidebar: removed top margin so it starts at top (no top gap) */}
      <aside 
        className={`${isSidebarOpen ? "w-72" : "w-20"} bg-gradient-to-b from-[#8A252C] to-[#6a1c21] text-white fixed top-15 bottom-0 z-40 transition-all duration-300 flex flex-col shadow-2xl overflow-y-auto`}
      >
         <div className="p-6 flex items-center justify-between border-b border-white/20 shrink-0">
           {isSidebarOpen && (
             <div>
               <h1 className="font-bold text-2xl tracking-wider">ADMIN</h1>
               <p className="text-xs text-white/70 mt-1">Dashboard Panel</p>
             </div>
           )}
           <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/20 rounded-lg transition">
             <Menu className={`w-5 h-5 transition-transform duration-300 ${!isSidebarOpen ? 'rotate-180' : ''}`} />
           </button>
         </div>

         <nav className="flex-1 py-6 space-y-2 px-3">
           {tabs.map(({ id, label, icon: Icon }) => (
             <button
               key={id}
               onClick={() => setTab(id)}
               className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 ${
                 tab === id
                   ? "bg-white text-[#8A252C] shadow-lg font-bold"
                   : "text-white/80 hover:bg-white/10 hover:text-white"
               }`}
             >
               <Icon className="w-5 h-5 flex-shrink-0" />
               {isSidebarOpen && <span className="text-sm">{label}</span>}
               {tab === id && isSidebarOpen && <ChevronRight className="w-4 h-4 ml-auto" />}
             </button>
           ))}
         </nav>

         <div className="p-4 border-t border-white/20 shrink-0">
          {/* online users box (keeps compact, avoids collision on narrow screens) */}
          {isSidebarOpen && (
            <div className="bg-white/10 rounded-xl p-3 mt-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center relative flex-shrink-0">
                  <Users className="w-5 h-5" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#8A252C]"></span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold truncate">Online Users</p>
                  <p className="text-xs text-white/70 truncate">{activeUsers.length} Active Now</p>
                </div>
              </div>
            </div>
          )}
        </div>
       </aside>

      {/* Main Content */}
      <main className={`flex-1 ${isSidebarOpen ? "ml-72" : "ml-20"} transition-all duration-300 p-8 pt-10 overflow-y-auto`}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {tabs.find(t => t.id === tab)?.label}
            </h1>
            <p className="text-gray-500">Welcome back! Here's what's happening today.</p>
          </div>

          {/* Content */}
          {tab === "overview" && <OverviewTab />}
          {tab === "users" && <UsersTab showSuccess={showSuccess} showConfirm={showConfirm} />}
          {tab === "forums" && <ForumsTab showSuccess={showSuccess} showConfirm={showConfirm} />}
          {tab === "discussions" && <DiscussionsTab showSuccess={showSuccess} showConfirm={showConfirm} />}
          {tab === "lost-found" && <LostFoundTab showSuccess={showSuccess} showConfirm={showConfirm} />}
        </div>
      </main>
    </div>
  );
}

export default function AdminPage() {
  return (
    <RequireAuth requireRole="ADMIN" redirectIfUnauthorized="/">
      <AdminDashboard />
    </RequireAuth>
  );
}