/**
 * Async content seam — swap internals for fetch() / CMS later.
 */
export async function loadProjects() {
  const { PROJECTS } = await import("../data/projects.js");
  return PROJECTS;
}

export async function loadTechStack() {
  const { TECH_STACK } = await import("../data/tech.js");
  return TECH_STACK;
}
