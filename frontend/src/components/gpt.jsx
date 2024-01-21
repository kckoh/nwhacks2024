import React, { useState, useEffect } from 'react';
import openai from 'openai';

const ChatGPTComponent = ({ prompt }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const generateResponse = async () => {
      try {
        const openaiApiKey = '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'; // Replace with your OpenAI API key
        const openaiApiEndpoint = 'https://api.openai.com/v1/engines/davinci/completions'; // Make sure to use the appropriate OpenAI API endpoint

        const openaiClient = new openai({ key: openaiApiKey });

        const response = await openaiClient.createCompletions({
          model: 'text-davinci-002', // Use the appropriate OpenAI model
          prompt,
          temperature: 0.7,
          max_tokens: 150,
        });

        setResponse(response.data.choices[0]?.text || 'No response');
        setLoading(false);
      } catch (error) {
        setError('Error generating response.');
        setLoading(false);
      }
    };

    generateResponse();
  }, [prompt]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {response && <p>{response}</p>}
    </div>
  );
};

export default ChatGPTComponent;
