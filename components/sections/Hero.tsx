import { useTranslation } from '../../lib/i18n-app';
import { Section } from '../ui/Section';
import { Title, Text } from '../ui/Typography';
import { Button } from '../ui/Button';
import { EmailReveal } from '../ui/EmailReveal';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';

const PROFILE_SRC = '/profile.webp';

const CHIP_CLASSES =
  'inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent';

export function Hero() {
  const { t } = useTranslation();

  return (
    <Section aria-labelledby="hero-title" className="relative">
      <div className="relative grid items-center gap-10 md:grid-cols-[1.4fr_1fr]">
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-4">
            <Image
              src={PROFILE_SRC}
              alt=""
              width={64}
              height={64}
              className="photo-glow h-16 w-16 shrink-0 rounded-full border border-foreground/10 object-cover md:hidden"
              priority
            />
            <p className="gradient-text text-2xl md:text-3xl font-semibold font-display">
              {t('hero.name')}
            </p>
          </div>
          <Title id="hero-title">{t('hero.title')}</Title>
          <Text>{t('hero.subtitle')}</Text>

          <ul className="flex flex-wrap gap-2">
            <li className={CHIP_CLASSES}>
              <MapPin className="w-4 h-4" aria-hidden="true" />
              {t('hero.location')}
            </li>
            <li className={CHIP_CLASSES}>{t('hero.experience')}</li>
            <li className={CHIP_CLASSES}>{t('hero.currentRole')}</li>
          </ul>

          <div className="flex flex-wrap gap-3">
            <EmailReveal
              label={t('hero.contactCta')}
              icon={<Mail className="w-4 h-4" aria-hidden="true" />}
            />
            <Button
              href="https://linkedin.com/in/thomasalberola"
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              className="gap-2"
            >
              <Linkedin className="w-4 h-4" aria-hidden="true" />
              LinkedIn
            </Button>
            <Button
              href="https://github.com/shug0"
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              className="gap-2"
            >
              <Github className="w-4 h-4" aria-hidden="true" />
              GitHub
            </Button>
          </div>
        </div>

        <div className="photo-glow relative z-10 mx-auto hidden h-64 w-64 overflow-hidden rounded-full border border-foreground/10 md:block">
          <Image
            src={PROFILE_SRC}
            alt="Thomas Alberola"
            width={256}
            height={256}
            className="w-full h-full object-cover"
            priority
          />
        </div>
      </div>
    </Section>
  );
}
