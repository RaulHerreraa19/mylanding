const safeId = () => (globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : `req-${Date.now()}`);
export class RequestService {
    repository;
    defaultTenant;
    constructor(repository, defaultTenant) {
        this.repository = repository;
        this.defaultTenant = defaultTenant;
    }
    async list(tenantId) {
        return this.repository.list(tenantId);
    }
    async create(payload) {
        const tenantId = payload.tenantId || this.defaultTenant;
        this.ensureRequired(payload, ['customerName', 'business', 'email', 'phone', 'channel', 'service', 'budgetRange']);
        const request = {
            id: safeId(),
            tenantId,
            customerName: payload.customerName,
            business: payload.business,
            email: payload.email,
            phone: payload.phone,
            channel: payload.channel,
            service: payload.service,
            budgetRange: payload.budgetRange,
            notes: payload.notes ?? '',
            priority: payload.priority ?? 'media',
            status: payload.status ?? 'nuevo',
            responseMinutes: payload.responseMinutes ?? 0,
            createdAt: payload.createdAt ?? new Date().toISOString()
        };
        return this.repository.create(request);
    }
    async update(payload) {
        if (!payload.id) {
            throw new Error('El campo id es obligatorio.');
        }
        if (!payload.status && !payload.notes && !payload.priority) {
            throw new Error('Debes enviar al menos un campo para actualizar.');
        }
        const updates = {};
        if (payload.status) {
            this.validateStatus(payload.status);
            updates.status = payload.status;
        }
        if (payload.notes) {
            updates.notes = payload.notes;
        }
        if (payload.priority) {
            updates.priority = payload.priority;
        }
        return this.repository.update(payload.id, payload.tenantId ?? this.defaultTenant, updates);
    }
    ensureRequired(payload, keys) {
        const missing = keys.filter((key) => !payload[key]);
        if (missing.length) {
            throw new Error(`Campos requeridos faltantes: ${missing.join(', ')}`);
        }
    }
    validateStatus(status) {
        const allowed = ['nuevo', 'en_proceso', 'completado'];
        if (!allowed.includes(status)) {
            throw new Error('Estado no válido.');
        }
    }
}
//# sourceMappingURL=RequestService.js.map