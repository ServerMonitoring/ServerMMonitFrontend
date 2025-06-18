import React, { useState } from "react";

interface Section {
  id: string;
  title: string;
}

interface HelpSidebarProps {
  sections: Section[];
}

const HelpSidebar: React.FC<HelpSidebarProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string>("getting-started");

  // Обработчик кликов на ссылки оглавления
  const handleSectionClick = (id: string) => {
    setActiveSection(id);
  };

  return (
    <aside className="sidebar">
      <h3>Table of Contents</h3>
      <ul className="toc">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={`toc-link ${activeSection === section.id ? "active" : ""}`}
              onClick={() => handleSectionClick(section.id)}
            >
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default HelpSidebar;