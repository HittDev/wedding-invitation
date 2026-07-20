'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';
import { Divider } from '@/components/ui/Divider';
import { Text } from '@/components/ui/Typography';

interface FooterProps {
  className?: string;
  showLinks?: boolean;
}

const Footer: React.FC<FooterProps> = ({
  className = '',
  showLinks = true,
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bg-primary-cream border-t border-primary-gold border-opacity-20 ${className}`}>
      <Container size="xl" padding="lg">
        {showLinks && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
              {/* Company Info */}
              <div>
                <h3 className="font-serif font-bold text-lg mb-4 text-neutral-dark">
                  Wedding Invitation
                </h3>
                <Text variant="small">
                  Plataforma digital para invitaciones de boda elegantes e interactivas.
                </Text>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-medium text-sm mb-4 text-neutral-dark">Enlaces</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-sm text-neutral-dark hover:text-primary-gold transition-colors"
                    >
                      Características
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-neutral-dark hover:text-primary-gold transition-colors"
                    >
                      Precios
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-neutral-dark hover:text-primary-gold transition-colors"
                    >
                      Contacto
                    </a>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 className="font-medium text-sm mb-4 text-neutral-dark">Legal</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-sm text-neutral-dark hover:text-primary-gold transition-colors"
                    >
                      Privacidad
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-neutral-dark hover:text-primary-gold transition-colors"
                    >
                      Términos
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-neutral-dark hover:text-primary-gold transition-colors"
                    >
                      Cookies
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <Divider />
          </>
        )}

        {/* Copyright */}
        <div className="text-center pt-8">
          <Text variant="muted">
            © {currentYear} Wedding Invitation. Todos los derechos reservados. Hecho con 💍
          </Text>
        </div>
      </Container>
    </footer>
  );
};

export { Footer };
