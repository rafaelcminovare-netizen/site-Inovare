# Inovare Representações Comerciais - HTTPS Flask ✅

Site institucional refatorado com **Flask backend + HTTPS**.

## 🚀 Rodar HTTPS Local

```bash
cd c:/Users/rafae/OneDrive/Desktop/site-Inovare

# Dependências
py -m pip install -r requirements.txt cryptography

# Iniciar servidor
py app.py
```

**URL: https://127.0.0.1:5000**  
*(Aceite aviso de certificado no navegador)*

## 🌐 Funcionalidades
| Rota | Descrição |
|------|-----------|
| `/` | Home com marcas dinâmicas |
| `/privacidade` | Política LGPD completa |
| `/catalogo/condor` | Catálogo com produtos mock |
| POST `/contato` | Form com validação/anti-spam |

**Responsive + animações premium implementadas.**

## 🏗️ Estrutura
```
├── app.py           # Flask + HTTPS + dados mock
├── templates/       # Jinja2: index.html, catalogo.html...
├── static/          # CSS premium, JS, logo.svg
├── requirements.txt # Flask>=2.3.0
└── README.md/TODO.md
```

## 🔧 Customizar
- **Marcas/produtos**: Edite `brands` e `get_products()` em app.py
- **Design**: `static/css/style.css`
- **Email form**: Adicione smtplib em `/contato`

## ⚠️ Produção
Use Gunicorn + Nginx/Apache + Let's Encrypt SSL (não dev server).

**Site pronto para uso!** 🎉
