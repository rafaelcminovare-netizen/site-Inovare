# Plano de Correção de Imagens para Vercel

## Problema Identificado
O projeto funciona localmente (Windows - case-insensitive) mas as imagens quebram no Vercel (Linux - case-sensitive). Além disso, há caminhos com espaços e caracteres especiais que precisam de codificação correta.

## Análise dos Arquivos

### Pastas de Imagens Existentes:
- `static/images/` - 20 arquivos
- `static/img/` - 6 arquivos (logos das marcas)

### Problemas Encontrados:

#### 1. `app.py` - Caminhos com case diferente dos arquivos reais
- `'img/Logo Condor.png'` → arquivo existe como `img/Logo Condor.png` ✅ (mas referenciado em código como minúsculo)
- `'img/Logo Krona.png'` → arquivo existe como `img/Logo Krona.png` ✅
- `'img/Logo Hidronorth (1).png'` → arquivo existe como `img/Logo Hidronorth (1).png` ✅
- `'img/Logo quartzolit.png'` → arquivo existe como `img/Logo quartzolit.png` ✅
- `'img/Logo Starret.png'` → arquivo existe como `img/Logo Starret.png` ✅
- `'img/Logo Viqua (1).png'` → arquivo existe como `img/Logo Viqua (1).png` ✅

#### 2. `static/css/style.css` - Background com espaços
- `/static/images/Banner%20atualizado.png` → arquivo `static/images/Banner atualizado.png` ✅

#### 3. `templates/index.html` - Banner hero
- `/static/images/capa-site-atualizado.png` → arquivo existe ✅

#### 4. `index.html` (raiz)
- `/static/images/logo-inovare.jpg` → arquivo existe ✅

## Plano de Correção

### Ação 1: Padronizar nomes de arquivos para minúsculos (opcional mas recomendado)
Criar cópias dos arquivos com nomes minúsculos e sem espaços:
- `Banner atualizado.png` → `banner-atualizado.png`
- `Logo Inovare.jpg` → `logo-inovare.jpg`
- `condor logo.jpg` → `condor-logo.jpg`
- `Grupo Krona logo.webp` → `grupo-krona-logo.webp`
- `região de atuação.png` → `regiao-de-atuacao.png`
- `regiao de atuacao.png.png` → `regiao-de-atuacao.png` (ou remover duplicata)
- `viqua logo.webp` → `viqua-logo.webp`
