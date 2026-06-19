/* ============================================================
   CTA smooth-scroll.

   Intercepts clicks on `a[href="#cta"]` and scrolls the #cta
   target into view smoothly. Layout sizing/scaling is handled by
   CSS (.screen / .screen-wrapper + --scale in variables.css), so
   no JS is needed for layout.

   Usage (from the layout <script>):
     import { initSmoothScroll } from '../scripts/smooth-scroll';
     initSmoothScroll();
   ============================================================ */

export function initSmoothScroll(): void {
  document.addEventListener('click', (e) => {
    const link = (e.target as HTMLElement).closest('a[href="#cta"]');
    if (!link) return;
    e.preventDefault();
    const target = document.getElementById('cta');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
}
