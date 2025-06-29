import React from "react";

const Skills = ({ sharedSkills, resumeBasicInfo }) => {
  if (!sharedSkills || !resumeBasicInfo) return null;

  const sectionName = resumeBasicInfo.section_name.skills;

  const getColorByLevel = (level) => {
    if (level >= 80) return "#00c9a7";
    if (level >= 50) return "#ffc107";
    return "#dc3545";
  };

  const skills = sharedSkills.icons.map((skill, i) => (
    <li className="list-inline-item mx-3" key={i}>
      <div
        className="text-center skills-tile"
        title={`Skill level: ${skill.level}%`}
        style={{
          transition: "transform 0.3s",
        }}
      >
        <i
          className={skill.class}
          style={{ fontSize: "220%", color: getColorByLevel(skill.level) }}
        ></i>
        <p className="text-center mt-2">{skill.name}</p>
        <div
          style={{
            height: "5px",
            width: "60px",
            backgroundColor: "#ddd",
            margin: "5px auto",
            borderRadius: "5px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${skill.level}%`,
              height: "100%",
              backgroundColor: getColorByLevel(skill.level),
            }}
          ></div>
        </div>
      </div>
    </li>
  ));

  return (
    <section id="skills">
      <div className="col-md-12">
        <div className="col-md-12">
          <h1 className="section-title">
            <span className="text-white">{sectionName}</span>
          </h1>
        </div>
        <div className="col-md-12 text-center">
          <ul className="list-inline mx-auto skill-icon">{skills}</ul>
        </div>
      </div>
    </section>
  );
};

export default Skills;
