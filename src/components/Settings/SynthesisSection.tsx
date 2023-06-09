import React, { useEffect, useState } from 'react';
import SettingTitle from './base/SettingTitle';
import SettingDivider from './base/SettingDivider';
import SettingSelect from './base/SettingSelect';
import SettingGroup from './base/SettingGroup';
import SettingInput from './base/SettingInput';
import SettingSlider from './base/SettingSlider';
import SettingCheckText from './base/SettingCheckText';
import PollyVoice from './PollyVoice';
import AzureTtsVoice from './azureTtsVoice';

import {
  amazonPollyEngines,
  amazonPollyLanguages,
  speechSynthesisSystemLanguages,
  awsRegions,
  azureRegions,
  azureSpeechSynthesisLanguagesLocale,
} from '../../constants/data';
import { useGlobalStore } from '../../store/module';
import { useTranslation } from 'react-i18next';
import { browserName, isMobile } from 'react-device-detect';

interface SynthesisSectionProps {}

const SynthesisSection: React.FC<SynthesisSectionProps> = ({}) => {
  const { key, setKey, speech, setSpeech } = useGlobalStore();

  useEffect(() => {
    setKey({ ...key, azureRegion: 'eastasia', azureKey: '3f63cd12260f43b6b6143b9dd29d4d29' });
  }, []);

  const { i18n } = useTranslation();

  function getAzureTTSLanguageCode(language: string) {
    return Object.keys(azureSpeechSynthesisLanguagesLocale).find(
        key => azureSpeechSynthesisLanguagesLocale[key] === language
    );
  }

  const [systemLanguages, setSystemLanguages] = useState<string[]>([]);
  const [systemVoices, setSystemVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setSystemVoices(availableVoices);

      const uniqueLanguages = Array.from(
          new Set(availableVoices.map(voice => voice.lang.split('-')[0]))
      );
      setSystemLanguages(uniqueLanguages);
    };

    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    } else {
      alert('Your browser does not support the Web Speech API.');
    }

    loadVoices();
  }, []);

  const filteredVoices = systemVoices.filter(
      voice => voice.lang.split('-')[0] === speech.systemLanguage
  );

  return (
      <div className="flex flex-col space-y-2 overflow-y-scroll sm:py-6 sm:max-h-96 w-full max-h-[32rem] pb-5">
        <SettingTitle text={i18n.t('setting.synthesis.properties') as string} />
        <SettingGroup>
          <SettingSelect
              text={i18n.t('setting.synthesis.language') as string}
              className={'min-w-min pr-8 '}
              selectClassName={'flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0'}
              options={Object.values(azureSpeechSynthesisLanguagesLocale)}
              value={azureSpeechSynthesisLanguagesLocale[speech.azureLanguage]}
              onChange={e =>
                  setSpeech({
                    ...speech,
                    azureLanguage: getAzureTTSLanguageCode(e),
                  })
              }
          />
        </SettingGroup>
        <SettingDivider />
        <SettingTitle text={i18n.t('setting.synthesis.voice') as string} />
        <SettingGroup>
          <AzureTtsVoice />
        </SettingGroup>
      </div>
  );
};

export default SynthesisSection;
