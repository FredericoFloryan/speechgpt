import BlubIcon from './Icons/BlubIcon';
import RightTriangleIcon from './Icons/RightTriangleIcon';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Card from './mycom/card';

function Tips() {
  const { i18n } = useTranslation();

  return (
    <div className="flex flex-col items-start justify-center h-full">
      <div className="flex flex-col items-start justify-center space-y-2">
        <div className="lex flex-row items-center space-x-2 pb-2">
          <BlubIcon className="w-8 h-8 text-gray-800" />
          <div className="text-xl font-medium text-gray-800">{i18n.t('common.tips') as string}</div>
        </div>
        <div className="text-gray-800 leading-7 flex flex-row">
          <RightTriangleIcon className="w-7 h-7 text-gray-800 shrink-0" strokeWidth="1.5" />
          <div>
            <span className="border w-min inline py-0.5 px-2 border-gray-700 rounded-md">
              Shift
            </span>
            +&nbsp;
            <span className="border w-min inline py-0.5 px-2 border-gray-700 rounded-md">
              Enter
            </span>
            &nbsp; {i18n.t('tips.tips3a') as string}&nbsp;
            <span className="border w-min inline py-0.5 px-2 border-gray-700 rounded-md">
              Enter
            </span>
            &nbsp; {i18n.t('tips.tips3b') as string}
          </div>
        </div>
        <Card
          title="local food"
          description="you are talking with your friend about the hong kong local food. let have a friendly conversation"
        ></Card>
        <Card
          title="movie"
          description="you are talking with your friend about the hong kong movie. let have a friendly conversation"
        ></Card>
        <Card
          title="music"
          description="Now is a time to practice English, assuming you are an English native speaker and I am practicing English conversation. Let's say that we are in a café and we have a friendly and harmonious conversation to practice English.
          can you please start the conversation?"
        ></Card>
      </div>
    </div>
  );
}

export default Tips;
