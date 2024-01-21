import os
from dotenv import load_dotenv

from fastapi.middleware.cors import CORSMiddleware
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_openai import ChatOpenAI


print(os.getenv('OPENAI_API_KEY'))

llm = ChatOpenAI()
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are world class technical documentation writer."),
    ("user", "{input}")
])
output_parser = StrOutputParser()

chain = prompt | llm | output_parser
print(chain.invoke({"input": "how can langsmith help with testing?"}))