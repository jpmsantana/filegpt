const fs = require('fs');
const axios = require('axios');
require('dotenv').config();

async function sendToChatGPT(apiKey, fileContent, prompt) {
    const extraPrompt = "Always return the full file without extra comments or context. ONLY the updated file content. Any comments necessary can be added in comments inside the file. Avoid changes that were not asked by the user.";
    const requestBody = {
        model: "gpt-4",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: `${prompt}\n${extraPrompt}\n\n${fileContent}` }
        ]
    };

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', requestBody, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error sending request to ChatGPT:', error.response ? error.response.data : error.message);
        throw error;
    }
}

async function replaceContent(filePath, prompt) {
    if (!filePath || !prompt) {
        console.error('Usage: node filegpt.js replace <file_path> <prompt>');
        process.exit(1);
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        console.error('Missing OPENAI_API_KEY in environment variables.');
        process.exit(1);
    }

    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const responseContent = await sendToChatGPT(apiKey, fileContent, prompt);
        fs.writeFileSync(filePath, responseContent);
        console.log('File updated successfully.');
    } catch (error) {
        console.error('Error processing file:', error.message);
    }
}

async function getResponse(filePath, prompt) {
    if (!filePath || !prompt) {
        console.error('Usage: node filegpt.js get <file_path> <prompt>');
        process.exit(1);
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        console.error('Missing OPENAI_API_KEY in environment variables.');
        process.exit(1);
    }

    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const responseContent = await sendToChatGPT(apiKey, fileContent, prompt);
        console.log(responseContent); 
    } catch (error) {
        console.error('Error processing file:', error.message);
    }
}

async function main() {
    const [command, filePath, prompt] = process.argv.slice(2);
    
    switch (command) {
        case 'replace':
            await replaceContent(filePath, prompt);
            break;
        case 'get':
            await getResponse(filePath, prompt);
            break;
        default:
            console.error('Invalid command. Usage: node filegpt.js <command> <file> <prompt>. Available commands: replace, get');
            process.exit(1);
    }
}

main();
