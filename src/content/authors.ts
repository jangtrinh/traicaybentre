/**
 * Author registry for E-E-A-T signals.
 * Consumed by structured-data helpers to emit Person schema on articles.
 * Frontmatter: authorKey: 'a-phuc' | 'jang-trinh' | 'htx-thanh-phong'
 */

export interface Author {
  slug: string;
  name: string;
  jobTitle: string;
  bio: string;
  url: string;
  sameAs: string[];
  image?: string;
}

export const AUTHORS = {
  "a-phuc": {
    slug: "a-phuc",
    name: "A Phúc",
    jobTitle: "Chủ vựa & điều phối HTX Thạnh Phong",
    bio: "15 năm kinh nghiệm vườn xoài Thạnh Phú, thành viên sáng lập HTX Dịch vụ Sản xuất Nông nghiệp Thạnh Phong, giữ giống Tứ Quý cổ.",
    url: "https://www.traicaybentre.com/nguon-goc",
    image: "/images/author-a-phuc.jpg",
    sameAs: ["https://www.facebook.com/traicaybentre"],
  },
  "jang-trinh": {
    slug: "jang-trinh",
    name: "Jang Trinh",
    jobTitle: "Editor & Content Lead",
    bio: "Phụ trách nội dung kiến thức nông sản, nghiên cứu giống xoài & dừa Bến Tre.",
    url: "https://www.traicaybentre.com",
    sameAs: [] as string[],
  },
  "htx-thanh-phong": {
    slug: "htx-thanh-phong",
    name: "Đội ngũ HTX Thạnh Phong",
    jobTitle: "Tổ chức",
    bio: "HTX Dịch vụ Sản xuất Nông nghiệp Thạnh Phong — đơn vị giữ giống + phân phối Xoài Tứ Quý Bến Tre CDĐL #00124.",
    url: "https://www.traicaybentre.com/nguon-goc",
    sameAs: ["https://www.facebook.com/traicaybentre"],
  },
} as const satisfies Record<string, Author>;

export type AuthorKey = keyof typeof AUTHORS;

export function getAuthorByKey(key: string | undefined | null): Author | null {
  if (!key) return null;
  return (AUTHORS as Record<string, Author>)[key] ?? null;
}

export function getDefaultAuthor(): Author {
  return AUTHORS["htx-thanh-phong"];
}
