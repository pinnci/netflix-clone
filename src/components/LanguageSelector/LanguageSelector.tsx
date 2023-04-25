import Icon from "../Icon/Icon";

const LanguageSelector = () => {
  return (
    <div className="flex items-center relative mx-3 sm:mx-4 languageSelector_container">
      <Icon
        name="globe"
        className="languageSelector_container__globeIcon absolute pointer-events-none"
      />
      <select className="languageSelector rounded w-0 pl-5 pr-8 py-1.5 sm:w-full sm:px-8">
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
