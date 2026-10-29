import { ArrowRight } from 'lucide-react';
import { useTranslation } from '../../lib/i18n-app';
import { Section } from '../ui/Section';
import { SectionTitle, Text } from '../ui/Typography';

export function Presentation() {
  const { t } = useTranslation();

  return (
    <Section aria-labelledby="presentation-title">
      <SectionTitle id="presentation-title">
        {t('presentation.title')}
      </SectionTitle>
      <div className="space-y-6">
        <Text>{t('presentation.description')}</Text>
        <Text>
          {t('presentation.ai')}{' '}
          <a
            href={t('presentation.aiUrl')}
            className="inline-flex items-center gap-1 font-medium text-accent underline underline-offset-4 hover:no-underline"
          >
            {t('presentation.aiLink')}
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </a>
        </Text>
      </div>
    </Section>
  );
}
