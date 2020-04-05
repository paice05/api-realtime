const formatMessages = (username, text) => {
  return {
    id: Math.floor(Math.random() * 9999),
    username,
    text,
    time: new Date()
  };
};

module.exports = formatMessages;
