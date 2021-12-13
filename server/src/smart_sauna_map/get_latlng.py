import argparse
import ast
from subprocess import PIPE, run
from typing import Dict
from urllib.parse import quote


def main(query: str) -> Dict[str, float]:
    """Return a dict has "lat" and "lng" key."""
    k = "AIzaSyAKgfFFzNoefYAPVemrJFypwlvL14rbKGc"
    parameter = f"address\={quote(query)}\&region\=ja\&key\={k}"
    url = f"https://maps.googleapis.com/maps/api/geocode/json\?{parameter}"
    cmd = f"curl {url}"
    res_byte = run(cmd, shell=True, stdout=PIPE, stderr=PIPE)
    res_dict = ast.literal_eval(res_byte.stdout.decode("utf-8"))
    return res_dict["results"][0]["geometry"]["location"]


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("query", type=str)
    args = parser.parse_args()
    main(args.query)
