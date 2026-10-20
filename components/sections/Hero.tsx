import { useTranslation } from '../../lib/i18n-app';
import { Section } from '../ui/Section';
import { Title, Text } from '../ui/Typography';
import Image from 'next/image';

export function Hero() {
  const { t } = useTranslation();

  return (
    <Section aria-labelledby="hero-title">
      <div className="flex flex-col items-center text-center space-y-8">
        {/* Profile Picture */}
        <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border border-foreground/10 object-cover">
          <Image
            src="/profile.webp"
            alt="Thomas Alberola"
            width={224}
            height={224}
            className="w-full h-full object-cover"
            priority
            sizes="(max-width: 768px) 192px, 224px"
          />
        </div>

        {/* Title and Subtitle */}
        <div className="space-y-6">
          <Title id="hero-title">{t('hero.title')}</Title>
          <Text className="mx-auto">{t('hero.subtitle')}</Text>
        </div>
      </div>
    </Section>
  );
}
