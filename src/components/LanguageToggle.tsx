import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const LanguageToggle = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 rounded-lg bg-card/20 border border-border hover:bg-card/40 transition-all duration-300 hover:scale-110">
          <Globe className="w-5 h-5 text-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-card/95 backdrop-blur-xl border-border">
        <DropdownMenuItem
          onClick={() => changeLanguage('pt')}
          className={`cursor-pointer ${i18n.language === 'pt' ? 'bg-primary/10 text-primary' : ''}`}
        >
          🇧🇷 {t('language.portuguese')}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => changeLanguage('en')}
          className={`cursor-pointer ${i18n.language === 'en' ? 'bg-primary/10 text-primary' : ''}`}
        >
          🇺🇸 {t('language.english')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageToggle;