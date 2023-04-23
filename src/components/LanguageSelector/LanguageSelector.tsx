import Icon from "../Icon/Icon";

const LanguageSelector = () => {
  return (
    <div className="flex items-center relative languageSelector_container">
      <Icon
        name="globe"
        className="languageSelector_container__globeIcon absolute pointer-events-none"
      />
      <select className="languageSelector">
        <option>English</option>
        <option>Čestina</option>
      </select>
      <Icon
        name="caret-down"
        className="languageSelector_container__caretIcon absolute pointer-events-none"
      />
    </div>
  );
};

export default LanguageSelector;
