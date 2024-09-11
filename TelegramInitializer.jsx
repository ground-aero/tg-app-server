import React, { useEffect } from 'react';

const TelegramInitializer = () => {
  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();
  }, []);

  return null;
};

export default TelegramInitializer;