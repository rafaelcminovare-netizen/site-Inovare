# Inovare Representações Comerciais

Projeto com site institucional em HTML/CSS/JS e backend Python Flask.

## Como rodar

1. Abra o terminal em `c:\Users\rafae\Desktop\site Inovare`
2. Instale o Flask (se ainda não tiver):
   ```powershell
   py -m pip install -r requirements.txt
   ```
   Se o comando `py` não funcionar, tente:
   ```powershell
   python -m pip install -r requirements.txt
   ```
3. Inicie o servidor Flask:
   ```powershell
   py app.py
   ```
   Ou, se `py` não estiver disponível:
   ```powershell
   python app.py
   ```
4. Acesse no navegador:
   ```text
   http://127.0.0.1:5000
   ```

> Se os comandos `python` ou `py` não funcionarem, instale o Python 3 e marque a opção para adicioná-lo ao PATH durante a instalação.

## Observações

- `index.html` raiz é uma versão estática do site para visualização direta.
- O backend Flask usa os arquivos em `templates/` e `static/`.
- Para editar o site, abra `templates/index.html`, `static/css/style.css` e `static/js/script.js`.
- Adicione a imagem da empresa em `static/images/empresa.jpg` para que o banner de apresentação apareça.
