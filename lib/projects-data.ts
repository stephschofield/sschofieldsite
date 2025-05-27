export interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  link: string
  category: string
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Contoso Data Products",
    description:
      "A comprehensive data products platform showcasing enterprise-level data solutions, analytics dashboards, and business intelligence tools with modern UI/UX design.",
    image: "/contoso-data-products-screenshot.png",
    tags: ["React", "Data Analytics", "Enterprise", "UI/UX"],
    link: "https://contoso-data-products.com/",
    category: "web",
  },
  {
    id: "2",
    title: "FitMix - Spotify Fitness App",
    description:
      "An innovative fitness application that integrates with Spotify to create personalized workout playlists, track fitness goals, and provide an engaging exercise experience.",
    image: "/fitmix-app-screenshot.png",
    tags: ["React", "Spotify API", "Fitness", "Music Integration"],
    link: "https://v0-spotify-fitness-app.vercel.app/",
    category: "web",
  },
  {
    id: "3",
    title: "Emily & Matthew's Wedding Site",
    description:
      "A beautiful, personalized wedding website featuring event details, RSVP functionality, photo galleries, and guest information with elegant design and smooth user experience.",
    image: "/emily-matthew-wedding-screenshot.png",
    tags: ["Next.js", "Wedding", "RSVP", "Photography"],
    link: "https://www.emandmatthew.com/",
    category: "web",
  },
]
