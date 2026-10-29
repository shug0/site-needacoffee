// The project list lives in monorepo-tomo-farm/apps/home/projects.json, served by needacoffee.fr.
// Read once per `next build` (static export): a change to the list shows here after the next CV deploy.
// PROJECTS_URL overrides the source, e.g. a local server while working on both sites.
const PROJECTS_URL =
  process.env.PROJECTS_URL ?? 'https://needacoffee.fr/projects.json';

type Localized = { fr: string; en: string };

export type ProjectTag = {
  id: string;
  label: Localized;
  url: string;
};

export type CvProject = {
  id: string;
  name: string;
  url: string;
  description: Localized;
  highlight: Localized | null;
  tags: ProjectTag[];
  isFavorite: boolean;
};

type SourceProject = {
  id: string;
  name: string;
  url: string;
  category: string;
  description: { fr: string; en?: string };
  // Replaces description on the CV when the needacoffee.fr wording does not stand alone
  cvDescription?: Localized;
  // A key figure shown on the CV only, under the description
  highlight?: Localized;
  // Ids of the top-level "tags" dictionary
  tags?: string[];
  cv?: boolean;
  // Rank among favorites: 1 comes first. Favorites are listed before the other CV projects.
  favorite?: number;
};

type SourceCategory = {
  id: string;
  // false for categories of links that are not projects (CV, GitHub, Ko-fi…)
  isProjectList?: boolean;
};

type SourceData = {
  tags: Record<string, { label: Localized; url: string }>;
  categories: SourceCategory[];
  projects: SourceProject[];
};

export type CvProjects = {
  projects: CvProject[];
  // Projects listed on needacoffee.fr but not on the CV
  otherProjectCount: number;
};

const byFavoriteRank = (a: SourceProject, b: SourceProject) =>
  (a.favorite ?? Number.POSITIVE_INFINITY) -
  (b.favorite ?? Number.POSITIVE_INFINITY);

function isSourceData(data: unknown): data is SourceData {
  if (!data || typeof data !== 'object') return false;
  const { tags, categories, projects } = data as Partial<SourceData>;
  return (
    Array.isArray(projects) &&
    Array.isArray(categories) &&
    !!tags &&
    typeof tags === 'object'
  );
}

export async function getCvProjects(): Promise<CvProjects> {
  const response = await fetch(PROJECTS_URL).catch((error: unknown) => {
    throw new Error(`Projects: could not reach ${PROJECTS_URL}`, {
      cause: error,
    });
  });
  if (!response.ok) {
    throw new Error(`Projects: ${PROJECTS_URL} answered ${response.status}`);
  }

  const data: unknown = await response.json();
  if (!isSourceData(data)) {
    throw new Error(
      `Projects: ${PROJECTS_URL} needs a "tags" object, a "categories" array and a "projects" array`
    );
  }

  const projectCategoryIds = new Set(
    data.categories
      .filter((category) => category.isProjectList !== false)
      .map((category) => category.id)
  );
  const otherProjectCount = data.projects.filter(
    (project) => !project.cv && projectCategoryIds.has(project.category)
  ).length;

  const projects = data.projects
    .filter((project) => project.cv)
    .sort(byFavoriteRank)
    .map((project) => {
      const description = project.cvDescription ?? project.description;
      const { en } = description;
      if (!en) {
        throw new Error(
          `Projects: "${project.id}" is shown on the CV but has no English description`
        );
      }
      const tags = (project.tags ?? []).map((tagId) => {
        const tag = data.tags[tagId];
        if (!tag) {
          throw new Error(
            `Projects: "${project.id}" uses unknown tag "${tagId}"`
          );
        }
        return { id: tagId, ...tag };
      });
      return {
        id: project.id,
        name: project.name,
        url: project.url,
        description: { fr: description.fr, en },
        highlight: project.highlight ?? null,
        tags,
        isFavorite: project.favorite !== undefined,
      };
    });

  return { projects, otherProjectCount };
}
