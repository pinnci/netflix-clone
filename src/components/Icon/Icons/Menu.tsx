const Menu = ({ ...other }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...other}
    >
      <path
        id="a"
        d="M8 13a1 1 0 0 1 0-2h12a1 1 0 0 1 0 2H8Zm-4 6a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2H4ZM4 7a1 1 0 1 1 0-2h16a1 1 0 0 1 0 2H4Z"
        fill="currentColor"
        fillRule="nonzero"
      />
    </svg>
  );
};

export default Menu;
