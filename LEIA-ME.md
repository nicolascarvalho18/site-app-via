# AppVia - site

## Arquivos

- `index.html`: a pagina, com cada secao marcada por um comentario `# NOME DA SECAO`
- `css/style.css`: todo o visual, com as mesmas marcacoes `#`
- `js/main.js`: menu do celular, efeitos 3D e formulario
- `img/`: pasta para as capturas reais dos seus apps

## Como abrir

Abra o `index.html` no navegador. Nao precisa instalar nada.
A fonte (Manrope) vem do Google Fonts, entao precisa de internet para aparecer.

## Antes de publicar, troque

1. **WhatsApp**: configure a variavel `WHATSAPP` em `js/main.js` com o número comercial real (DDI + DDD). Enquanto ela estiver vazia, o formulário bloqueia o envio para evitar contatos demonstrativos.
2. **E-mail e telefone**: atualize os textos de contato em `index.html` antes de publicar. A interface indica que esses canais ainda estão em configuração.
3. **Precos**: secao `# PLANOS E PRECOS` em `index.html`.
4. **Telas do Pet Go**: as duas telas do hero sao desenhadas em codigo, com conteudo de exemplo.
   Para usar capturas reais, coloque as imagens em `img/` e siga o comentario `CELULARES DO HERO` no `index.html`.
5. **Logo**: o simbolo foi redesenhado em vetor (bloco `# ICONES E LOGO`). Se tiver o arquivo oficial, substitua ali.

## Cores da marca

Ficam no topo de `css/style.css`, no bloco `# CORES, FONTES E MEDIDAS DA MARCA`.

## Como publicar

Envie a pasta inteira para qualquer hospedagem de site estatico (Vercel, Netlify, Hostinger, GitHub Pages).

## Observacao

Os tres projetos do portfolio sao conceitos demonstrativos, com dados ficticios.
