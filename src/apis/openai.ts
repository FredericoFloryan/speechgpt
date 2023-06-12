export default async function sendRequest(
    messages: string[],
    callback: (data: any) => void
) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: `${import.meta.env.VITE_OPENAI_MODEL}`, // Specify which transformer model we're going to use
      messages: messages,
    }),
  };

  const openaiHostAddress = `${import.meta.env.VITE_OPENAI_HOST}`;

  fetch('https://' + openaiHostAddress + '/v1/chat/completions', requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        callback(data);
      })
      .catch(err => {
        console.error("A problem occurred while sending the request:", err);
      });
}
