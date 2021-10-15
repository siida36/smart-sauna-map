from typing import Optional

from flask import Flask, jsonify, make_response, request
from flask_cors import CORS  # type: ignore

app = Flask(__name__, static_folder="./build/static", template_folder="./build")
CORS(app)  # Cross Origin Resource Sharing


@app.route("/", methods=["GET", "POST"])
def index():
    query: Optional[str] = request.get_json()["query"]
    return make_response(jsonify(echo_request(query)))


@app.after_request
def after_request(response):
    # response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
    return response


def echo_request(query):
    return [
        {"id": 0, "text": query},
    ]


def return_sample_response():
    return [
        {"id": 0, "text": "Hello, Smart Sauna Map!"},
    ]


if __name__ == "__main__":
    app.run(debug=True)
