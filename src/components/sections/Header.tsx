'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Typography';

interface HeaderProps {
  className?: string;
  showNav?: boolean;
  onLoginClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  className = '',
  showNav = false,
  onLoginClick,
}) => {
  return (
    <header className={`sticky top-0 z-40 bg-white shadow-sm ${className}`}>
      <Container size="xl" padding="sm">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-serif font-bold text-primary-gold">💍</span>
            <span className="text-xl font-serif font-bold text-neutral-dark">Wedding</span>
          </div>

          {/* Navigation */}
          {showNav && (
            <nav className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                className="text-sm font-medium text-neutral-dark hover:text-primary-gold transition-colors"
              >
                Características
              </a>
              <a
                href="#how-it-works"
                className="text-sm font-medium text-neutral-dark hover:text-primary-gold transition-colors"
              >
                Cómo Funciona
              </a>
              <a
                href="#contact"
                className="text-sm font-medium text-neutral-dark hover:text-primary-gold transition-colors"
              >
                Contacto
              </a>
            </nav>
          )}

          {/* Auth Button */}
          {onLoginClick && (
            <Button variant="primary" size="sm" onClick={onLoginClick}>
              Administrador
            </Button>
          )}
        </div>
      </Container>
    </header>
  );
};

export { Header };
