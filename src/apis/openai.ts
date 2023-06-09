export default async function sendRequest(
  messages: string[],
  openaiApiKey: string,
  openaiHost: string,
  openaiModel: string,
  callback: (data: any) => void
) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.VITE_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo', // Specify which transformer model we're gonna use
      messages: messages,
    }),
  };

  const openaiHostAddress = `${process.env.VITE_OPENAI_HOST}`;

  fetch('https://' + openaiHostAddress + '/v1/chat/completions', requestOptions)
    .then(response => response.json())
    .then(data => {
      callback(data);
    })
    .catch(err => {
      return err;
    });
}
