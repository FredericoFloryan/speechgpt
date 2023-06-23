import React, { useEffect, useState } from 'react';
import Content from '../components/Content';
import { Toaster } from 'react-hot-toast';
import * as Notify from '../components/Notification';
import { browserName, isMobile } from 'react-device-detect';
import { useGlobalStore, useSessionStore } from '../store/module';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';

import SettingDialog from '../components/Settings/SettingDialog';
import EllipsisMenu from '../components/EllipsisMenu';

import { IconMenu2 } from '@tabler/icons-react';
import AboutDialog from '../components/AboutDialog';
import Sidebar from '../components/Conversations/Sidebar';

import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { db } from '../../firebase';
import { auth } from '../../firebase';



function Home() {
  const { i18n } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { speech, setSpeech, voice, setVoice } = useGlobalStore();
  const { sessions, addSession, setCurrentSessionId, currentSessionId } = useSessionStore();

  const [openSetting, setOpenSetting] = useState<boolean>(false);
  const [openAbout, setOpenAbout] = useState<boolean>(false);


 
  const notifyDict = {
    clearedNotify: Notify.clearedNotify,
    copiedNotify: Notify.copiedNotify,
    resetNotify: Notify.resetNotify,
    invalidOpenAiKeyNotify: Notify.invalidOpenAiKeyNotify,
    openAiErrorNotify: Notify.openAiErrorNotify,
    networkErrorNotify: Notify.networkErrorNotify,
    invalidOpenAiRequestNotify: Notify.invalidOpenAiKeyNotify,
    invalidOpenAiModelNotify: Notify.invalidOpenAiModelNotify,
    emptyOpenAiKeyNotify: Notify.emptyOpenAiKeyNotify,
    deletedNotify: Notify.deletedNotify,
    errorBuiltinSpeechRecognitionNotify: Notify.errorBuiltinSpeechRecognitionNotify,
    errorBuiltinSpeechSynthesisNotify: Notify.errorBuiltinSpeechSynthesisNotify,
    azureSynthesisErrorNotify: Notify.azureSynthesisErrorNotify,
    azureRecognitionErrorNotify: Notify.azureRecognitionErrorNotify,
    awsErrorNotify: Notify.awsErrorNotify,
    emptyAzureKeyNotify: Notify.emptyAzureKeyNotify,
    invalidAzureKeyNotify: Notify.invalidAzureKeyNotify,
    cannotBeEmptyNotify: Notify.cannotBeEmptyNotify,
    invalidAccessCodeNotify: Notify.invalidAccessCodeNotify,
    allConversationClearNotify: Notify.allConversationClearNotify,
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (isMobile || browserName !== 'Chrome') {
    if (voice.service === 'System') {
      setVoice({ ...voice, service: 'Azure Speech to Text' });
    }

    if (isMobile && speech.service === 'System') {
      setSpeech({ ...speech, service: 'Azure TTS' });
    }
  }

  useEffect(() => {
    if (sessions.length === 0) {
      const uuid: string = uuidv4();
      addSession({
        id: uuid,
        topic: i18n.t('conversations.new-conversation'),
        messageCount: 0,
      });
      setCurrentSessionId(uuid);
    }
    if (sessions.length === 1 && currentSessionId !== sessions[0].id) {
      setCurrentSessionId(sessions[0].id);
    }
  }, [sessions.length]);

  const user = auth.currentUser;
  // const [signedIn, toggleSignIn ] = useState(false);


  async function fetchUserInfo() {
    if (user) {
      const uid = user.uid
      const displayName = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;
      const emailVerified = user.emailVerified;
      

      const userAnalytics = {
        stats: {
          grammar: 0,
          pronounciation: 0,
          fluency: 0,
          Intonation: 0,
          general_context: 0,
        },
        answered: 0,
      };

      const accountInfo = {
        email: email,
        displayName: displayName,
        photoURL : photoURL,
        emailVerified: emailVerified,
      };

      try {
        const usersRef = doc(db, "accountInfo", uid);
        const docSnap = await getDoc(usersRef);
    
        if (!docSnap.exists()) {
          setDoc(doc(db, "accountInfo", uid), accountInfo);
          setDoc(doc(db, "userAnalytics", uid), userAnalytics);
          console.log("Created new user", docSnap.data());
        }
        else {
          console.log("User exists!")
        }


      } catch (error) {
        console.error("Error fetching document:", error);
      }
    }

    }
    useEffect(() => {
      console.log("Triggered")
      fetchUserInfo();  
    }, [])

  return (
    <div className="bg-slate-100 flex h-full relative">
      
      <Toaster />
      <SettingDialog open={openSetting} onClose={() => setOpenSetting(false)} />
      <AboutDialog open={openAbout} onClose={() => setOpenAbout(false)} notify={notifyDict} />
      <div
        className={`z-10 w-80 py-8 px-4 lg:ml-3 bg-white rounded-2xl absolute lg:relative transition-transform duration-500 ease-in-out ${
          sidebarOpen ? 'transform translate-x-0 ml-3' : 'transform -translate-x-full'
        } lg:transform lg:translate-x-0`}
        style={{ zIndex: 1, height: 'calc(100% - 24px)', marginTop: '12px', marginBottom: '12px' }}
      >
        <Sidebar notify={notifyDict} />
      </div>
      <div
        className={`flex-grow flex justify-center items-end px-3 ${
          sidebarOpen ? 'opacity-50 lg:opacity-100' : 'opacity-100'
        }`}
      >
        <Content notify={notifyDict} />
      </div>
      <div className="absolute top-4 left-4 lg:hidden">
        <button
          className="text-gray-900 bg-slate-200 p-1.5 rounded-lg hover:bg-slate-300 focus:outline-none"
          onClick={toggleSidebar}
        >
          <IconMenu2 className="w-6 h-6 text-gray-500 stroke-2" />
        </button>
      </div>
      <div className="absolute top-4 right-4 rounded-lg">
        <EllipsisMenu setOpenSetting={setOpenSetting} setOpenAbout={setOpenAbout} />
        
      </div>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-10 lg:opacity-0"
          onClick={toggleSidebar}
        ></div>
      )}
     
    </div>
  );
}

export default Home;
