from orjson import dumps, loads, OPT_INDENT_2
from pydantic import BaseModel

from os.path import isfile


class Config(BaseModel):
    host: str = "0.0.0.0"
    port: int = 8080
    api_root_path: str = ""


config = Config()
key_num = len(config.model_dump().keys())
try:
    with open("config.json", "rb") as config_file:
        config_dict: dict = loads(config_file.read())
    config = Config(**config_dict)
    if len(config_dict.keys()) != key_num:
        raise RuntimeError()
except:
    with open("config.json", "wb") as config_file:
        config_file.write(dumps(
            config.model_dump(),
            option=OPT_INDENT_2
        ))

HOST = config.host
PORT = config.port
API_ROOT_PATH = config.api_root_path
