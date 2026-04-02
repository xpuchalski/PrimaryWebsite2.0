import { useEffect, useState } from "react";

export const page = {
  path: "/projects",
  title: "projects",
  order: 2
};

const assetModules = import.meta.glob("../assets/**/*", {
  eager: true,
  query: "?url",
  import: "default"
});

const descriptionModules = import.meta.glob("../assets/**/*.{txt,md}", {
  eager: true,
  query: "?raw",
  import: "default"
});

const imageExtensions = new Set([
  "png",
  "jpg",
  "jpeg",
  "gif",
  "webp",
  "svg",
  "avif"
]);

const iframePreviewExtensions = new Set(["txt", "md", "json", "html"]);
const folderDescriptionFileNames = new Set([
  "description",
  "readme",
  "about",
  "info"
]);

function displayNameFromPath(path) {
  return path.split("/").pop() ?? path;
}

function extensionFromPath(path) {
  const file = displayNameFromPath(path);
  const index = file.lastIndexOf(".");
  if (index < 0) {
    return "";
  }
  return file.slice(index + 1).toLowerCase();
}

function nameWithoutExtension(path) {
  const file = displayNameFromPath(path);
  const index = file.lastIndexOf(".");
  if (index < 0) {
    return file.toLowerCase();
  }
  return file.slice(0, index).toLowerCase();
}

function normalizeAssetPath(modulePath) {
  return modulePath.replace("../assets/", "");
}

function categoryFromRelativePath(relativePath) {
  const parts = relativePath.split("/");
  return parts.length === 1 ? "root assets" : parts[0];
}

function slugFromLabel(label) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function isFolderDescriptionFile(relativePath) {
  return folderDescriptionFileNames.has(nameWithoutExtension(relativePath));
}

function buildAssetGroups() {
  const groups = new Map();

  function getOrCreateGroup(categoryName) {
    if (!groups.has(categoryName)) {
      groups.set(categoryName, { categoryName, files: [], description: "" });
    }
    return groups.get(categoryName);
  }

  Object.entries(assetModules).forEach(([modulePath, fileUrl]) => {
    const relativePath = normalizeAssetPath(modulePath);
    if (!relativePath || relativePath.endsWith("/")) {
      return;
    }

    const categoryName = categoryFromRelativePath(relativePath);
    const group = getOrCreateGroup(categoryName);

    if (isFolderDescriptionFile(relativePath)) {
      return;
    }

    group.files.push({
      relativePath,
      fileName: displayNameFromPath(relativePath),
      url: fileUrl,
      extension: extensionFromPath(relativePath)
    });
  });

  Object.entries(descriptionModules).forEach(([modulePath, rawText]) => {
    const relativePath = normalizeAssetPath(modulePath);
    if (!relativePath || relativePath.endsWith("/")) {
      return;
    }

    if (!isFolderDescriptionFile(relativePath)) {
      return;
    }

    const description = typeof rawText === "string" ? rawText.trim() : "";
    if (!description) {
      return;
    }

    const categoryName = categoryFromRelativePath(relativePath);
    const group = getOrCreateGroup(categoryName);

    if (!group.description || nameWithoutExtension(relativePath) === "description") {
      group.description = description;
    }
  });

  return Array.from(groups.values())
    .sort((a, b) => a.categoryName.localeCompare(b.categoryName))
    .map((group) => ({
      ...group,
      files: group.files.sort((a, b) => a.relativePath.localeCompare(b.relativePath))
    }));
}

const groupedAssets = buildAssetGroups();
const allAssets = groupedAssets.flatMap((group) => group.files);
const imageAssets = allAssets.filter((asset) => imageExtensions.has(asset.extension));

function AssetCard({ asset }) {
  const isImage = imageExtensions.has(asset.extension);

  return (
    <button className="asset-card" type="button" onClick={() => asset.onOpen(asset)}>
      {isImage ? (
        <img src={asset.url} alt={asset.fileName} loading="lazy" />
      ) : (
        <div className="asset-placeholder">.{asset.extension || "file"}</div>
      )}
      <div className="asset-info">
        <strong>{asset.fileName}</strong>
        <span>{asset.relativePath}</span>
      </div>
    </button>
  );
}

function Lightbox({ asset, onClose, onPreviousImage, onNextImage, canNavigateImages }) {
  const isImage = imageExtensions.has(asset.extension);
  const isPdf = asset.extension === "pdf";
  const canUseIframePreview = iframePreviewExtensions.has(asset.extension);

  return (
    <div className="lightbox-backdrop" onClick={onClose} role="presentation">
      <div
        className="lightbox-panel"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Preview ${asset.fileName}`}
      >
        <button className="lightbox-close" type="button" onClick={onClose}>
          close
        </button>

        {isImage && canNavigateImages && (
          <div className="lightbox-nav" aria-label="Image navigation">
            <button type="button" onClick={onPreviousImage} aria-label="Previous image">
              {"< prev"}
            </button>
            <button type="button" onClick={onNextImage} aria-label="Next image">
              {"next >"}
            </button>
          </div>
        )}

        <div className="lightbox-content">
          {isImage && <img src={asset.url} alt={asset.fileName} />}
          {!isImage && isPdf && (
            <object data={asset.url} type="application/pdf" aria-label={asset.fileName}>
              <div className="lightbox-fallback">
                <p>PDF preview not supported in this browser.</p>
                <a href={asset.url} target="_blank" rel="noreferrer">
                  Open PDF in new tab
                </a>
              </div>
            </object>
          )}
          {!isImage && canUseIframePreview && (
            <iframe title={asset.fileName} src={asset.url} />
          )}
          {!isImage && !isPdf && !canUseIframePreview && (
            <div className="lightbox-fallback">
              <p>Preview not supported for this file type.</p>
              <a href={asset.url} target="_blank" rel="noreferrer">
                Open file in new tab
              </a>
            </div>
          )}
        </div>

        <div className="lightbox-meta">
          <strong>{asset.fileName}</strong>
          <span>{asset.relativePath}</span>
        </div>
      </div>
    </div>
  );
}

function ProjectsPage() {
  const [activeAsset, setActiveAsset] = useState(null);

  const activeImageIndex =
    activeAsset && imageExtensions.has(activeAsset.extension)
      ? imageAssets.findIndex((asset) => asset.relativePath === activeAsset.relativePath)
      : -1;

  function openPreviousImage() {
    if (activeImageIndex < 0 || imageAssets.length <= 1) {
      return;
    }

    const previousIndex =
      (activeImageIndex - 1 + imageAssets.length) % imageAssets.length;
    setActiveAsset(imageAssets[previousIndex]);
  }

  function openNextImage() {
    if (activeImageIndex < 0 || imageAssets.length <= 1) {
      return;
    }

    const nextIndex = (activeImageIndex + 1) % imageAssets.length;
    setActiveAsset(imageAssets[nextIndex]);
  }

  useEffect(() => {
    if (!activeAsset) {
      return;
    }

    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActiveAsset(null);
      }
      if (event.key === "ArrowLeft") {
        openPreviousImage();
      }
      if (event.key === "ArrowRight") {
        openNextImage();
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeAsset, activeImageIndex]);

  return (
    <section className="projects-layout">
      <aside className="projects-sidebar" aria-label="Project categories">
        <h2>Sections</h2>
        <nav>
          <ul>
            {groupedAssets.map((group) => (
              <li key={group.categoryName}>
                <a href={`#project-${slugFromLabel(group.categoryName)}`}>
                  {group.categoryName}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div className="panel prose projects-content">
        <h1>Projects</h1>

        {groupedAssets.map((group) => (
          <section
            key={group.categoryName}
            id={`project-${slugFromLabel(group.categoryName)}`}
            className="asset-category"
          >
            <h2>{group.categoryName}</h2>
            {group.description && (
              <p className="asset-category-description">{group.description}</p>
            )}
            <div className="asset-grid">
              {group.files.map((asset) => (
                <AssetCard
                  key={asset.relativePath}
                  asset={{ ...asset, onOpen: setActiveAsset }}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {activeAsset && (
        <Lightbox
          asset={activeAsset}
          onClose={() => setActiveAsset(null)}
          onPreviousImage={openPreviousImage}
          onNextImage={openNextImage}
          canNavigateImages={imageAssets.length > 1}
        />
      )}
    </section>
  );
}

export default ProjectsPage;
