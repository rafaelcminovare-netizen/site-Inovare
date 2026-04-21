import os
import re
import unicodedata

from flask import Flask, render_template, request, flash, redirect, url_for

app = Flask(__name__)
app.secret_key = 'inovare_secret_key_change_in_prod_2024'


def normalize_text(value):
    normalized = unicodedata.normalize('NFKD', value or '')
    ascii_text = normalized.encode('ascii', 'ignore').decode('ascii')
    ascii_text = ascii_text.lower()
    ascii_text = re.sub(r'[\(\)\[\]\{\}]', ' ', ascii_text)
    ascii_text = ascii_text.replace('-', ' ')
    ascii_text = re.sub(r'[^a-z0-9\s]', ' ', ascii_text)
    ascii_text = re.sub(r'\s+', ' ', ascii_text).strip()
    return ascii_text


def remove_all_extensions(filename):
    base_name = filename
    while True:
        next_base, extension = os.path.splitext(base_name)
        if not extension:
            return base_name
        base_name = next_base


def build_image_index():
    img_directory = os.path.join(app.static_folder, 'img')
    if not os.path.isdir(img_directory):
      return {}

    image_index = {}
    for filename in os.listdir(img_directory):
        normalized_name = normalize_text(remove_all_extensions(filename))
        if normalized_name and normalized_name not in image_index:
            image_index[normalized_name] = filename
    return image_index


def image_candidates(slug, brand_name):
    cleaned_name = re.sub(r'\s*\(.*?\)\s*', ' ', brand_name or '')
    candidates = [
        brand_name or '',
        cleaned_name,
        (slug or '').replace('-', ' '),
    ]

    normalized_candidates = []
    for candidate in candidates:
        normalized_candidate = normalize_text(candidate)
        if normalized_candidate and normalized_candidate not in normalized_candidates:
            normalized_candidates.append(normalized_candidate)

    return normalized_candidates


def resolve_brand_image(slug, brand_name, image_index):
    for candidate in image_candidates(slug, brand_name):
        if candidate in image_index:
            return f"img/{image_index[candidate]}"
    return ''


# Brands with external catalog URLs
brands = {
    'condor': {
        'name': 'Condor',
        'description': 'Ferramentas elétricas profissionais para construção e reforma.',
        'logo': 'condor logo.jpg',
        'catalog_url': 'https://condor.ind.br/produto/pintura-imobiliaria?page=5'
    },
    'grupo-krona': {
        'name': 'Grupo Krona',
        'description': 'Tubos, conexões e sistemas hidráulicos de alta performance.',
        'logo': 'Grupo Krona logo.webp',
        'catalog_url': 'https://www.krona.com.br/produtos/'
    },
    'hidronorth': {
        'name': 'HidroNorth',
        'description': 'Soluções completas em hidráulica e saneamento.',
        'logo': None,  # No logo file
        'catalog_url': 'https://www.hydronorth.com.br/produtos.html'
    },
    'quartzolit': {
        'name': 'Quartzolit (Saint-Gobain)',
        'description': 'Impermeabilizantes e aditivos para concreto de referência.',
        'logo': None,
        'catalog_url': 'https://www.quartzolit.weber/search-content'
    },
    'starrett': {
        'name': 'Starrett',
        'description': 'Ferramentas de precisão e medição de alta qualidade.',
        'logo': None,
        'catalog_url': 'https://starrett.com.br/'
    },
    'viqua': {
        'name': 'Viqua',
        'description': 'Sistemas de purificação de água UV líder mundial.',
        'logo': 'viqua logo.webp',
        'catalog_url': 'https://viqua.com.br/produtos/?ambiente[]=716'
    }
}

brand_image_index = build_image_index()

for slug, brand in brands.items():
    brand['image'] = resolve_brand_image(slug, brand.get('name', ''), brand_image_index)

@app.route('/')
def home():
    return render_template('index.html', brands=brands)

@app.route('/privacidade')
def privacidade():
    return render_template('privacidade.html')

@app.route('/catalogo/<marca>')
def catalogo(marca):
    if marca not in brands:
        flash('Catálogo não encontrado. Volte para marcas.', 'error')
        return redirect(url_for('home'))
    brand = brands[marca]
    # Redirect to external catalog
    if 'catalog_url' in brand:
        return redirect(brand['catalog_url'])
    flash('Catálogo não disponível.', 'error')
    return redirect(url_for('home'))

@app.route('/contato', methods=['GET', 'POST'])
def contato():
    if request.method == 'POST':
        honeypot = request.form.get('honeypot', '')
        if honeypot:
            flash('Detecção de spam. Tente novamente.', 'error')
            return redirect(url_for('home') + '#contato')

        nome = request.form.get('nome', '').strip()
        email = request.form.get('email', '').strip()
        telefone = request.form.get('telefone', '').strip()
        mensagem = request.form.get('mensagem', '').strip()

        if nome and mensagem and (email or telefone):
            flash('Obrigado! Mensagem recebida. Responderemos em breve.', 'success')
        else:
            flash('Preencha nome, mensagem e email ou telefone.', 'error')

if __name__ == '__main__':
    print('🚀 Iniciando servidor HTTPS Inovare...')
    print('🌐 Acesse: https://127.0.0.1:5000')
    print('⚠️  Certificado auto-assinado: prossiga no navegador.')
    print('🛑 Ctrl+C para parar')
    app.run(debug=True, host='127.0.0.1', port=5000, ssl_context='adhoc')
