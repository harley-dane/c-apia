import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import cpia from "../assets/cpia.png";

// Define the User type for TypeScript
interface User {
  id: string;
  email: string;
  name: string;
  token: string;
}

function Header() {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);

  // Safely parse user from localStorage
  let user: User | null = null;
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      user = JSON.parse(storedUser) as User;
    }
  } catch (error) {
    console.error("Failed to parse user from localStorage:", error);
    localStorage.removeItem("user");
  }

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsMenuOpen(false);
    setIsAboutDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
    setIsMenuOpen(false);
    setIsAboutDropdownOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsAboutDropdownOpen(false); // Close dropdown when toggling mobile menu
  };

  const toggleAboutDropdown = () => {
    setIsAboutDropdownOpen(!isAboutDropdownOpen);
  };

  return (
    <header className="bg-blue-600 text-white sticky top-0 z-50 shadow-md">
      <nav className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={cpia}
            alt={t("logoAlt")}
            className="h-12 w-auto rounded-full shadow-md hover:shadow-lg transition-shadow duration-300"
          />
          <span className="ml-3 text-2xl font-bold hidden sm:block">
            {t("appName")}
          </span>
        </Link>

        {/* Hamburger Menu Button (Mobile) */}
        <button
          className="sm:hidden focus:outline-none"
          onClick={toggleMenu}
          aria-label={t("toggleMenu")}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <ul
          className={`${
            isMenuOpen ? "block" : "hidden"
          } sm:flex flex-col sm:flex-row sm:space-x-6 absolute sm:static top-16 left-0 w-full sm:w-auto bg-blue-600 sm:bg-transparent p-4 sm:p-0 transition-all duration-300 ease-in-out`}
        >
          <li className="mb-2 sm:mb-0">
            <Link
              to="/"
              className="hover:text-blue-200 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("home")}
            </Link>
          </li>
          <li className="mb-2 sm:mb-0 relative">
            <button
              onClick={toggleAboutDropdown}
              className="hover:text-blue-200 transition-colors duration-200 flex items-center"
              aria-expanded={isAboutDropdownOpen}
              aria-haspopup="true"
            >
              {t("about")}
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <ul
              className={`${
                isAboutDropdownOpen ? "block" : "hidden"
              } sm:absolute sm:bg-blue-600 sm:shadow-lg sm:rounded-md sm:mt-2 sm:w-48 flex flex-col sm:p-2`}
            >
              <li>
                <Link
                  to="/affiliates"
                  className="block px-4 py-2 hover:text-blue-200 transition-colors duration-200"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsAboutDropdownOpen(false);
                  }}
                >
                  {t("affiliates")}
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="block px-4 py-2 hover:text-blue-200 transition-colors duration-200"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsAboutDropdownOpen(false);
                  }}
                >
                  {t("blog")}
                </Link>
              </li>
              <li>
                <Link
                  to="/volunteer"
                  className="block px-4 py-2 hover:text-blue-200 transition-colors duration-200"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsAboutDropdownOpen(false);
                  }}
                >
                  {t("volunteer")}
                </Link>
              </li>
            </ul>
          </li>
          <li className="mb-2 sm:mb-0">
            <Link
              to="/donate"
              className="hover:text-blue-200 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("donate")}
            </Link>
          </li>
          <li className="mb-2 sm:mb-0">
            <Link
              to="/contact"
              className="hover:text-blue-200 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("contact")}
            </Link>
          </li>
          {user ? (
            <li className="mb-2 sm:mb-0">
              <button
                onClick={handleLogout}
                className="hover:text-blue-200 transition-colors duration-200"
              >
                {t("logout")}
              </button>
            </li>
          ) : (
            <>
              <li className="mb-2 sm:mb-0">
                <Link
                  to="/login"
                  className="hover:text-blue-200 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("login")}
                </Link>
              </li>
              <li className="mb-2 sm:mb-0">
                <Link
                  to="/register"
                  className="hover:text-blue-200 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("register")}
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Language Switcher (Desktop) */}
        <div className="hidden sm:flex space-x-2">
          <button
            onClick={() => changeLanguage("en")}
            className="px-2 py-1 rounded hover:bg-blue-700 transition-colors duration-200"
            aria-label={t("switchToEnglish")}
          >
            EN
          </button>
          <button
            onClick={() => changeLanguage("es")}
            className="px-2 py-1 rounded hover:bg-blue-700 transition-colors duration-200"
            aria-label={t("switchToSpanish")}
          >
            ES
          </button>
        </div>
      </nav>

      {/* Mobile Language Switcher */}
      {isMenuOpen && (
        <div className="sm:hidden bg-blue-600 p-4">
          <button
            onClick={() => changeLanguage("en")}
            className="block w-full text-left py-2 hover:text-blue-200 transition-colors duration-200"
            aria-label={t("switchToEnglish")}
          >
            {t("english")}
          </button>
          <button
            onClick={() => changeLanguage("es")}
            className="block w-full text-left py-2 hover:text-blue-200 transition-colors duration-200"
            aria-label={t("switchToSpanish")}
          >
            {t("spanish")}
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
