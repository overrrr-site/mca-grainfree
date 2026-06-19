/* ============================================================
   FAQ accordion: exclusive open.

   Fallback for browsers that don't support <details name="...">
   grouping: when one <details> in a named group opens, close the
   others sharing the same `name`.

   Usage (from a page <script>):
     import { initFaqAccordion } from '../scripts/faq-accordion';
     initFaqAccordion();
   ============================================================ */

export function initFaqAccordion(): void {
  document.addEventListener('toggle', (e) => {
    const target = e.target as HTMLDetailsElement | null;
    if (!target || target.tagName !== 'DETAILS') return;
    const groupName = target.getAttribute('name');
    if (!groupName || !target.open) return;
    document.querySelectorAll<HTMLDetailsElement>(`details[name="${groupName}"]`).forEach((other) => {
      if (other !== target) other.open = false;
    });
  }, true);
}
