'use client';

import { useCallback, useRef, useState } from 'react';

interface ScrollRevealOptions {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
    options: ScrollRevealOptions = {}
) {
    const { threshold = 0.15, rootMargin = '0px', triggerOnce = true } = options;
    const [isVisible, setIsVisible] = useState(false);
    const observerRef = useRef<IntersectionObserver | null>(null);

    // Use a callback ref so the observer re-attaches whenever the DOM element mounts/changes
    const ref = useCallback(
        (node: T | null) => {
            // Clean up previous observer
            if (observerRef.current) {
                observerRef.current.disconnect();
                observerRef.current = null;
            }

            if (!node) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        if (triggerOnce) {
                            observer.unobserve(node);
                        }
                    } else if (!triggerOnce) {
                        setIsVisible(false);
                    }
                },
                { threshold, rootMargin }
            );

            observer.observe(node);
            observerRef.current = observer;
        },
        [threshold, rootMargin, triggerOnce]
    );

    return { ref, isVisible };
}
