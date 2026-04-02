// Any page component exporting `page` metadata is auto-registered for routes/nav.
const pageModules = import.meta.glob("./*Page.jsx", { eager: true });

export const pages = Object.values(pageModules)
  .map((module) => {
    const metadata = module.page;
    if (!metadata || !metadata.path || !metadata.title || !module.default) {
      return null;
    }

    return {
      ...metadata,
      Component: module.default
    };
  })
  .filter(Boolean)
  .sort((a, b) => {
    const aOrder = Number.isFinite(a.order) ? a.order : Number.MAX_SAFE_INTEGER;
    const bOrder = Number.isFinite(b.order) ? b.order : Number.MAX_SAFE_INTEGER;

    if (aOrder !== bOrder) {
      return aOrder - bOrder;
    }

    return a.title.localeCompare(b.title);
  });
