(function () {
  const PAGE_SIZE = 9;

  const state = {
    clientsPageIndex: 0,
    selectedId: null,
    projectIndex: 0,
  };

  // ---------- helpers ----------

  function withImageFallback(img, fallbackHtml) {
    const swap = () => {
      const span = document.createElement('span');
      span.className = 'fallback';
      span.innerHTML = fallbackHtml;
      img.replaceWith(span);
    };
    if (img.complete && img.naturalWidth === 0) {
      swap();
      return;
    }
    img.addEventListener('error', swap, { once: true });
  }

  // ---------- clients grid ----------

  function pageCount() {
    return Math.max(1, Math.ceil(CLIENTS.length / PAGE_SIZE));
  }

  function normalizedPageIndex() {
    const count = pageCount();
    return ((state.clientsPageIndex % count) + count) % count;
  }

  function renderClientsGrid() {
    const grid = document.getElementById('clientsGrid');
    grid.innerHTML = '';
    const pageIndex = normalizedPageIndex();
    const pageClients = CLIENTS.slice(pageIndex * PAGE_SIZE, pageIndex * PAGE_SIZE + PAGE_SIZE);

    pageClients.forEach((client) => {
      const btn = document.createElement('button');
      btn.className = 'client-card';
      btn.type = 'button';
      btn.addEventListener('click', () => openClientModal(client.id));

      if (client.image) {
        const img = document.createElement('img');
        img.src = client.image;
        img.alt = client.name;
        withImageFallback(img, client.name);
        btn.appendChild(img);
      } else {
        const span = document.createElement('span');
        span.className = 'fallback';
        span.textContent = client.name;
        btn.appendChild(span);
      }

      grid.appendChild(btn);
    });

    renderPageDots(pageIndex);
  }

  function renderPageDots(pageIndex) {
    const dots = document.getElementById('pageDots');
    dots.innerHTML = '';
    for (let i = 0; i < pageCount(); i++) {
      const dot = document.createElement('span');
      if (i === pageIndex) dot.classList.add('active');
      dots.appendChild(dot);
    }
  }

  document.getElementById('clientsPrev').addEventListener('click', () => {
    state.clientsPageIndex -= 1;
    renderClientsGrid();
  });

  document.getElementById('clientsNext').addEventListener('click', () => {
    state.clientsPageIndex += 1;
    renderClientsGrid();
  });

  // ---------- client modal ----------

  const clientOverlay = document.getElementById('clientOverlay');
  const clientLogoBox = document.getElementById('clientLogoBox');
  const clientLogoImg = document.getElementById('clientLogoImg');
  const clientCategory = document.getElementById('clientCategory');
  const clientName = document.getElementById('clientName');
  const clientSummary = document.getElementById('clientSummary');
  const clientWebsite = document.getElementById('clientWebsite');
  const clientAgeBadge = document.getElementById('clientAgeBadge');
  const projectFrame = document.getElementById('projectFrame');
  const projectImg = document.getElementById('projectImg');
  const projectPlaceholder = document.getElementById('projectPlaceholder');
  const projectTitle = document.getElementById('projectTitle');
  const projectType = document.getElementById('projectType');
  const projectPosition = document.getElementById('projectPosition');
  const projectPrev = document.getElementById('projectPrev');
  const projectNext = document.getElementById('projectNext');

  function getSelectedClient() {
    return CLIENTS.find((c) => c.id === state.selectedId) || null;
  }

  function openClientModal(id) {
    state.selectedId = id;
    state.projectIndex = 0;
    renderClientModal();
    clientOverlay.hidden = false;
  }

  function closeClientModal() {
    clientOverlay.hidden = true;
    state.selectedId = null;
  }

  function renderClientModal() {
    const client = getSelectedClient();
    if (!client) return;

    if (client.image) {
      clientLogoBox.hidden = false;
      clientLogoImg.src = client.image;
      clientLogoImg.alt = client.name;
      clientLogoImg.hidden = false;
      clientLogoImg.onerror = () => { clientLogoBox.hidden = true; };
    } else {
      clientLogoBox.hidden = true;
    }

    clientCategory.textContent = client.category || '';
    clientName.textContent = client.name;
    clientSummary.textContent = client.summary || '';

    if (client.website) {
      const url = client.website.startsWith('http') ? client.website : 'https://' + client.website;
      clientWebsite.href = url;
      clientWebsite.textContent = client.website;
      clientWebsite.hidden = false;
    } else {
      clientWebsite.hidden = true;
    }

    clientAgeBadge.hidden = !client.ageRestricted;

    renderActiveProject();
  }

  function renderActiveProject() {
    const client = getSelectedClient();
    if (!client) return;
    const projects = client.projects || [];
    const count = projects.length;
    const index = count ? ((state.projectIndex % count) + count) % count : 0;
    const project = projects[index] || {};
    const hasMultiple = count > 1;

    projectPrev.hidden = !hasMultiple;
    projectNext.hidden = !hasMultiple;
    projectPosition.hidden = !hasMultiple;
    projectPosition.textContent = hasMultiple ? (index + 1) + ' / ' + count : '';

    projectTitle.textContent = project.title || '';
    projectType.textContent = project.type || '';

    // reset frame
    projectImg.hidden = true;
    projectPlaceholder.hidden = true;
    projectImg.onerror = null;

    if (project.image) {
      projectImg.src = project.image;
      projectImg.alt = project.title || client.name;
      projectImg.hidden = false;
      projectImg.onerror = () => {
        projectImg.hidden = true;
        projectPlaceholder.hidden = false;
        projectPlaceholder.textContent = project.title || 'Imagen no disponible';
      };
    } else {
      projectPlaceholder.hidden = false;
      projectPlaceholder.textContent = project.placeholder || project.title || 'Imagen no disponible';
    }
  }

  projectPrev.addEventListener('click', () => {
    state.projectIndex -= 1;
    renderActiveProject();
  });

  projectNext.addEventListener('click', () => {
    state.projectIndex += 1;
    renderActiveProject();
  });

  document.getElementById('closeClientBtn').addEventListener('click', closeClientModal);
  clientOverlay.addEventListener('click', (e) => {
    if (e.target === clientOverlay) closeClientModal();
  });
  document.getElementById('clientCard').addEventListener('click', (e) => e.stopPropagation());

  // ---------- about section ----------

  document.getElementById('bioText').textContent = BIO;

  function renderLanguages() {
    const el = document.getElementById('languagesList');
    LANGUAGES.forEach((l) => {
      const div = document.createElement('div');
      div.innerHTML = l.name + ' <span>— ' + l.level + '</span>';
      el.appendChild(div);
    });
  }

  function renderChips(containerId, items) {
    const el = document.getElementById(containerId);
    items.forEach((item) => {
      const span = document.createElement('span');
      span.className = 'chip';
      span.textContent = item;
      el.appendChild(span);
    });
  }

  function renderSoftSkills() {
    const el = document.getElementById('softSkillsList');
    SOFT_SKILLS.forEach((s) => {
      const div = document.createElement('div');
      div.textContent = s;
      el.appendChild(div);
    });
  }

  function renderTimeline(containerId, items, kind) {
    const el = document.getElementById(containerId);
    items.forEach((item) => {
      const row = document.createElement('div');
      row.className = 'timeline-row';
      if (kind === 'experience') {
        row.innerHTML =
          '<span class="period">' + item.period + '</span>' +
          '<div><div class="title">' + item.role + '</div>' +
          '<div class="org">' + item.org + '</div>' +
          '<div class="detail">' + item.detail + '</div></div>';
      } else {
        row.innerHTML =
          '<span class="period">' + item.period + '</span>' +
          '<div><div class="title">' + item.title + '</div>' +
          '<div class="org">' + item.org + '</div></div>';
      }
      el.appendChild(row);
    });
  }

  function renderCertifications() {
    const el = document.getElementById('certList');
    CERTIFICATIONS.forEach((c) => {
      const div = document.createElement('div');
      div.className = 'cert-item';
      div.textContent = c;
      el.appendChild(div);
    });
  }

  renderLanguages();
  renderChips('skillsChips', SKILLS);
  renderSoftSkills();
  renderTimeline('experienceList', EXPERIENCE, 'experience');
  renderTimeline('educationList', EDUCATION, 'education');
  renderCertifications();
  renderChips('servicesChips', SERVICES);

  // ---------- all courses modal ----------

  const allCoursesOverlay = document.getElementById('allCoursesOverlay');

  function renderAllCourses() {
    const el = document.getElementById('coursesList');
    ALL_COURSES.forEach((course) => {
      const row = document.createElement('div');
      row.className = 'course-row';
      row.innerHTML =
        '<span class="course-title">' + course.title + '</span>' +
        '<span class="course-hours">' + course.hours + ' hrs</span>';
      el.appendChild(row);
    });
  }
  renderAllCourses();

  document.getElementById('openAllCoursesBtn').addEventListener('click', () => {
    allCoursesOverlay.hidden = false;
  });
  document.getElementById('closeAllCoursesBtn').addEventListener('click', () => {
    allCoursesOverlay.hidden = true;
  });
  allCoursesOverlay.addEventListener('click', (e) => {
    if (e.target === allCoursesOverlay) allCoursesOverlay.hidden = true;
  });
  document.getElementById('allCoursesCard').addEventListener('click', (e) => e.stopPropagation());

  // ---------- image fallbacks for photo & footer logo ----------
  // These <img> tags start loading during HTML parsing, before this script
  // runs — if the 404 already happened by now, a plain 'error' listener
  // would never fire, so we also check img.complete/naturalWidth directly.

  function fallbackStaticImage(img, fallbackClass, fallbackText) {
    const swap = () => {
      const div = document.createElement('div');
      div.className = fallbackClass;
      div.id = img.id;
      div.textContent = fallbackText;
      img.replaceWith(div);
    };
    if (img.complete && img.naturalWidth === 0) {
      swap();
    } else {
      img.addEventListener('error', swap, { once: true });
    }
  }

  fallbackStaticImage(document.getElementById('aboutPhoto'), 'about-photo-fallback', 'Foto de perfil');
  fallbackStaticImage(document.getElementById('footerLogo'), 'footer-logo-fallback', 'Black and White Studio');

  // ---------- scroll to top ----------

  const scrollTopBtn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 480);
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---------- CV download ----------

  document.getElementById('downloadCvBtn').addEventListener('click', () => {
    const w = window.open('', '_blank');
    if (!w) return;
    w.document.write(buildCVHtml());
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 300);
  });

  // ---------- init ----------

  renderClientsGrid();
})();
