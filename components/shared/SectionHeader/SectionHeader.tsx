import React from "react";

type SectionProps = {
  title: string;
  subtitle?: string;
  description?: string;
  align?: "center" | "left" | "right"; // text alignment
  className?: string; // extra classes
};

const SectionHeader: React.FC<SectionProps> = ({
  title,
  subtitle,
  description,
  align = "center",
  className = "",
}) => {
  // Determine Tailwind text alignment class
  const alignmentClass =
    align === "center"
      ? "text-center"
      : align === "left"
      ? "text-left"
      : "text-right";

  return (
    <div className={`${alignmentClass} ${className}`}>
      <h2 className="text-2xl text-black md:text-4xl font-medium lg:text-5xl mb-2">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base text-gray-600 md:text-lg lg:text-xl text-center  font-medium my-6">
          {subtitle}
        </p>
      )}
      <p className="text-base text-gray-600 my-6 w-full md:w-9/12">
        {description}
      </p>
    </div>
  );
};

export default SectionHeader;
