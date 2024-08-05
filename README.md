# FileGPT File Updater

FileGPT File Updater is a command-line tool that takes a file and a prompt, sends the file content and the prompt to OpenAI's ChatGPT, receives the response, and replaces the file content with the response.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (Ensure you have Node.js installed)
- [OpenAI API Key](https://beta.openai.com/signup/)

### Steps

1. Clone the repository or download the files to your local machine.

2. Ensure you have your OpenAI API key defined on your environment variables:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

3. Make the `install.sh` script executable and run it:

```sh
chmod +x filegpt_install
./filegpt_install
```

This script will:
- Copy `filegpt` to `/usr/local/bin`.
- Add the `FILEGPT_ROOT` environment variable to your shell configuration file (`.zshrc` or `.bashrc`).

4. Restart your terminal or run `source ~/.zshrc` or `source ~/.bashrc` to apply the changes.

## Usage

To use the `filegpt` command, run:

```sh
filegpt <file_path> <prompt>
```

- `<file_path>`: Path to the file you want to update.
- `<prompt>`: Prompt to send to ChatGPT along with the file content.

### Example

```sh
filegpt /path/to/your/file.txt "Please improve the content of this file"
```

## Configurations

### Environment Variables

Ensure you have your OpenAI API key set on your environment variables:

```
OPENAI_API_KEY=your_openai_api_key_here
```
