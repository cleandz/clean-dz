
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { language, dir } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Simple translations for the 404 page
  const translations = {
    ar: {
      notFound: "404",
      message: "عفواً! الصفحة غير موجودة",
      returnHome: "العودة إلى الصفحة الرئيسية"
    },
    en: {
      notFound: "404",
      message: "Oops! Page not found",
      returnHome: "Return to Home"
    },
    fr: {
      notFound: "404",
      message: "Oups! Page non trouvée",
      returnHome: "Retour à l'accueil"
    }
  };

  const t = translations[language];

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gray-100 ${dir === 'rtl' ? 'rtl' : 'ltr'}`}>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{t.notFound}</h1>
        <p className="text-xl text-gray-600 mb-4">{t.message}</p>
        <Link to="/" className="text-blue-500 hover:text-blue-700 underline">
          {t.returnHome}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
