import {getAllPosts} from '@/lib/blog';
import {PostList} from '@/components/blog/PostList';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import {buildAlternates} from '@/lib/metadata';
import type {Metadata} from 'next';

export function generateStaticParams() {
  return [{lang: 'en'}, {lang: 'vi'}];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{lang: string}>;
}): Promise<Metadata> {
  const {lang} = await params;
  const t = await getTranslations({locale: lang, namespace: 'Blog'});
  return {
    title: 'Blog',
    description: t('description'),
    alternates: buildAlternates('blog'),
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{lang: string}>;
}) {
  const {lang} = await params;
  setRequestLocale(lang);
  const posts = getAllPosts(lang);
  const allTags = [...new Set(posts.flatMap((p) => p.tags))].sort();

  return (
    <div className="min-h-dvh">
      <PostList posts={posts} allTags={allTags} locale={lang} />
    </div>
  );
}
