'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Heading, Text } from '@/components/ui/Typography';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  className = '',
}) => {
  return (
    <section
      className={`relative py-20 md:py-32 bg-gradient-to-br from-primary-cream via-white to-primary-light overflow-hidden ${className}`}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-gold opacity-5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-warm-beige opacity-5 rounded-full blur-3xl" />
      </div>

      <Container size="lg" className="relative z-10">
        <div className="text-center space-y-8 animate-fade-in">
          {/* Subtitle */}
          {subtitle && (
            <p className="text-primary-gold font-medium text-sm tracking-widest uppercase">
              {subtitle}
            </p>
          )}

          {/* Title */}
          <Heading level={1} className="text-5xl md:text-6xl lg:text-7xl">
            {title}
          </Heading>

          {/* Description */}
          {description && (
            <Text variant="lead" className="max-w-2xl mx-auto text-lg md:text-xl">
              {description}
            </Text>
          )}

          {/* CTA Buttons */}
          {(primaryAction || secondaryAction) && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 animate-slide-up">
              {primaryAction && (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={primaryAction.onClick}
                  className="shadow-lg"
                >
                  {primaryAction.label}
                </Button>
              )}
              {secondaryAction && (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={secondaryAction.onClick}
                >
                  {secondaryAction.label}
                </Button>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export { HeroSection };
