# -*- coding: utf-8 -*-

import requests
from requests.exceptions import HTTPError
import pytest


from smart_sauna_map.search_sauna import search_sauna, Sauna, _request, _sub_request


def read_html(filename):
    with open(f"./tests/data/{filename}.html", "r") as f:
        text = f.read()
    return text


def mock_response(status_code: int = 404):
    r = requests.models.Response()
    r.status_code = status_code
    return r


class TestSearchSauna:
    @pytest.mark.parametrize("keyword", ["新宿"])
    @pytest.mark.parametrize("prefecture", ["tokyo"])
    @pytest.mark.parametrize("page_index", [1])
    def test(self, mocker, keyword, prefecture, page_index):
        mocker.patch("smart_sauna_map.search_sauna._request", return_value=read_html("shinjuku"))
        search_sauna(keyword, prefecture, page_index)[0]

    def test_type(self, mocker):
        mocker.patch("smart_sauna_map.search_sauna._request", return_value=read_html("shikiji"))
        out = search_sauna(keyword="サウナしきじ", prefecture="shizuoka", page_index=1)[0]
        assert isinstance(out, Sauna)

    def test_name(self, mocker):
        mocker.patch("smart_sauna_map.search_sauna._request", return_value=read_html("shikiji"))
        expected = Sauna(name="サウナしきじ", address="静岡県静岡市駿河区敷地2丁目25-1", ikitai=7255)
        actual = search_sauna(keyword="サウナしきじ", prefecture="shizuoka", page_index=1)[0]
        assert actual.name == expected.name

    def test_address(self, mocker):
        mocker.patch("smart_sauna_map.search_sauna._request", return_value=read_html("shikiji"))
        expected = Sauna(name="サウナしきじ", address="静岡県静岡市駿河区敷地2丁目25-1", ikitai=7255)
        actual = search_sauna(keyword="サウナしきじ", prefecture="shizuoka", page_index=1)[0]
        assert actual.address == expected.address

    def test_ikitai(self, mocker):
        mocker.patch("smart_sauna_map.search_sauna._request", return_value=read_html("shikiji"))
        expected = Sauna(name="サウナしきじ", address="静岡県静岡市駿河区敷地2丁目25-1", ikitai=7255)
        actual = search_sauna(keyword="サウナしきじ", prefecture="shizuoka", page_index=1)[0]
        assert actual.ikitai == expected.ikitai

    def test_get_200(self, mocker):
        mocker.patch(
            "smart_sauna_map.search_sauna._sub_request", return_value=mock_response(200)
        )
        search_sauna(keyword="サウナしきじ", prefecture="shimane", page_index=1)

    def test_get_404(self, mocker):
        mocker.patch(
            "smart_sauna_map.search_sauna._sub_request", return_value=mock_response(404)
        )
        with pytest.raises(HTTPError):
            search_sauna(keyword="サウナしきじ", prefecture="tottori", page_index=1)
