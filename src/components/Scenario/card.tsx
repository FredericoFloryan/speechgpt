import React, { useState } from 'react';
import './card.css';
import { useSessionStore } from '../../store/module';
import { chatDB } from '../../db';
import useSenarioStore from './senarioModel';
import useContentStore from './messageModel';

interface CardProps {
  title: string;
  description: string;
  imageSrc: string;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ title, description, onClick }) => {
  const { isChoosedSenario, ChooseSenario, RemoveSenario } = useSenarioStore();
  const { sendMessages, setSendMessages } = useContentStore();

  const handleSetSenario = async () => {
    if (isChoosedSenario) {
      return;
    }
    const senario_json = {
      role: 'user',
      content: description,
      sessionId: currentSessionId,
    };
    chatDB.chat.add(senario_json);
    setSendMessages(true);
    ChooseSenario();
  };
  const { currentSessionId, sessions, addSession, setCurrentSessionId, setMessageCount } =
    useSessionStore();
  return (
    <button onClick={() => handleSetSenario()}>
      <div className="card">
        <div className="card-content">
          <h2 className="card-title">{title}</h2>
          <p className="card-description">{description}</p>
        </div>
      </div>
    </button>
  );
};

export default Card;
