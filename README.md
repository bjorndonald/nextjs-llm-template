This is a simple NextJS starter for a simple LLM Project with Langchain, AstraDB and Postgres.

## Getting Started

First, run the development server:

```bash
DATABASE_URL=postgres://<DATABASE_SERVER>:<DATABASE_PASSWORD>@<DATABASE_HOST>:<DATABASE_PORT>/<DATABASE_NAME>
SITE_URL=

ASTRA_DB_APPLICATION_TOKEN=<ASTRA_DB_APPLICATION_TOKEN>
ASTRA_DB_ENDPOINT=<ASTRA_DB_ENDPOINT>
ASTRA_DB_NAMESPACE=<ASTRA_DB_NAMESPACE>

OPENAI_API_KEY=<OPENAI_API_KEY>

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=
```

This uses Next Auth for authentication but I will use Auth0 later. I used Astra DB to store the vector embeddings. OpenAI for LLM.

