import React, { useEffect, useState } from "react";
import HelpSidebar from "../../Component/Help/HelpSidebar/HelpSidebar";
import HelpContent from "../../Component/Help/HelpContent/HelpContent";
import "./HelpPage.scss";

const HelpPage: React.FC = () => {
  const [sections, setSections] = useState<any[]>([]);


  useEffect(() => {
    fetch("/help.json")
      .then((response) => response.json())
      .then((data) => setSections(data))
      .catch((error) => console.error("Error loading help data:", error));
  }, []);

  return (
    <div className="help-page">
      <HelpSidebar sections={sections} />
      <HelpContent sections={sections} />
    </div>
  );
};

export default HelpPage;