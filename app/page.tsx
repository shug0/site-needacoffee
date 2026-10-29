import { CvPage } from '../components/CvPage';
import { getCvProjects } from '../lib/projects';

export default async function Home() {
  const { projects, otherProjectCount } = await getCvProjects();
  return <CvPage projects={projects} otherProjectCount={otherProjectCount} />;
}
