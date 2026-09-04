"use client";

import { useEffect } from "react";
import { urlWithCurrentSearchParams } from "@/lib/url-parameters";

const NAVIGATION_SELECTOR =
  'a[href], form[action], button[formaction], input[formaction], iframe[data-checkout][src], iframe[src*="checkout"], iframe[src*="lastlink"], iframe[src*="hoopay"]';

function propagateToElement(element: Element) {
  const attribute =
    element instanceof HTMLAnchorElement
      ? "href"
      : element instanceof HTMLFormElement
        ? "action"
        : element instanceof HTMLIFrameElement
          ? "src"
          : element instanceof HTMLButtonElement || element instanceof HTMLInputElement
            ? "formaction"
            : null;

  if (!attribute) return;

  const currentValue = element.getAttribute(attribute);
  if (!currentValue) return;

  const propagatedValue = urlWithCurrentSearchParams(currentValue);
  if (propagatedValue !== currentValue) {
    element.setAttribute(attribute, propagatedValue);
  }
}

function propagateWithin(root: ParentNode) {
  if (root instanceof Element && root.matches(NAVIGATION_SELECTOR)) {
    propagateToElement(root);
  }
  root.querySelectorAll(NAVIGATION_SELECTOR).forEach(propagateToElement);
}

export function UrlParameterPropagation() {
  useEffect(() => {
    propagateWithin(document);

    const refreshClickedDestination = (event: Event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const navigation = target.closest(NAVIGATION_SELECTOR);
      if (navigation) propagateToElement(navigation);
    };

    const refreshSubmittedForm = (event: SubmitEvent) => {
      if (event.target instanceof HTMLFormElement) {
        propagateToElement(event.target);
      }
      if (event.submitter instanceof Element) {
        propagateToElement(event.submitter);
      }
    };

    document.addEventListener("click", refreshClickedDestination, true);
    document.addEventListener("submit", refreshSubmittedForm, true);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "attributes") {
          propagateToElement(mutation.target as Element);
          continue;
        }

        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) propagateWithin(node);
        });
      }
    });

    observer.observe(document.documentElement, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["href", "action", "formaction", "src"],
    });

    return () => {
      observer.disconnect();
      document.removeEventListener("click", refreshClickedDestination, true);
      document.removeEventListener("submit", refreshSubmittedForm, true);
    };
  }, []);

  return null;
}
