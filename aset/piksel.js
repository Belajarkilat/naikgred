/* Meta Pixel NaikGred (16 Okt 2026). Satu fail untuk semua laman, jadi Pixel ID
   hanya perlu diisi di sini sekali.

   Hanya untuk orang dewasa (guru dan ibu bapa):
   - landing: dimuat terus -> PageView, dan Lead apabila pautan ke app diklik
   - app: TIDAK dimuat semasa murid bermain; dimuat hanya pada saat bayaran guru
     atau ibu bapa disahkan berjaya -> Purchase (lihat NGPiksel dalam index.html app)
   Selagi ID kosong, fail ini tidak berbuat apa-apa. */
(function(){
  var ID = "1132319742906472";
  if(!ID || window.fbq) return;

  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
  document,'script','https://connect.facebook.net/en_US/fbevents.js');

  fbq('init', ID);
  fbq('track', 'PageView');

  /* Klik dari landing ke app, sekali setiap jenis setiap halaman:
     Lead = daftar / log masuk guru / keluarga; ViewContent = cuba kelas demo. */
  var sudah = {};
  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('a[href]');
    if(!a) return;
    var u; try{ u = new URL(a.href, location.href); }catch(x){ return; }
    if(!/^jejaktp[a-z]*\.naikgred\.com$/.test(u.hostname)) return;
    if(!/^\/(index\.html)?$/.test(u.pathname)) return;
    var q = u.search, jenis = /[?&]demo=/.test(q) ? 'ViewContent'
      : /[?&](daftar|cikgu|keluarga)\b/.test(q) ? 'Lead' : '';
    if(!jenis || sudah[jenis]) return;
    sudah[jenis] = true;
    fbq('track', jenis, {content_name: u.hostname + u.search.split('&')[0]});
  }, true);
})();
