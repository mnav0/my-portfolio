export function orderProjects(projects = []) {
  const byTag = {};
  projects.forEach((project) => {
    const tag = project.tags && project.tags[0];
    if (!tag) return;
    if (!byTag[tag]) byTag[tag] = [];
    byTag[tag].push(project);
  });
  Object.keys(byTag).forEach((tag) => {
    byTag[tag].sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
  });
  const tags = Object.keys(byTag).sort((a, b) => {
    if (a.toLowerCase() === "featured") return -1;
    if (b.toLowerCase() === "featured") return 1;
    return a.localeCompare(b);
  });
  const flat = [];
  tags.forEach((tag) => {
    byTag[tag].forEach((project) => flat.push(project));
  });
  return { byTag, tags, flat };
}

export function getNextProject(projects, currentUid) {
  const { flat } = orderProjects(projects);
  if (!flat.length) return null;
  const index = flat.findIndex((project) => project.uid === currentUid);
  if (index < 0) return null;
  const next = flat[(index + 1) % flat.length];
  return {
    uid: next.uid,
    title: next.data.title1?.[0]?.text || next.uid,
  };
}
