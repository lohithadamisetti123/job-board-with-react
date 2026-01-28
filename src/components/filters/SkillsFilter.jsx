import Select from "react-select";
import { useJobStore } from "../../hooks/useJobStore";

export default function SkillsFilter({ allSkills }) {
  const selectedSkills = useJobStore((s) => s.filters.skills);
  const setFilter = useJobStore((s) => s.setFilter);

  const options = allSkills.map((skill) => ({
    value: skill,
    label: skill
  }));

  const handleChange = (selected) => {
    const skills = selected ? selected.map((opt) => opt.value) : [];
    setFilter("skills", skills);
  };

  const value = selectedSkills.map((s) => ({ value: s, label: s }));

  return (
    <div className="mb-4" data-testid="filter-skills">
      <h3 className="font-semibold mb-2">Skills</h3>
      <div style={{ position: "relative", zIndex: 30 }}>
        <Select
          isMulti
          options={options}
          value={value}
          onChange={handleChange}
          classNamePrefix="skills-select"
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 })
          }}
        />
      </div>
    </div>
  );
}
