from flask import Flask, render_template, request, flash, redirect, url_for

app = Flask(__name__)
app.secret_key = 'inovare_secret_key_change_in_prod_2024'

# Mock data for brands (based on existing catalogo/ folders)
brands = {
    'condor': {
        'name': 'Condor',
        'description': 'Ferramentas elétricas profissionais para construção e reforma.',
        'image': 'img/Logo Condor.png',
        'catalog_url': '/static/catalogos/condor catalogo atualizado.pdf'
    },
    'grupo-krona': {
        'name': 'Krona',
        'description': 'Tubos, conexões e sistemas hidráulicos de alta performance.',
        'image': 'img/Logo Krona.png',
        'catalog_url': '/static/catalogos/krona catalogo atualizado.pdf'
    },
    'hidronorth': {
        'name': 'Hidronorth',
        'description': 'Soluções completas em hidráulica e saneamento.',
        'image': 'img/Logo Hidronorth (1).png',
        'catalog_url': 'https://www.hydronorth.com.br/categoria/28/resinas.html'
    },
    'quartzolit': {
        'name': 'Quartzolit',
        'description': 'Impermeabilizantes e aditivos para concreto de referência.',
        'image': 'img/Logo quartzolit.png',
        'catalog_url': '/static/catalogos/quartzolit catalogo atualizado.pdf'
    },
    'starrett': {
        'name': 'Starrett',
        'description': 'Ferramentas de precisão e medição de alta qualidade.',
        'image': 'img/Logo Starret.png',
        'catalog_url': '/static/catalogos/starrett catalogo atualizado.pdf'
    },
    'viqua': {
        'name': 'Viqua',
        'description': 'Sistemas de purificação de água UV líder mundial.',
        'image': 'img/Logo Viqua (1).png',
        'catalog_url': '/static/catalogos/viqua.pdf'
    }
}

# Mock products data for each brand
def get_products(brand_slug):
    products_data = {
        'condor': [
            {'name': 'Furadeira de Impacto', 'summary': 'Furadeira potente com função percussão para alvenaria.'},
            {'name': 'Parafusadeira', 'summary': 'Parafusadeira de alto torque com bateria 18V.'},
            {'name': 'Lixadeira Angular', 'summary': 'Lixadeira para corte e desbaste em diversos materiais.'}
        ],
        'grupo-krona': [
            {'name': 'Tubos PPR 2ª Geração', 'summary': 'Tubos para água quente/fria de alta durabilidade.'},
            {'name': 'Conexões Esgoto', 'summary': 'Conexões com vedação perfeita para sistemas de esgoto.'},
            {'name': 'Registro Gaveta', 'summary': 'Registros para controle preciso do fluxo.'}
        ],
        'hidronorth': [
            {'name': 'Válvulas Esfera', 'summary': 'Válvulas para sistemas hidráulicos industriais.'},
            {'name': 'Tubos CPVC', 'summary': 'Tubos resistentes a corrosão e altas temperaturas.'}
        ],
        'quartzolit': [
            {'name': 'Quartzolit Impermeabilizante', 'summary': 'Impermeabilização de lajes e reservatórios.'},
            {'name': 'Aditivo Quartzolit', 'summary': 'Melhora resistência e trabalhabilidade do concreto.'}
        ],
        'starrett': [
            {'name': 'Paquímetro Digital', 'summary': 'Medição precisa até 150mm, resolução 0.01mm.'},
            {'name': 'Micrômetro', 'summary': 'Medidas externas com precisão excepcional.'}
        ],
        'viqua': [
            {'name': 'VH200 UV', 'summary': 'Desinfecção UV para residências (1-4 pessoas).'},
            {'name': 'VH410 UV', 'summary': 'Sistema UV para maiores vazões residenciais.'}
        ]
    }
    return products_data.get(brand_slug, [])

@app.route('/')
def home():
    return render_template('index.html', brands=brands)

@app.route('/contato')
def contato():
    return render_template('contato.html')

@app.route('/contatos')
def contatos():
    return render_template('contato.html')

@app.route('/privacidade')
def privacidade():
    return render_template('privacidade.html')

@app.route('/catalogo/<marca>')
def catalogo(marca):
    if marca not in brands:
        flash('Catálogo não encontrado. Volte para marcas.', 'error')
        return redirect(url_for('home'))
    brand = brands[marca]
    products = get_products(marca)
    return render_template('catalogo.html', brand=brand, products=products)

@app.route('/contato', methods=['POST'])
def contato_post():
    honeypot = request.form.get('honeypot', '')
    if honeypot:
        flash('Detecção de spam. Tente novamente.', 'error')
        return redirect(url_for('home') + '#contato')

    nome = request.form.get('nome', '').strip()
    email = request.form.get('email', '').strip()
    telefone = request.form.get('telefone', '').strip()
    mensagem = request.form.get('mensagem', '').strip()

    if nome and mensagem and (email or telefone):
        # TODO: Integrate real email (smtplib) in production
        flash('Obrigado! Mensagem recebida. Responderemos em breve.', 'success')
    else:
        flash('Preencha nome, mensagem e email ou telefone.', 'error')

    return redirect(url_for('home') + '#contato')

if __name__ == '__main__':
    print('🚀 Iniciando servidor HTTP Inovare...')
    print('🌐 Acesse: http://127.0.0.1:5000')
    print('✅ Servidor HTTP pronto (sem avisos de certificado).')
    print('🛑 Ctrl+C para parar')
    app.run(debug=True, host='127.0.0.1', port=5000)
