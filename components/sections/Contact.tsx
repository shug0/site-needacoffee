import { useTranslation } from '../../lib/i18n-app';
import { Section } from '../ui/Section';
import { SectionTitle } from '../ui/Typography';
import { Button } from '../ui/Button';
import { EmailReveal } from '../ui/EmailReveal';
import { Mail, Linkedin, Github } from 'lucide-react';

export function Contact() {
  const { t } = useTranslation();

  const links = [
    {
      label: t('contact.linkedin'),
      href: 'https://linkedin.com/in/thomasalberola',
      icon: <Linkedin className="w-5 h-5" aria-hidden="true" />,
    },
    {
      label: t('contact.github'),
      href: 'https://github.com/shug0',
      icon: <Github className="w-5 h-5" aria-hidden="true" />,
    },
  ];

  return (
    <Section aria-labelledby="contact-title">
      <SectionTitle id="contact-title">{t('contact.title')}</SectionTitle>
      <p className="text-xl md:text-2xl text-foreground-secondary">
        {t('contact.subtitle')}
      </p>
      <div className="flex flex-wrap gap-4">
        <EmailReveal
          label={t('contact.revealEmail')}
          icon={<Mail className="w-5 h-5" aria-hidden="true" />}
          variant="accent"
          size="lg"
        />
        {links.map((link) => (
          <Button
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            size="lg"
            className="gap-2"
          >
            {link.icon}
            {link.label}
          </Button>
        ))}
      </div>
    </Section>
  );
}
