"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface SlickDialogProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  isOpen?: boolean;
  layoutId?: string;
  onClose?: () => void;
}

const SlickDialog = ({
  title,
  description,
  children,
  isOpen = false,
  layoutId,
  onClose = () => {},
}: SlickDialogProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Focus the dialog on open
    dialogRef.current?.focus();

    // Store the element that had focus before opening the dialog
    const previousActiveElement = document.activeElement;

    // Get all focusable elements within the dialog
    const getFocusableElements = () => {
      if (!contentRef.current) return [];
      return Array.from(
        contentRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      );
    };

    // Handle keyboard navigation
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    // Handle click outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup function
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      (previousActiveElement as HTMLElement)?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      aria-modal="true"
      className="fixed inset-0 z-50 flex flex-col items-start bg-black/50"
      initial={{
        backgroundColor: "rgb(0 0 0 / 0)",
        backdropFilter: "blur(0px)",
      }}
      animate={{
        backgroundColor: "rgb(0 0 0 / 0.5)",
        backdropFilter: "blur(5px)",
      }}
      exit={{
        backgroundColor: "rgb(0 0 0 / 0)",
        backdropFilter: "blur(0px)",
      }}
      tabIndex={-1}
    >
      <motion.div
        layoutId={layoutId}
        ref={contentRef}
        className="relative m-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-lg"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>

        {title && (
          <h2 id="dialog-title" className="text-xl font-semibold text-gray-900">
            {title}
          </h2>
        )}

        {description && (
          <p id="dialog-description" className="mt-2 text-sm text-gray-600">
            {description}
          </p>
        )}

        <div className="mt-4">{children}</div>
      </motion.div>
    </motion.div>
  );
};

export default SlickDialog;
