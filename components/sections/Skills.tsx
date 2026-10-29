import { useTranslation } from '../../lib/i18n-app';
import { Section } from '../ui/Section';
import { SectionTitle, CardTitle } from '../ui/Typography';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Layers, Server, Bot, Users, ListCheck } from 'lucide-react';

const SKILL_CARDS = [
  { key: 'frontend', icon: Layers },
  { key: 'backend', icon: Server },
  { key: 'ai', icon: Bot },
  { key: 'leadership', icon: Users },
] as const;

const BULLET_LIST_CLASSES = 'list-disc space-y-2 pl-5 marker:text-accent';

export function Skills() {
  const { t, tArray } = useTranslation();

  const skills = SKILL_CARDS.map(({ key, icon }) => ({
    title: t(`skills.${key}.title`),
    items: tArray(`skills.${key}.items`),
    icon,
  }));

  return (
    <Section aria-labelledby="skills-title">
      <SectionTitle id="skills-title">{t('skills.title')}</SectionTitle>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skills.map((skill) => {
          const IconComponent = skill.icon;
          return (
            <Card key={skill.title} className="space-y-4">
              <div className="flex items-center gap-2">
                <IconComponent className="w-5 h-5 text-accent" aria-hidden="true" />
                <CardTitle>{skill.title}</CardTitle>
              </div>
              <ul className={BULLET_LIST_CLASSES}>
                {skill.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm md:text-base leading-relaxed"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>
      <div className="flex justify-end">
        <Button
          href="https://roadmap.sh/u/thomasalberola"
          target="_blank"
          rel="noopener noreferrer"
          variant="accent"
          size="sm"
          className="gap-2"
        >
          <ListCheck className="w-4 h-4" aria-hidden="true" />
          {t('skills.roadmap.cta')}
        </Button>
      </div>
    </Section>
  );
}
