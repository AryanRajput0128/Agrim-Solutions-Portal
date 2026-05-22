import { useListAppointments, useGetAppointmentStats } from "@workspace/api-client-react";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import {
  Phone, Mail, Calendar, FileText, Users, Clock,
  CheckCircle2, XCircle, AlertCircle, Search, X, ChevronRight, LogOut
} from "lucide-react";

type Appointment = {
  id: number;
  name: string;
  phone: string;
  email: string;
  query: string;
  serviceType: string;
  status: string;
  preferredDate?: string;
  preferredTime?: string;
  createdAt: string;
};

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  confirmed: "bg-blue-100 text-blue-800 border-blue-200",
  completed: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

const STATUS_ICONS: Record<string, React.ReactNode> = {
  pending: <Clock className="w-3.5 h-3.5" />,
  confirmed: <AlertCircle className="w-3.5 h-3.5" />,
  completed: <CheckCircle2 className="w-3.5 h-3.5" />,
  cancelled: <XCircle className="w-3.5 h-3.5" />,
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

function AppointmentModal({ appt, onClose }: { appt: Appointment; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-primary text-primary-foreground px-6 py-5 rounded-t-2xl flex items-start justify-between gap-4">
          <div>
            <p className="text-primary-foreground/60 text-xs font-medium uppercase tracking-widest mb-1">Appointment #{appt.id}</p>
            <h2 className="text-xl font-serif font-bold">{appt.name}</h2>
          </div>
          <button onClick={onClose} className="mt-1 p-1.5 rounded-lg hover:bg-white/10 transition-colors shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-6 space-y-5">
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-full border ${STATUS_COLORS[appt.status] ?? ""}`}>
              {STATUS_ICONS[appt.status]}
              {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
            </span>
            <span className="text-xs text-muted-foreground">{formatDate(appt.createdAt)}</span>
          </div>

          {(appt.preferredDate || appt.preferredTime) && (
            <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-4 flex items-center gap-3">
              <Calendar className="w-5 h-5 text-secondary shrink-0" />
              <div>
                <p className="text-xs font-semibold text-secondary uppercase tracking-wide mb-0.5">Preferred Appointment</p>
                <p className="text-sm font-medium text-foreground">
                  {appt.preferredDate && new Date(appt.preferredDate).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}
                  {appt.preferredDate && appt.preferredTime && " · "}
                  {appt.preferredTime}
                </p>
              </div>
            </div>
          )}

          <div className="bg-muted/40 rounded-xl p-4 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Contact Information</h3>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-secondary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <a href={`tel:${appt.phone}`} className="font-semibold text-foreground hover:text-primary transition-colors">{appt.phone}</a>
              </div>
            </div>
            {appt.email && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-secondary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <a href={`mailto:${appt.email}`} className="font-semibold text-foreground hover:text-primary transition-colors break-all">{appt.email}</a>
                </div>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Service Requested</h3>
            <span className="inline-block bg-primary/8 text-primary text-sm font-semibold px-4 py-2 rounded-full border border-primary/15">
              {appt.serviceType}
            </span>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Query / Work Details</h3>
            <div className="bg-muted/30 border border-border rounded-xl p-4">
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{appt.query}</p>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <a
              href={`tel:${appt.phone}`}
              className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-2.5 rounded-lg hover:bg-primary/90 transition-colors text-sm"
            >
              <Phone className="w-4 h-4" /> Call Now
            </a>
            {appt.email && (
              <a
                href={`mailto:${appt.email}`}
                className="flex-1 flex items-center justify-center gap-2 bg-secondary text-secondary-foreground font-semibold py-2.5 rounded-lg hover:bg-secondary/90 transition-colors text-sm"
              >
                <Mail className="w-4 h-4" /> Send Email
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Admin() {
  const { data: appointments, isLoading, isError } = useListAppointments();
  const { data: stats } = useGetAppointmentStats();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selected, setSelected] = useState<Appointment | null>(null);
  const [authState, setAuthState] = useState<"checking" | "authed" | "denied">("checking");
  const [, navigate] = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      navigate("/admin-login");
      return;
    }
    fetch("/api/auth/verify", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data: { valid?: boolean }) => {
        if (data.valid) {
          setAuthState("authed");
        } else {
          localStorage.removeItem("admin_token");
          navigate("/admin-login");
        }
      })
      .catch(() => {
        navigate("/admin-login");
      });
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("admin_token");
    navigate("/admin-login");
  }

  if (authState === "checking") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm">Verifying access...</p>
        </div>
      </div>
    );
  }

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
      {selected && <AppointmentModal appt={selected} onClose={() => setSelected(null)} />}

      {/* Header */}
      <div className="bg-primary text-primary-foreground px-6 py-8">
        <div className="max-w-7xl mx-auto flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold mb-1">Admin Dashboard</h1>
            <p className="text-primary-foreground/70 text-sm">Agrim Solutions — Appointment Management</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-primary-foreground/80 hover:text-primary-foreground rounded-lg text-sm font-medium transition-colors mt-1"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
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
              <div className={s.color}>{s.icon}</div>
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

          {isLoading && <div className="p-12 text-center text-muted-foreground text-sm">Loading appointments...</div>}
          {isError && <div className="p-12 text-center text-red-500 text-sm">Failed to load appointments. Please refresh.</div>}
          {!isLoading && !isError && filtered.length === 0 && <div className="p-12 text-center text-muted-foreground text-sm">No appointments found.</div>}

          {!isLoading && !isError && filtered.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/40 border-b border-border">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">#</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Name</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Contact</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Service</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Preferred</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Submitted</th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((appt) => (
                    <tr
                      key={appt.id}
                      onClick={() => setSelected(appt)}
                      className="hover:bg-primary/5 cursor-pointer transition-colors group"
                    >
                      <td className="px-6 py-4 text-muted-foreground font-mono text-xs">{appt.id}</td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-foreground">{appt.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-foreground">
                            <Phone className="w-3.5 h-3.5 text-secondary shrink-0" />
                            <span>{appt.phone}</span>
                          </div>
                          {appt.email && (
                            <div className="flex items-center gap-1.5 text-muted-foreground">
                              <Mail className="w-3.5 h-3.5 text-secondary shrink-0" />
                              <span className="truncate max-w-[160px]">{appt.email}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block bg-primary/8 text-primary text-xs font-medium px-2.5 py-1 rounded-full border border-primary/15">
                          {appt.serviceType}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-muted-foreground">
                        {appt.preferredDate || appt.preferredTime ? (
                          <div className="space-y-0.5">
                            {appt.preferredDate && (
                              <div>{new Date(appt.preferredDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</div>
                            )}
                            {appt.preferredTime && <div className="text-secondary font-medium">{appt.preferredTime}</div>}
                          </div>
                        ) : (
                          <span className="text-muted-foreground/50">—</span>
                        )}
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
                      <td className="px-6 py-4">
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
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
