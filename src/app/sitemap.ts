import type { MetadataRoute } from "next";
import { properties } from "@/data/properties";
import { projects } from "@/data/projects";
import { blogPosts } from "@/data/blog";
import { cities } from "@/data/cities";
import { agents } from "@/data/agents";

const baseUrl = "https://horizonestates.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "",
    "/properties",
    "/projects",
    "/cities",
    "/agents",
    "/services",
    "/pricing",
    "/list-property",
    "/calculators",
    "/home-valuation",
    "/blog",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const cityRoutes = cities.map((city) => ({
    url: `${baseUrl}/cities/${city.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const localityRoutes = cities.flatMap((city) =>
    city.localities.map((locality) => ({
      url: `${baseUrl}/cities/${city.slug}/${locality.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  );

  const propertyRoutes = properties.map((property) => ({
    url: `${baseUrl}/properties/${property.slug}`,
    lastModified: new Date(property.postedAt),
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const agentRoutes = agents.map((agent) => ({
    url: `${baseUrl}/agents/${agent.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [
    ...staticRoutes,
    ...cityRoutes,
    ...localityRoutes,
    ...propertyRoutes,
    ...projectRoutes,
    ...blogRoutes,
    ...agentRoutes,
  ];
}
