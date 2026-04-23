document.addEventListener("DOMContentLoaded", async () => {
  await renderMermaidDiagrams();
  setupDiagramViewer();
  setupSectionNavigation();
});

async function renderMermaidDiagrams() {
  if (!window.mermaid) {
    return;
  }

  window.mermaid.initialize({
    startOnLoad: false,
    securityLevel: "loose",
    theme: "base",
    flowchart: {
      curve: "basis",
      useMaxWidth: false,
    },
    sequence: {
      useMaxWidth: false,
      showSequenceNumbers: true,
    },
    themeVariables: {
      background: "#fcfdff",
      primaryColor: "#eef4ff",
      primaryBorderColor: "#b8ccff",
      primaryTextColor: "#121826",
      secondaryColor: "#eefaf9",
      secondaryBorderColor: "#a9d6d2",
      tertiaryColor: "#fff6e8",
      tertiaryBorderColor: "#f0ca96",
      lineColor: "#65748f",
      clusterBkg: "#f7faff",
      clusterBorder: "#d7e2f2",
      edgeLabelBackground: "#ffffff",
      fontFamily: '"SF Pro Text", "Avenir Next", "Segoe UI Variable", sans-serif',
    },
  });

  await window.mermaid.run({ querySelector: ".mermaid" });
}

function setupSectionNavigation() {
  const navigationLinks = Array.from(document.querySelectorAll(".sidebar nav a"));
  const sectionEntries = navigationLinks
    .map((link) => {
      const id = link.getAttribute("href");
      const section = id ? document.querySelector(id) : null;
      return section ? { link, section } : null;
    })
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleSection = entries
        .filter((entry) => entry.isIntersecting)
        .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

      if (!visibleSection) {
        return;
      }

      for (const entry of sectionEntries) {
        const isActive = entry.section === visibleSection.target;
        entry.link.classList.toggle("is-active", isActive);
      }
    },
    {
      rootMargin: "-20% 0px -55% 0px",
      threshold: [0.2, 0.35, 0.5],
    }
  );

  for (const entry of sectionEntries) {
    observer.observe(entry.section);
  }
}

function setupDiagramViewer() {
  const modal = document.querySelector(".diagram-modal");
  const modalTitle = document.querySelector(".diagram-modal-title");
  const viewport = document.querySelector(".diagram-modal-viewport");

  if (!modal || !modalTitle || !viewport) {
    return;
  }

  const zoomOutButton = modal.querySelector('[data-diagram-action="zoom-out"]');
  const zoomInButton = modal.querySelector('[data-diagram-action="zoom-in"]');
  const resetButton = modal.querySelector('[data-diagram-action="reset"]');
  let panZoomInstance = null;

  const destroyViewer = () => {
    if (panZoomInstance) {
      panZoomInstance.destroy();
      panZoomInstance = null;
    }
    viewport.replaceChildren();
  };

  const closeViewer = () => {
    destroyViewer();
    modal.hidden = true;
    document.body.classList.remove("diagram-modal-open");
  };

  const openViewer = (card, title) => {
    const sourceSvg = card.querySelector("svg");
    if (!sourceSvg) {
      return;
    }

    destroyViewer();

    const clonedSvg = sourceSvg.cloneNode(true);
    clonedSvg.removeAttribute("style");
    clonedSvg.setAttribute("width", "100%");
    clonedSvg.setAttribute("height", "100%");
    clonedSvg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    viewport.append(clonedSvg);

    modalTitle.textContent = title;
    modal.hidden = false;
    document.body.classList.add("diagram-modal-open");

    if (window.svgPanZoom) {
      panZoomInstance = window.svgPanZoom(clonedSvg, {
        zoomEnabled: true,
        controlIconsEnabled: false,
        fit: true,
        center: true,
        contain: false,
        minZoom: 0.5,
        maxZoom: 12,
        zoomScaleSensitivity: 0.25,
        mouseWheelZoomEnabled: true,
        dblClickZoomEnabled: true,
        panEnabled: true,
      });
      panZoomInstance.resize();
      panZoomInstance.fit();
      panZoomInstance.center();
    }
  };

  const cards = Array.from(document.querySelectorAll(".diagram-card"));

  for (const [index, card] of cards.entries()) {
    const sectionTitle = card.closest("section")?.querySelector(".section-heading h3")?.textContent?.trim();
    const title = sectionTitle || `Diagram ${index + 1}`;
    const toolbar = document.createElement("div");
    toolbar.className = "diagram-toolbar";

    const titleElement = document.createElement("span");
    titleElement.className = "diagram-title";
    titleElement.textContent = title;

    const actions = document.createElement("div");
    actions.className = "diagram-actions";

    const hint = document.createElement("span");
    hint.className = "diagram-hint";
    hint.textContent = "Open full view for zoom and pan";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "diagram-open-button";
    button.textContent = "Full View + Zoom";
    button.addEventListener("click", () => openViewer(card, title));

    actions.append(hint, button);
    toolbar.append(titleElement, actions);
    card.prepend(toolbar);

    const svg = card.querySelector("svg");
    if (svg) {
      svg.addEventListener("click", () => openViewer(card, title));
      svg.setAttribute("role", "button");
      svg.setAttribute("tabindex", "0");
      svg.setAttribute("aria-label", `Open ${title} in full view`);
      svg.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openViewer(card, title);
        }
      });
    }
  }

  zoomOutButton?.addEventListener("click", () => panZoomInstance?.zoomOut());
  zoomInButton?.addEventListener("click", () => panZoomInstance?.zoomIn());
  resetButton?.addEventListener("click", () => {
    panZoomInstance?.resetZoom();
    panZoomInstance?.center();
    panZoomInstance?.fit();
  });

  modal.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.dataset.closeDiagram === "true") {
      closeViewer();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) {
      closeViewer();
    }
  });

  window.addEventListener("resize", () => {
    panZoomInstance?.resize();
    panZoomInstance?.fit();
    panZoomInstance?.center();
  });
}