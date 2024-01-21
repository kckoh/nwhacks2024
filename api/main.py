from typing import Union

from fastapi import FastAPI, Request
from pydantic import BaseModel
from typing import Dict, Optional
from langchain_openai import ChatOpenAI
import os
from dotenv import load_dotenv

from fastapi.middleware.cors import CORSMiddleware
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

llm = ChatOpenAI()
prompt = ChatPromptTemplate.from_messages([
    ("system", """
     Here is a Pollutant concentration in μg/m3:
     Qualitative name	Index	Pollutant concentration in μg/m3
    SO2	NO2	PM10	PM2.5	O3	CO
    Good	1	[0; 0)	[0; 0)	[0; 0)	[0; 0)	[0; 0)	[0; 0)
    Fair	2	[0; 80)	[0; 70)	[0; 50)	[0; 25)	[0; 100)	[0; 9400)
    Moderate	3	[80; 250)	[70; 150)	[50; 100)	[25; 50)	[100; 140)	[9400-12400)
    Poor	4	[250; 350)	[150; 200)	[100; 200)	[50; 75)	[140; 180)	[12400; 15400)
    Very Poor	5	⩾350	⩾200	⩾200	⩾75	⩾180	⩾15400)
     You will be given some pollutants. Please tell me the each given pollutant with the concentration in μg/m3. 
     And filter out anything that isn't good pollutant.
    Give at least one ourdoor activity suggestion based on the filtered pollutants.
     """),
    ("user", "{input}")
])
output_parser = StrOutputParser()

chain = prompt | llm | output_parser


app = FastAPI()

origins = [

    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class Item(BaseModel):
    name: str
    price: float
    is_offer: Union[bool, None] = None

class AirQualityData(BaseModel):
    components: Dict[str, float]
    aqi: int
class Weather(BaseModel):
    pass



@app.post("/air_quality")
async def get_air_quality(request: Request):
    try:
        # Access the raw request body as JSON
        body = await request.json()
        print(body)
        print(chain.invoke({"input": body}))
    


        
        return {"raw_body": body}
    except Exception as e:
        # Handle the exception or error that occurred while accessing the raw body
        return {"error": str(e)}
    
@app.post("/summary")
async def get_air_quality(request: Request):
    try:
        # Access the raw request body as JSON
        body = await request.json()
        print(body)
        chatgpt_summary = chain.invoke({"input": body})
    


        
        return {"summary": chatgpt_summary}
    except Exception as e:
        # Handle the exception or error that occurred while accessing the raw body
        return {"error": str(e)}
    


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


@app.put("/items/{item_id}")
def update_item(item_id: int, item: Item):
    return {"item_name": item.name, "item_id": item_id}