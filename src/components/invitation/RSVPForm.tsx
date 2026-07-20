'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Typography';
import { Loader } from '@/components/ui/Loader';
import { RSVPStatus } from '@/types';

interface RSVPFormProps {
  code: string;
  guestName: string;
  allowedGuests: number;
  currentStatus?: RSVPStatus;
  onSubmit: (data: RSVPFormData) => Promise<void>;
  isLoading?: boolean;
  className?: string;
}

export interface RSVPFormData {
  status: RSVPStatus;
  guestCount?: number;
  dietaryRestrictions?: string;
  specialRequests?: string;
}

const RSVPForm: React.FC<RSVPFormProps> = ({
  code,
  guestName,
  allowedGuests,
  currentStatus,
  onSubmit,
  isLoading = false,
  className = '',
}) => {
  const [status, setStatus] = useState<RSVPStatus>(currentStatus || 'pending');
  const [guestCount, setGuestCount] = useState<number>(1);
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (status === 'confirmed' && guestCount > allowedGuests) {
        setError(`No puedes confirmar más de ${allowedGuests} personas`);
        return;
      }

      await onSubmit({
        status,
        guestCount: status === 'confirmed' ? guestCount : undefined,
        dietaryRestrictions: dietaryRestrictions || undefined,
        specialRequests: specialRequests || undefined,
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al enviar RSVP');
    }
  };

  return (
    <Card className={`animate-slide-up ${className}`}>
      <CardHeader>
        <CardTitle>Confirmar Asistencia</CardTitle>
        <CardDescription>¿Podrás acompañarnos en este gran día?</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Status Selection */}
          <div className="space-y-3">
            <Label>¿Confirmas tu asistencia?</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setStatus('confirmed')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  status === 'confirmed'
                    ? 'border-green-500 bg-green-50'
                    : 'border-primary-gold border-opacity-20 hover:border-opacity-40'
                }`}
              >
                <p className="font-medium text-sm">✓ Confirmo</p>
              </button>
              <button
                type="button"
                onClick={() => setStatus('rejected')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  status === 'rejected'
                    ? 'border-red-500 bg-red-50'
                    : 'border-primary-gold border-opacity-20 hover:border-opacity-40'
                }`}
              >
                <p className="font-medium text-sm">✗ No puedo</p>
              </button>
            </div>
          </div>

          {/* Guest Count (only if confirmed) */}
          {status === 'confirmed' && (
            <div className="space-y-2 animate-slide-up">
              <Label htmlFor="guestCount" required>
                Número de personas (máximo {allowedGuests})
              </Label>
              <Input
                id="guestCount"
                type="number"
                min="1"
                max={allowedGuests}
                value={guestCount}
                onChange={(e) => setGuestCount(Math.max(1, Math.min(allowedGuests, parseInt(e.target.value) || 1)))}
                required
              />
            </div>
          )}

          {/* Dietary Restrictions */}
          <div className="space-y-2 animate-slide-up">
            <Label htmlFor="dietary">Restricciones dietarias</Label>
            <Input
              id="dietary"
              type="text"
              placeholder="Ej: Vegetariano, Sin gluten..."
              value={dietaryRestrictions}
              onChange={(e) => setDietaryRestrictions(e.target.value)}
            />
          </div>

          {/* Special Requests */}
          <div className="space-y-2 animate-slide-up">
            <Label htmlFor="requests">Solicitudes especiales</Label>
            <Input
              id="requests"
              type="text"
              placeholder="Cuéntanos si tienes algo especial en mente..."
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm animate-fade-in">
              ✓ Respuesta registrada correctamente
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isLoading}
            disabled={isLoading || success}
          >
            {success ? '✓ Confirmado' : 'Enviar Respuesta'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export { RSVPForm };
