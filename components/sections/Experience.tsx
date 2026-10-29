import { useTranslation } from '../../lib/i18n-app';
import { Section } from '../ui/Section';
import { SectionTitle, CardTitle, TextSecondary } from '../ui/Typography';
import { Card } from '../ui/Card';
import { TagList } from '../ui/TagList';

const EXPERIENCE_KEYS = [
  'sedomicilier',
  'orguin',
  'pause',
  'tudigo',
  'jellysmack',
  'yousign',
  'ekino',
] as const;

type ExperienceKey = (typeof EXPERIENCE_KEYS)[number];

const CURRENT_EXPERIENCE: ExperienceKey = 'sedomicilier';

// Same in every language, so kept out of the locale files
const EXPERIENCE_TAGS = {
  sedomicilier: ['Next.js', 'Payload CMS', 'Figma'],
  orguin: ['React', 'Supabase'],
  pause: [],
  tudigo: ['React', 'Zustand', 'React Hook Form', 'Zod', 'Shadcn UI', 'Storybook'],
  jellysmack: ['React', 'Vue.js', 'React Query', 'Apollo GraphQL', 'Tailwind', 'Turborepo'],
  yousign: ['React', 'Jest', 'Testing Library', 'Cypress'],
  ekino: ['AngularJS', 'Angular', 'React', 'Ionic', 'React Native', 'Electron'],
} as const satisfies Record<ExperienceKey, readonly string[]>;

const CURRENT_DOT_CLASSES =
  'gradient-fill ring-4 ring-accent-soft';
const PAST_DOT_CLASSES = 'border-2 border-accent bg-background';
const BULLET_LIST_CLASSES = 'list-disc space-y-2 pl-5 marker:text-accent';

export function Experience() {
  const { t, tArray } = useTranslation();

  const experiences = EXPERIENCE_KEYS.map((key) => ({
    title: t(`experience.${key}.title`),
    period: t(`experience.${key}.period`),
    items: tArray(`experience.${key}.items`),
    tags: EXPERIENCE_TAGS[key],
    isCurrent: key === CURRENT_EXPERIENCE,
  }));

  return (
    <Section aria-labelledby="experience-title">
      <SectionTitle id="experience-title">{t('experience.title')}</SectionTitle>
      <ol className="timeline relative space-y-8 pl-8">
        {experiences.map((experience) => (
          <li key={experience.title} className="relative">
            <span
              aria-hidden="true"
              className={`absolute -left-8 top-7 h-4 w-4 rounded-full ${experience.isCurrent ? CURRENT_DOT_CLASSES : PAST_DOT_CLASSES}`}
            />
            <Card
              className={`space-y-4 ${experience.isCurrent ? 'gradient-border' : ''}`}
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <CardTitle>{experience.title}</CardTitle>
                  {experience.isCurrent && (
                    <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
                      {t('experience.current')}
                    </span>
                  )}
                </div>
                {experience.isCurrent ? (
                  <p className="text-sm md:text-base font-medium leading-relaxed text-accent">
                    {experience.period}
                  </p>
                ) : (
                  <TextSecondary className="font-medium">
                    {experience.period}
                  </TextSecondary>
                )}
              </div>
              <ul className={BULLET_LIST_CLASSES}>
                {experience.items.map((item: string) => (
                  <li key={item} className="text-sm md:text-base leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
              <TagList tags={experience.tags.map((label) => ({ label }))} />
            </Card>
          </li>
        ))}
      </ol>
    </Section>
  );
}
