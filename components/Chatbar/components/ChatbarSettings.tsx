import {
  IconFileExport,
  IconMoon,
  IconSun,
  IconUser,
} from '@tabler/icons-react';
import { useContext } from 'react';

import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import HomeContext from '@/pages/api/home/home.context';

import { Import } from '../../Settings/Import';
import { Key } from '../../Settings/Key';
import { SidebarButton } from '../../Sidebar/SidebarButton';
import ChatbarContext from '../Chatbar.context';
import { ClearConversations } from './ClearConversations';
import { PluginKeys } from './PluginKeys';

import Cookies from 'js-cookie';

export const ChatbarSettings = () => {
  const { t } = useTranslation('sidebar');

  const {
    state: {
      apiKey,
      lightMode,
      serverSideApiKeyIsSet,
      serverSidePluginKeysSet,
      conversations,
    },
    dispatch: homeDispatch,
  } = useContext(HomeContext);

  const {
    handleClearConversations,
    handleImportConversations,
    handleExportData,

    handleApiKeyChange,
  } = useContext(ChatbarContext);

  const router = useRouter();

  const turnToUserProfile = () => {
    const jwt = Cookies.get('access_token');

    if (jwt) {
      router.push('/profile');
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="flex flex-col items-center space-y-1 border-t border-white/20 pt-1 text-sm">
      {conversations.length > 0 ? (
        <ClearConversations onClearConversations={handleClearConversations} />
      ) : null}

      <Import onImport={handleImportConversations} />

      <SidebarButton
        text={t('Export data')}
        icon={<IconFileExport size={18} />}
        onClick={() => handleExportData()}
      />

      {/* <SidebarButton
        text={t('User Profile')}
        icon={<IconUser size={18} />}
        onClick={() => turnToUserProfile()}
      /> */}

      <SidebarButton
        text={lightMode === 'light' ? t('Dark mode') : t('Light mode')}
        icon={
          lightMode === 'light' ? <IconMoon size={18} /> : <IconSun size={18} />
        }
        onClick={() =>
          homeDispatch({
            field: 'lightMode',
            value: lightMode === 'light' ? 'dark' : 'light',
          })
        }
      />

      {!serverSideApiKeyIsSet ? (
        <Key apiKey={apiKey} onApiKeyChange={handleApiKeyChange} />
      ) : null}

      {!serverSidePluginKeysSet ? <PluginKeys /> : null}
    </div>
  );
};
