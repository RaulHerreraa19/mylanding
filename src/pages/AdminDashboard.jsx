import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  CircleDashed,
  Clock3,
  Filter,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  User2
} from 'lucide-react';
import { getRequests, updateRequestStatus } from '../services/requestApi.js';

const statusLabels = {
  nuevo: 'Nuevo',
  en_proceso: 'En proceso',
  completado: 'Completado'
};

const statusStyles = {
  nuevo: 'bg-blue-500/10 text-blue-300',
  en_proceso: 'bg-amber-400/10 text-amber-200',
  completado: 'bg-emerald-500/10 text-emerald-300'
};

const priorityStyles = {
  alta: 'text-rose-300 bg-rose-500/10',
  media: 'text-cyan-300 bg-cyan-500/10',
  baja: 'text-white/70 bg-white/5'
};

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadRequests = async () => {
      try {
        setLoading(true);
        const data = await getRequests();
        if (!isMounted) return;
        setRequests(data);
        setSelectedRequest(data[0] ?? null);
      } catch (err) {
        if (!isMounted) return;
        setError(err.message || 'No se pudieron cargar las solicitudes.');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadRequests();

    return () => {
      isMounted = false;
    };
  }, []);

  const metrics = useMemo(() => {
    if (!requests.length) {
      return {
        total: 0,
        inProgress: 0,
        completed: 0,
        avgResponse: 0
      };
    }

    const inProgress = requests.filter((req) => req.status === 'en_proceso').length;
    const completed = requests.filter((req) => req.status === 'completado').length;
    const avgResponse = Math.round(
      requests.reduce((acc, req) => acc + (req.responseMinutes ?? 0), 0) / requests.length
    );

    return {
      total: requests.length,
      inProgress,
      completed,
      avgResponse
    };
  }, [requests]);

  const visibleRequests = useMemo(() => {
    return requests.filter((req) => {
      const matchesStatus = statusFilter === 'all' || req.status === statusFilter;
      const term = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !term ||
        req.customerName.toLowerCase().includes(term) ||
        req.business.toLowerCase().includes(term) ||
        req.service.toLowerCase().includes(term);
      return matchesStatus && matchesSearch;
    });
  }, [requests, statusFilter, searchTerm]);

  const handleStatusChange = async (id, status) => {
    try {
      setError(null);
      setUpdatingId(id);
      const updated = await updateRequestStatus(id, status);
      setRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, status: updated.status ?? status } : req))
      );
      if (selectedRequest?.id === id) {
        setSelectedRequest((prev) => (prev ? { ...prev, status: updated.status ?? status } : prev));
      }
    } catch (err) {
      setError(err.message || 'No se pudo actualizar el estado.');
    } finally {
      setUpdatingId(null);
    }
  };

  const formatDate = (isoDate) =>
    new Intl.DateTimeFormat('es-MX', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(new Date(isoDate));

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <header className="flex flex-col gap-4 border-b border-white/5 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">Panel interno</p>
            <h1 className="mt-2 text-3xl font-display font-semibold">Gestión de solicitudes</h1>
            <p className="text-white/60">
              Consulta el estado de cada cliente y prioriza las oportunidades calientes.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/"
              className="rounded-full border border-white/15 px-5 py-2 text-sm font-semibold text-white/80 transition hover:border-white/40"
            >
              Ver landing
            </Link>
            <a
              href="mailto:hola@innovadigitalsystems.com"
              className="rounded-full bg-neon px-6 py-2 text-sm font-semibold text-midnight shadow-lg shadow-cyan-500/30 transition hover:-translate-y-0.5"
            >
              Contactar leads
            </a>
          </div>
        </header>

        <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-4">
          {[{ label: 'Solicitudes activas', value: metrics.total, icon: CircleDashed }, { label: 'En proceso', value: metrics.inProgress, icon: Clock3 }, { label: 'Completadas', value: metrics.completed, icon: CheckCircle2 }, { label: 'Tiempo respuesta (min)', value: metrics.avgResponse, icon: ShieldCheck }].map((card) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/60">{card.label}</p>
                  <p className="text-2xl font-display font-semibold">{card.value}</p>
                </div>
                <card.icon className="h-8 w-8 text-neon" />
              </div>
            </motion.div>
          ))}
        </section>

        <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="flex flex-col gap-4 border-b border-white/5 pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-1 items-center gap-2 rounded-full border border-white/10 bg-midnight/40 px-4 py-2">
                  <Search className="h-4 w-4 text-white/40" />
                  <input
                    type="search"
                    placeholder="Busca por cliente, negocio o servicio"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <Filter className="h-4 w-4" />
                  <select
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value)}
                    className="rounded-full border border-white/10 bg-transparent px-3 py-1 text-white"
                  >
                    <option value="all">Todos</option>
                    <option value="nuevo">Nuevos</option>
                    <option value="en_proceso">En proceso</option>
                    <option value="completado">Completados</option>
                  </select>
                </div>
              </div>

              {error && (
                <p className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-100">
                  {error}
                </p>
              )}

              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="text-xs uppercase tracking-wide text-white/50">
                    <tr>
                      <th className="py-3">Cliente</th>
                      <th className="py-3">Servicio</th>
                      <th className="py-3">Canal</th>
                      <th className="py-3">Fecha</th>
                      <th className="py-3">Prioridad</th>
                      <th className="py-3">Estado</th>
                      <th className="py-3 text-right">Actualizar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-white/70">
                          <div className="flex items-center justify-center gap-2">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Cargando solicitudes...
                          </div>
                        </td>
                      </tr>
                    ) : visibleRequests.length ? (
                      visibleRequests.map((req) => (
                        <tr
                          key={req.id}
                          onClick={() => setSelectedRequest(req)}
                          className="cursor-pointer border-t border-white/5 text-white/80 transition hover:bg-white/5"
                        >
                          <td className="py-3">
                            <p className="font-semibold text-white">{req.customerName}</p>
                            <p className="text-xs text-white/50">{req.business}</p>
                          </td>
                          <td className="py-3">{req.service}</td>
                          <td className="py-3">{req.channel}</td>
                          <td className="py-3">{formatDate(req.createdAt)}</td>
                          <td className="py-3">
                            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityStyles[req.priority] ?? 'bg-white/5 text-white/60'}`}>
                              {req.priority}
                            </span>
                          </td>
                          <td className="py-3">
                            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[req.status] ?? 'bg-white/5 text-white/60'}`}>
                              {statusLabels[req.status]}
                            </span>
                          </td>
                          <td className="py-3 text-right">
                            <select
                              value={req.status}
                              onChange={(event) => handleStatusChange(req.id, event.target.value)}
                              className="rounded-full border border-white/10 bg-transparent px-3 py-1 text-xs"
                              disabled={updatingId === req.id}
                            >
                              <option value="nuevo">Nuevo</option>
                              <option value="en_proceso">En proceso</option>
                              <option value="completado">Completado</option>
                            </select>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="py-6 text-center text-white/60">
                          No encontramos solicitudes con los filtros actuales.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            {selectedRequest ? (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-neon/20 p-3 text-neon">
                    <User2 className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Cliente</p>
                    <p className="text-lg font-semibold">{selectedRequest.customerName}</p>
                    <p className="text-white/60">{selectedRequest.business}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-white/70">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-white/40" />
                    <a href={`mailto:${selectedRequest.email}`} className="hover:text-white">
                      {selectedRequest.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-white/40" />
                    <a href={`tel:${selectedRequest.phone}`} className="hover:text-white">
                      {selectedRequest.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-white/40" />
                    <p>{selectedRequest.channel}</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-midnight/40 p-4 text-sm text-white/80">
                  <p className="text-xs uppercase tracking-[0.4em] text-white/50">Servicio</p>
                  <p className="text-xl font-semibold text-white">{selectedRequest.service}</p>
                  <p className="text-white/60">Presupuesto: {selectedRequest.budgetRange}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-white/50">Notas del cliente</p>
                  <p className="mt-2 rounded-2xl border border-white/10 bg-white/10 p-4 text-white/80">
                    {selectedRequest.notes}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleStatusChange(selectedRequest.id, 'completado')}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-400/90 px-4 py-3 text-sm font-semibold text-midnight transition hover:-translate-y-0.5"
                  disabled={selectedRequest.status === 'completado'}
                >
                  <Sparkles className="h-4 w-4" />
                  Marcar como completado
                </button>
              </div>
            ) : (
              <p className="text-white/60">Selecciona una solicitud para ver el detalle.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
