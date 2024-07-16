# Typetalk ファイルエクスポート

## つかいかた

### Typetalk ボットの作成

https://www.typetalk.com/ja/blog/post-a-message-to-typetalk-using-a-bot/#i  
ファイルをエクスポートしたいトピックに対して、上記URLを参考にボットを作成する  
APIスコープは「topic.read」のみとする  
Typetalk Tokenをメモする

### スクリプト実行

* このリポジトリをcloneする
    ```
    git clone git@github.com:nrakuyama/typetalk-export.git
    cd typetalk-export
    ```
* 初期設定を行う
    ```
    npm i
    ```
* コマンドを実行する
    ```
    node export-files.js -c attachments.csv -t メモしたボットのトークン -o ./output
    ```
