import React, { useState } from "react";
import HelpSection from "../HelpSection/HelpSection";

interface Section {
  id: string;
  title: string;
  content: string[];
}

interface HelpContentProps {
  sections: Section[];
}

const HelpContent: React.FC<HelpContentProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string>("getting-started");

  // Обработчик кликов на ссылки оглавления
  const handleSectionChange = (id: string) => {
    setActiveSection(id);
  };

  return (
    <section className="content">
      {sections.map((section) => (
        <HelpSection
          key={section.id}
          id={section.id}
          title={section.title}
          isActive={activeSection === section.id}
          onSectionChange={handleSectionChange}
        >
          <div dangerouslySetInnerHTML={{ __html: section.content.join("") }} />
        </HelpSection>
      ))}
    </section>
  );
};

export default HelpContent;