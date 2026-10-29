import { useTranslation } from '../../lib/i18n-app';
import type { CvProject } from '../../lib/projects';
import { Section } from '../ui/Section';
import { SectionTitle, CardTitle, BodyText } from '../ui/Typography';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { TagList } from '../ui/TagList';
import { ExternalLink, Star } from 'lucide-react';

interface ProjectsProps {
  projects: CvProject[];
  otherProjectCount: number;
}

export function Projects({ projects, otherProjectCount }: ProjectsProps) {
  const { t, locale } = useTranslation();

  return (
    <Section aria-labelledby="projects-title">
      <SectionTitle id="projects-title">{t('projects.title')}</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="flex flex-col gap-4 p-6"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {project.isFavorite && (
                  <Star
                    className="w-5 h-5 shrink-0 fill-current text-accent"
                    role="img"
                    aria-label={t('projects.favorite')}
                  />
                )}
                <CardTitle>{project.name}</CardTitle>
              </div>
              <BodyText>{project.description[locale]}</BodyText>
              {project.highlight && (
                <p className="text-sm font-semibold text-accent">
                  {project.highlight[locale]}
                </p>
              )}
            </div>
            <TagList
              tags={project.tags.map((tag) => ({
                label: tag.label[locale],
                url: tag.url,
              }))}
            />
            <Button
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="sm"
              className="mt-auto w-fit gap-2"
            >
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              {new URL(project.url).hostname.replace(/^www\./, '')}
            </Button>
          </Card>
        ))}
      </div>
      {otherProjectCount > 0 && (
        <p className="text-foreground-secondary">
          {t('projects.more').replace('{count}', String(otherProjectCount))}{' '}
          <a
            href="https://needacoffee.fr/"
            className="font-medium text-accent underline underline-offset-4 hover:no-underline"
          >
            needacoffee.fr
          </a>
        </p>
      )}
    </Section>
  );
}
