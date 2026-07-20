'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/utils/formatting';
import { RSVPStatus } from '@/types';

interface InvitationCardProps {
  guestName: string;
  eventDate: Date;
  location: string;
  eventTitle?: string;
  rsvpStatus?: RSVPStatus;
  code: string;
  couple?: {
    name1: string;
    name2: string;
  };
  className?: string;
}

const InvitationCard: React.FC<InvitationCardProps> = ({
  guestName,
  eventDate,
  location,
  eventTitle = 'Celebración de Matrimonio',
  rsvpStatus,
  code,
  couple,
  className = '',
}) => {
  const statusColors: Record<RSVPStatus, string> = {
    confirmed: 'success',
    rejected: 'error',
    pending: 'warning',
    no_response: 'info',
  };

  const statusLabels: Record<RSVPStatus, string> = {
    confirmed: 'Confirmado',
    rejected: 'Rechazado',
    pending: 'Pendiente',
    no_response: 'Sin respuesta',
  };

  return (
    <Card className={`overflow-hidden animate-fade-in ${className}`}>
      {/* Header with decorative background */}
      <div className="bg-gradient-to-r from-primary-gold to-primary-warm-beige p-8 text-white">
        <CardHeader className="border-0 p-0 mb-0">
          {couple && (
            <p className="text-center text-lg font-serif italic mb-3">
              {couple.name1} & {couple.name2}
            </p>
          )}
          <CardTitle className="text-center text-white text-3xl mb-2">{eventTitle}</CardTitle>
          <CardDescription className="text-center text-white text-opacity-90">
            ¡Te invitamos a celebrar con nosotros!
          </CardDescription>
        </CardHeader>
      </div>

      {/* Content */}
      <CardContent className="space-y-6 py-8">
        {/* Guest greeting */}
        <div className="text-center border-b border-primary-gold border-opacity-20 pb-6">
          <p className="text-sm text-neutral-dark text-opacity-60 mb-1">Estimado/a</p>
          <p className="text-2xl font-serif font-bold text-primary-dark">{guestName}</p>
        </div>

        {/* Event details */}
        <div className="space-y-4">
          {/* Date */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-gold bg-opacity-10 flex items-center justify-center">
              <span className="text-primary-gold">📅</span>
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-dark text-opacity-60">Fecha</p>
              <p className="text-lg font-serif font-bold text-neutral-dark">
                {formatDate(eventDate, 'EEEE, d MMMM yyyy')}
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-gold bg-opacity-10 flex items-center justify-center">
              <span className="text-primary-gold">📍</span>
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-dark text-opacity-60">Ubicación</p>
              <p className="text-lg font-serif font-bold text-neutral-dark">{location}</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-gold border-opacity-20" />

        {/* RSVP Status */}
        {rsvpStatus && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-neutral-dark text-opacity-60">Estado RSVP</span>
            <Badge variant={statusColors[rsvpStatus]} size="sm">
              {statusLabels[rsvpStatus]}
            </Badge>
          </div>
        )}

        {/* Code */}
        <div className="bg-primary-cream rounded-lg p-4 text-center">
          <p className="text-xs font-medium text-neutral-dark text-opacity-60 mb-1">Código de invitación</p>
          <p className="text-xl font-mono font-bold text-primary-gold tracking-widest">{code}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export { InvitationCard };
