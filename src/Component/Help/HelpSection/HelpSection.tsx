import React from "react";

interface HelpSectionProps {
  id: string;
  title: string;
  isActive: boolean;
  children: React.ReactNode;
  onSectionChange: (id: string) => void;
}

const HelpSection: React.FC<HelpSectionProps> = ({ id, title, isActive, children, onSectionChange }) => {
  if (!isActive) return null;

  return (
    <article id={id} className="section">
      <h2>{title}</h2>
      <div>{children}</div>
    </article>
  );
};

export default HelpSection;