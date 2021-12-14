# smart-sauna-map

## 以前の作品

https://github.com/siida36/spa-boot-camp

## Sauna search server の立て方

このアプリはバックエンドにサウナ検索サーバー (Sauna search server) を設置し、そこに地名などを問い合わせることで周辺のサウナ情報を取得します。
以下は開発時のサーバーの立て方です。プロダクション時には別途方法を示します。

1. server ディレクトリに移動します。

    ```shell
    cd server
    ```

1. poetry を使って動作に必要なパッケージをインストールします。

    ```shell
    poetry install
    ```

1. poetry の仮想環境を立ち上げます。

    ```shell
    poetry shell
    ```

1. 開発用 Python サーバーを立ち上げます。

    ```shell
    python src/smart_sauna_map/server.py
    ```
