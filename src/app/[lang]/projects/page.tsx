import {projects} from '@/data/projects';
import {ProjectGrid} from '@/components/projects/ProjectGrid';
import {setRequestLocale} from 'next-intl/server';

export function generateStaticParams() {
  return [{lang: 'en'}, {lang: 'vi'}];
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{lang: string}>;
}) {
  const {lang} = await params;
  setRequestLocale(lang);

  return (
    <div className="min-h-dvh">
      <ProjectGrid projects={projects} locale={lang} />
    </div>
  );
}
