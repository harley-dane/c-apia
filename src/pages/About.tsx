import Gallery from '../components/Gallery';
import { useTranslation } from 'react-i18next';

function About() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-4">{t('about')}</h2>
      <p className="mb-4">{t('aboutDescription')}</p>
      <h3 className="text-2xl font-bold mb-2">{t('ourImpact')}</h3>
      <ul className="list-disc pl-5">
        <li>{t('impact1')}</li>
        <li>{t('impact2')}</li>
      </ul>
      <Gallery />
    </div>
  );
}

export default About;