import { useTranslation } from '../../lib/i18n-app';
import { Card } from '../ui/Card';
import { Section } from '../ui/Section';
import {
  BodyText,
  CardTitle,
  SectionTitle,
  TextSecondary,
} from '../ui/Typography';

export function Education() {
  const { t } = useTranslation();

  const education = [
    {
      title: t('education.estei.title'),
      period: t('education.estei.period'),
      description: t('education.estei.description'),
      year: 2016, // Année de fin pour le tri
    },
    {
      title: t('education.iut.title'),
      period: t('education.iut.period'),
      description: t('education.iut.description'),
      year: 2014, // Année de fin pour le tri
    },
    {
      title: t('education.cap.title'),
      period: t('education.cap.period'),
      description: t('education.cap.description'),
      year: 2012, // Année de fin pour le tri
    },
  ].sort((a, b) => a.year - b.year); // Tri du plus récent au plus ancien

  return (
    <Section aria-labelledby="education-title">
      <SectionTitle id="education-title">{t('education.title')}</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {education.map((item) => (
          <Card key={item.title} className="space-y-3 p-6">
            <div className="space-y-2">
              <CardTitle>{item.title}</CardTitle>
              <TextSecondary className="font-medium">
                {item.period}
              </TextSecondary>
            </div>
            <BodyText>{item.description}</BodyText>
          </Card>
        ))}
      </div>
    </Section>
  );
}
