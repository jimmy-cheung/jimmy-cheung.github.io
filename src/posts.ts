export type BlogPost = {
  slug: string
  title: string
  date: string
  summary: string
  tags: string[]
  content: string[]
}

export const posts: BlogPost[] = []
