import { Navigate } from 'react-router-dom'
import SeoPageTemplate from '../components/seo/SeoPageTemplate'
import RelatedServicesNav from '../layout/RelatedServicesNav'
import { getBlogPost, getRelatedPosts } from '../seo/blogPosts'

export default function BlogPostPage({ slug }) {
  const post = getBlogPost(slug)
  if (!post) return <Navigate to="/blog" replace />

  const related = getRelatedPosts(slug, 3).map((r) => ({
    path: `/blog/${r.slug}`,
    label: r.h1,
  }))

  return (
    <SeoPageTemplate
      path={`/blog/${post.slug}`}
      title={post.title}
      description={post.description}
      eyebrow={`ॐ · ${post.category} · ${post.readTime}`}
      h1={post.h1}
      intro={post.excerpt}
      sections={post.sections}
      faqs={[]}
      keywords={post.keywords}
      breadcrumbs={[{ label: 'Blog', href: '/blog' }, { label: post.category }]}
      relatedLinks={[]}
      schemaType="blog"
      schemaData={post}
      waMessage={`I read your article on ${post.category} and need consultation.`}
      showWhyChooseUs={false}
      compactHero
    >
      {related.length > 0 && (
        <RelatedServicesNav links={related} title="Continue Reading" />
      )}
    </SeoPageTemplate>
  )
}
