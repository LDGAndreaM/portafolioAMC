function buildCVHtml() {
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const section = (title, inner) =>
    '<div style="margin-top:26px;"><h2 style="font-family:Georgia,serif; font-weight:400; font-size:13px; letter-spacing:0.14em; text-transform:uppercase; color:#555; border-bottom:1px solid #ddd; padding-bottom:8px; margin:0 0 14px;">' +
    title + '</h2>' + inner + '</div>';

  const experienceHtml = EXPERIENCE.map((e) =>
    '<div style="margin-bottom:14px;"><div style="display:flex; justify-content:space-between; gap:12px;"><strong style="font-size:14px;">' +
    esc(e.role) + '</strong><span style="font-size:12px; color:#666;">' + esc(e.period) +
    '</span></div><div style="font-size:12.5px; color:#666; margin-top:2px;">' + esc(e.org) +
    '</div><div style="font-size:12.5px; color:#444; margin-top:4px; line-height:1.5;">' + esc(e.detail) + '</div></div>'
  ).join('');

  const educationHtml = EDUCATION.map((ed) =>
    '<div style="margin-bottom:12px;"><div style="display:flex; justify-content:space-between; gap:12px;"><strong style="font-size:14px;">' +
    esc(ed.title) + '</strong><span style="font-size:12px; color:#666;">' + esc(ed.period) +
    '</span></div><div style="font-size:12.5px; color:#666; margin-top:2px;">' + esc(ed.org) + '</div></div>'
  ).join('');

  const certsHtml = '<ul style="margin:0; padding-left:18px; font-size:13px; line-height:1.9;">' +
    CERTIFICATIONS.map((c) => '<li>' + esc(c) + '</li>').join('') + '</ul>';

  const langsHtml = LANGUAGES.map((l) =>
    '<div style="font-size:13px; margin-bottom:4px;">' + esc(l.name) + ' <span style="color:#666;">— ' + esc(l.level) + '</span></div>'
  ).join('');

  const chips = (arr) => '<div style="display:flex; flex-wrap:wrap; gap:6px;">' +
    arr.map((x) => '<span style="padding:5px 12px; border:1px solid #ccc; border-radius:999px; font-size:11.5px; color:#333;">' + esc(x) + '</span>').join('') +
    '</div>';

  const softHtml = '<div style="font-size:13px; line-height:1.9;">' + SOFT_SKILLS.map((s) => esc(s)).join('<br>') + '</div>';

  return '<!DOCTYPE html><html><head><meta charset="utf-8"><title>CV — Andrea Martínez Casas</title><style>@page{margin:26mm 20mm;}body{font-family:Helvetica,Arial,sans-serif;color:#111;margin:0;}</style></head><body>' +
    '<div style="font-family:Georgia,serif; font-size:28px;">Andrea Martínez Casas</div>' +
    '<div style="font-size:14px; color:#555; margin-top:4px;">Diseñadora gráfica &amp; consultora de marketing digital</div>' +
    '<div style="font-size:12px; color:#777; margin-top:2px;">Guaymas, Sonora, México · graphics.amc@gmail.com · 622 161 3840</div>' +
    '<div style="height:1px; background:#222; margin-top:16px;"></div>' +
    '<p style="font-size:13px; line-height:1.7; color:#333; margin-top:20px;">' + esc(BIO) + '</p>' +
    section('Idiomas', langsHtml) +
    section('Habilidades duras', chips(SKILLS)) +
    section('Habilidades blandas', softHtml) +
    section('Experiencia', experienceHtml) +
    section('Educación', educationHtml) +
    section('Certificaciones &amp; diplomados', certsHtml) +
    section('Servicios', chips(SERVICES)) +
    '</body></html>';
}
