/** Cursor 内蔵プレビューが DOM に注入する属性を、React hydration 前後に除去する（開発専用） */
export const DEV_PREVIEW_HYDRATION_FIX_SCRIPT = `
(function () {
  var ATTRS = ["data-cursor-ref", "data-cursor-element-id"];

  function stripNode(node) {
    if (!node || node.nodeType !== 1) return;
    for (var i = 0; i < ATTRS.length; i++) {
      if (node.hasAttribute(ATTRS[i])) {
        node.removeAttribute(ATTRS[i]);
      }
    }
  }

  function stripTree(root) {
    if (!root) return;
    stripNode(root);
    if (root.querySelectorAll) {
      var selector = ATTRS.map(function (name) {
        return "[" + name + "]";
      }).join(",");
      root.querySelectorAll(selector).forEach(stripNode);
    }
  }

  function stripAll() {
    stripTree(document.documentElement);
    if (document.body && document.body.style.cursor === "none") {
      document.body.style.removeProperty("cursor");
    }
  }

  stripAll();

  var observer = new MutationObserver(function (mutations) {
    for (var i = 0; i < mutations.length; i++) {
      var mutation = mutations[i];
      if (
        mutation.type === "attributes" &&
        mutation.attributeName &&
        ATTRS.indexOf(mutation.attributeName) !== -1
      ) {
        stripNode(mutation.target);
      }
      if (mutation.addedNodes) {
        for (var j = 0; j < mutation.addedNodes.length; j++) {
          stripTree(mutation.addedNodes[j]);
        }
      }
    }
  });

  observer.observe(document.documentElement, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ATTRS,
  });

  window.addEventListener("DOMContentLoaded", stripAll);
  window.addEventListener("load", stripAll);

  var count = 0;
  var timer = window.setInterval(function () {
    stripAll();
    count += 1;
    if (count >= 120) {
      window.clearInterval(timer);
      observer.disconnect();
    }
  }, 50);
})();
`;

export function DevPreviewHydrationFix() {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <script
      id="dev-preview-hydration-fix"
      dangerouslySetInnerHTML={{ __html: DEV_PREVIEW_HYDRATION_FIX_SCRIPT }}
    />
  );
}
