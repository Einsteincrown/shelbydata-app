import { forwardRef, ReactNode } from "react";

export const PageWrapper = forwardRef<HTMLDivElement, { children: ReactNode }>(
  ({ children }, ref) => (
    <div ref={ref} className="animate-fade-in">{children}</div>
  )
);

PageWrapper.displayName = "PageWrapper";
