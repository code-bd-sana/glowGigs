import React from "react";

type SectionProps = {
  title: string;
  subtitle?: string;
  description?: string;
  align?: "center" | "left" | "right"; // text alignment
  className?: string; // extra classes
  titleClassName?: string;
  subTitleClassName?: string;
};

const SectionHeader: React.FC<SectionProps> = ({
  title,
  subtitle,
  description,
  align = "center",
  className = "",
  titleClassName = "",
  subTitleClassName = "",
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
      <h2
        className={`text-2xl md:text-4xl lg:text-5xl font-medium mb-2 ${
          titleClassName || "text-black"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-base  md:text-lg lg:text-xl  font-medium my-6 ${
            subTitleClassName || "text-gray-600"
          } `}
        >
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
