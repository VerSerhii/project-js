(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();const f="https://sound-wave.b.goit.study/api",m=document.getElementById("artists-list"),c=document.getElementById("load-more");let a=1;const l=8;async function d(s=1,i=8){try{const t=await fetch(`${f}/artists?page=${s}&limit=${i}`);if(!t.ok)throw new Error("Failed to fetch artists");return await t.json()}catch(t){console.error(t)}}function u(s){s.filter(t=>t.strArtistThumb);const i=s.map(t=>`
      <li class="artist-card">
        <img class="artist-photo" src="${t.strArtistThumb}" alt="${t.strArtist}" />
        <div class="artist-info">
          <ul class="artist-genres">
            ${t.genres.map(o=>`<li class="artist-genre">${o}</li>`).join("")}
          </ul>
          <h3 class="artist-name">${t.strArtist}</h3>
          <p class="artist-description">
            ${t.strBiographyEN?t.strBiographyEN.slice(0,120)+"...":"No description available"}
          </p>
          <button class="learn-more-btn" data-id="${t._id}">Learn More
          <img src="../img/arrow.svg" alt="arrow" class="icon" />
        </div>
      </li>
    `).join("");m.insertAdjacentHTML("beforeend",i),document.querySelectorAll(".learn-more-btn").forEach(t=>t.addEventListener("click",o=>openModal(o.target.dataset.id)))}async function p(){const s=await d(a,l);u(s.artists)}p();c.addEventListener("click",async()=>{a++;const s=await d(a,l);u(s.artists),s.hasMore||(c.style.display="none")});
//# sourceMappingURL=index.js.map
