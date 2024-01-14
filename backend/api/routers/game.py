from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from orjson import dumps

from os import urandom


class WSManger():
    ws: list[WebSocket]

    def __init__(self) -> None:
        self.ws = []

    async def broadcast(self, message: str):
        for ws in self.ws:
            await ws.send_text(message)

    async def join(self, ws: WebSocket):
        self.ws.append(ws)
        await ws.send_text(dumps({
            "type": "NAME",
            "data": urandom(32).hex()
        }).decode())

    async def exit(self, ws: WebSocket):
        self.ws.remove(ws)
        await self.broadcast("{\"type\": \"UPDATE\"}")


game_list: dict[str, WSManger] = {}

router = APIRouter(
    prefix="/game",
    tags="Game"
)


@router.websocket("/{game_id}")
async def websocket(game_id: str, ws: WebSocket):
    game = game_list.get(game_id)
    if game is None:
        game = WSManger()
        game_list[game_id] = game
    await ws.accept()
    await game.join(ws)
    try:
        while True:
            message = await ws.receive_text()
            await game.broadcast(message)
    except WebSocketDisconnect:
        await game.exit(ws)
        if len(game.ws) == 0:
            del game_list[game_id]
