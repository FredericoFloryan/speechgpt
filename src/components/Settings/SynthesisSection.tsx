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
import SettingWarningText from './base/SettingWarningText';

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
import { existEnvironmentVariable } from '../../helpers/utils';

interface SynthesisSectionProps {}

const SynthesisSection: React.FC<SynthesisSectionProps> = ({}) => {
  const { key, setKey, speech, setSpeech } = useGlobalStore();
  useEffect(() => {
    if(speech.service !== 'Azure TTS') {
      setSpeech({ ...speech, service: 'Azure TTS' });
    }
  }, []);

  const { i18n } = useTranslation();

  const speechSynthesisServices = ['Azure TTS']

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

  useEffect(() => {
    if (!key.azureRegion) {
      setKey({ ...key, azureRegion: azureRegions[0] });
    }
  }, [key.azureRegion]);

  const filteredVoices = systemVoices.filter(
    voice => voice.lang.split('-')[0] === speech.systemLanguage
  );

  return (
    <div className="flex flex-col space-y-2 overflow-y-scroll sm:py-6 sm:max-h-96 w-full max-h-[32rem] pb-5">
      <SettingTitle text={i18n.t('setting.synthesis.service') as string} />
      <SettingGroup>
        {isMobile && (
          <SettingWarningText text={i18n.t('setting.synthesis.mobile-not-supported') as string} />
        )}
        {speech.service === 'Azure TTS' && (
          <>
            {existEnvironmentVariable('AZURE_REGION') && existEnvironmentVariable('AZURE_KEY') ? (
              <SettingCheckText
                text={i18n.t('setting.synthesis.azure-already-set-environment-variable') as string}
              />
            ) : (
              <>
                <SettingSelect
                  text={i18n.t('setting.synthesis.azure-region') as string}
                  options={azureRegions}
                  value={key.azureRegion}
                  selectClassName={
                    'flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0'
                  }
                  onChange={e => setKey({ ...key, azureRegion: e })}
                />
                <SettingInput
                  text={i18n.t('setting.synthesis.azure-access-key') as string}
                  id={i18n.t('setting.synthesis.azure-access-key-placeholder') as string}
                  type={'text'}
                  value={key.azureKey}
                  placeholder={'Azure Access Key'}
                  onChange={e => setKey({ ...key, azureKey: e })}
                />
              </>
            )}
          </>
        )}
      </SettingGroup>
      {speech.service === 'Azure TTS' && (
        <>
          <SettingDivider />
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
        </>
      )}
    </div>
  );
};

export default SynthesisSection;
