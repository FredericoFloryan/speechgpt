export default async function checkGrammar(
    input: string,
    callback: (data: any) => void
) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            model: `${import.meta.env.VITE_OPENAI_MODEL}`,
            messages: [
                { "role": "system", "content": "correct grammar with minimal changes for {input}, if any." },
                { "role": "system", "content": "if {input} doesn't need to make any changes,  {output} = {input}" },
                { "role": "system", "content": "display only {output}, remove all other symbols" },
                { "role": "user", "content": input }
            ],
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
