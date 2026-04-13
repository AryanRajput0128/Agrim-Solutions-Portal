import { useListAppointments, useGetAppointmentStats } from "@workspace/api-client-react";
import { useState } from "react";
import { Phone, Mail, Calendar, FileText, Users, Clock, CheckCircle2, XCircle, AlertCircle, Search } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  confirmed: "bg-blue-100 text-blue-800 border-blue-200",
  completed: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

const STATUS_ICONS: Record<string, React.ReactNode> = {
  pending: <Clock className="w-3 h-3" />,
  confirmed: <AlertCircle className="w-3 h-3" />,
  completed: <CheckCircle2 className="w-3 h-3" />,
  cancelled: <XCircle className="w-3 h-3" />,
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Admin() {
  const { data: appointments, isLoading, isError } = useListAppointments();
  const { data: stats } = useGetAppointmentStats();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filtered = (appointments ?? []).filter((a) => {
    const matchSearch =
      !search ||
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.phone.includes(search) ||
      a.email.toLowerCase().includes(search.toLowerCase()) ||
      a.serviceType.toLowerCase().includes(search.toLowerCase()) ||
      a.query.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || a.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-serif font-bold mb-1">Admin Dashboard</h1>
          <p className="text-primary-foreground/70 text-sm">Agrim Solutions — Appointment Management</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: "Total", value: stats?.total ?? 0, icon: <Users className="w-5 h-5" />, color: "text-primary" },
            { label: "Pending", value: stats?.pending ?? 0, icon: <Clock className="w-5 h-5" />, color: "text-yellow-600" },
            { label: "Confirmed", value: stats?.confirmed ?? 0, icon: <AlertCircle className="w-5 h-5" />, color: "text-blue-600" },
            { label: "Completed", value: stats?.completed ?? 0, icon: <CheckCircle2 className="w-5 h-5" />, color: "text-green-600" },
            { label: "Cancelled", value: stats?.cancelled ?? 0, icon: <XCircle className="w-5 h-5" />, color: "text-red-600" },
            { label: "This Week", value: stats?.recentCount ?? 0, icon: <Calendar className="w-5 h-5" />, color: "text-purple-600" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-border p-4 shadow-sm flex flex-col gap-2">
              <div className={`${s.color}`}>{s.icon}</div>
              <div className="text-2xl font-bold text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-border shadow-sm p-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, phone, email, service or query..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              Appointment Requests
            </h2>
            <span className="text-sm text-muted-foreground">{filtered.length} record{filtered.length !== 1 ? "s" : ""}</span>
          </div>

          {isLoading && (
            <div className="p-12 text-center text-muted-foreground text-sm">Loading appointments...</div>
          )}
          {isError && (
            <div className="p-12 text-center text-red-500 text-sm">Failed to load appointments. Please refresh.</div>
          )}
          {!isLoading && !isError && filtered.length === 0 && (
            <div className="p-12 text-center text-muted-foreground text-sm">No appointments found.</div>
          )}

          {!isLoading && !isError && filtered.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/40 border-b border-border">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">#</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Name</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Contact</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Service</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Query</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Submitted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((appt) => (
                    <tr key={appt.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-6 py-4 text-muted-foreground font-mono text-xs">{appt.id}</td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-foreground">{appt.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-foreground">
                            <Phone className="w-3.5 h-3.5 text-secondary shrink-0" />
                            <a href={`tel:${appt.phone}`} className="hover:text-primary transition-colors">{appt.phone}</a>
                          </div>
                          {appt.email && (
                            <div className="flex items-center gap-1.5 text-muted-foreground">
                              <Mail className="w-3.5 h-3.5 text-secondary shrink-0" />
                              <a href={`mailto:${appt.email}`} className="hover:text-primary transition-colors truncate max-w-[180px]">{appt.email}</a>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block bg-primary/8 text-primary text-xs font-medium px-2.5 py-1 rounded-full border border-primary/15">
                          {appt.serviceType}
                        </span>
                      </td>
                      <td className="px-6 py-4 max-w-xs">
                        <p className="text-muted-foreground text-xs leading-relaxed line-clamp-3">{appt.query}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${STATUS_COLORS[appt.status] ?? ""}`}>
                          {STATUS_ICONS[appt.status]}
                          {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-muted-foreground whitespace-nowrap">
                        {formatDate(appt.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
