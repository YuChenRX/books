export interface Article {
  id: string
  title: string
  author: string
  date: string
  views: string
  likes: number
  comments: number
  tags: string[]
  avatar: string
  excerpt: string
  content: string
  /** 预计算的埋点位置：content 按行分割后的行号索引（只指向 <p> 段落） */
  buryPoints: number[]
}
