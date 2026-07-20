'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';
import { Card, CardContent } from '@/components/ui/Card';
import { Heading, Text } from '@/components/ui/Typography';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeatureSectionProps {
  title?: string;
  subtitle?: string;
  features: Feature[];
  className?: string;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({
  title = 'Características',
  subtitle,
  features,
  className = '',
}) => {
  return (
    <section className={`py-20 md:py-32 bg-white ${className}`}>
      <Container size="xl">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          {subtitle && (
            <p className="text-primary-gold font-medium text-sm tracking-widest uppercase">
              {subtitle}
            </p>
          )}
          <Heading level={2} className="text-4xl md:text-5xl">
            {title}
          </Heading>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <Card
              key={idx}
              variant="flat"
              padding="lg"
              className="h-full hover:shadow-lg transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <CardContent className="space-y-4">
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-primary-gold bg-opacity-10 flex items-center justify-center text-2xl">
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-serif font-bold text-neutral-dark">
                  {feature.title}
                </h3>

                {/* Description */}
                <Text variant="small" className="text-neutral-dark text-opacity-70">
                  {feature.description}
                </Text>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

export { FeatureSection };
