import { CvPage } from '../../components/CvPage';
import { HtmlLang } from '../../components/HtmlLang';
import { getCvProjects } from '../../lib/projects';

export default async function Home() {
  const { projects, otherProjectCount } = await getCvProjects();
  return (
    <>
      <HtmlLang lang="en" />
      <CvPage projects={projects} otherProjectCount={otherProjectCount} />
    </>
  );
}
