export type RequestStatus = 'nuevo' | 'en_proceso' | 'completado';
export type RequestPriority = 'alta' | 'media' | 'baja';

export interface RequestBase {
  tenantId?: string;
  customerName: string;
  business: string;
  email: string;
  phone: string;
  channel: string;
  service: string;
  budgetRange: string;
  notes?: string;
  priority?: RequestPriority;
  status?: RequestStatus;
  responseMinutes?: number;
  createdAt?: string;
}

export interface RequestEntity extends Required<Omit<RequestBase, 'responseMinutes' | 'notes' | 'priority' | 'status' | 'createdAt'>> {
  id: string;
  priority: RequestPriority;
  status: RequestStatus;
  responseMinutes: number;
  notes: string;
  createdAt: string;
  updatedAt?: string;
}

export interface UpdateRequestPayload {
  id: string;
  tenantId?: string;
  status?: RequestStatus;
  notes?: string;
  priority?: RequestPriority;
}
