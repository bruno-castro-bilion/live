/* Pixel da Meta: só carrega se o PIXEL_ID estiver preenchido no config.js */
(function () {
  var id = (window.CONFIG || {}).PIXEL_ID;
  window.rastrear = function () {};
  if (!id) return;
  !function (f, b, e, v, n, t, s) {
    if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
    if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
    t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
  }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  // Correspondência avançada: depois do cadastro, o pixel recebe e-mail, telefone e nome (ele mesmo criptografa)
  var dados = {};
  try {
    var c = JSON.parse(sessionStorage.getItem("cadastro") || "null");
    if (c) { if (c.email) dados.em = c.email; if (c.fone) dados.ph = c.fone; if (c.nome) dados.fn = String(c.nome).toLowerCase(); dados.country = "br"; }
  } catch (e) {}
  fbq("init", String(id).replace(/\D/g, ""), dados);
  fbq("track", "PageView");
  window.rastrear = function (evento, dados, padrao) {
    try { fbq(padrao === false ? "trackCustom" : "track", evento, dados || {}); } catch (e) {}
  };
})();
