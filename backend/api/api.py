from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from uvicorn import Config, Server

from config import API_ROOT_PATH, HOST, PORT

from .routers import (
    game_router
)

app = FastAPI(
    # openapi_url=f"{API_ROOT_PATH}/openapi.json",
    # docs_url=f"{API_ROOT_PATH}/docs",
    root_path=API_ROOT_PATH,
)

app.include_router(game_router)

origins = [
    "http://localhost:3000",
    "*",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def run_api():
    config = Config(
        app=app,
        host=HOST,
        port=PORT
    )
    server = Server(config)
    await server.serve()
