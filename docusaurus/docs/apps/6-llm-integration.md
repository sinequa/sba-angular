---
layout: default
title: LLM Integration
parent: Applications
nav_order: 6
---

# Large Language Models Integration

The SBA Framework **LLM Integration** is available in a separate branch [`chatgpt-integration`](https://github.com/sinequa/sba-angular/tree/chatgpt-integration) of the SBA respository.

Please read the documentation of the [Sinequa Retrieval Augmented Generation](https://github.com/sinequa/Sinequa-Retrieval-Augmented-Generation) repository for guidance on how to set up the necessary plugins and configuration on your Sinequa server.

![LLM Integration](/assets/apps/llm-integration.png)

This application is a customization of [Vanilla Search](2-vanilla-search.md) in which a chat component (`sq-chat` from [`@sinequa/components/machine-learning`](../libraries/components/machine-learning.md)) is used to interact with a Large-Language Model (LLM), such as GPT-4, the model powering the popular [ChatGPT](https://chat.openai.com/).

This application is not meant to be used as-is, but rather as a set of examples to understand how to integrate a LLM in a Sinequa application for various use cases:

- **Retrieval Augmented Generation** (RAG): the LLM is fed with search results and prompted to generate an answer to the user query, along with a summary of the documents.
- Query intent detection: the LLM takes a search query from the user, rephrases it and automatically applies filters.
- Document summarization: the LLM summarizes a set of passages extracted from a document.
- Entity extraction: the LLM generates a graph of entities from a set of passages extracted from a document.
- Translation: the LLM translates a search query from one language to another.
- Personnalized greeting: the LLM generates a greeting message based on the user's information.

