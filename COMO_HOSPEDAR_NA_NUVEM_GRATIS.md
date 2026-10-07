# Como Deixar o MovveFind Rodando 24h na Nuvem (100% Grátis)
### Sem precisar do seu computador ligado e funcionando para qualquer pessoa do mundo!

O motor de busca do Google Maps agora faz varredura profunda:
- **Busca profunda em bairros e sub-regiões**: encontra dezenas de comércios locais sem site oficial.
- **Detecção cirúrgica**: identifica empresas com site desativado do Google (`business.site`), que usam apenas Instagram/Facebook/WhatsApp ou guias locais (Yelp, Guias).
- **Rotação dinâmica e contínua**: cada busca e cada pessoa recebem resultados variados e frescos, sem repetir sempre os mesmos 12 comércios.
- **Totalmente preparado para a nuvem**: o frontend e a API serverless rodam 24/7 sem consumir sua máquina.

---

## 🚀 Opção 1: Vercel (Recomendado - 2 minutos, 100% Grátis)

O Vercel é a melhor plataforma para este projeto: ele hospeda o site e roda a API do Google Maps 24 horas por dia gratuitamente.

### Passo 1: Enviar o código atualizado para o GitHub
Abra o terminal nesta pasta (`C:\Users\berna\OneDrive\Documentos\AcharCliente`) e execute:

```bash
git push -u origin main --force
```

*(O repositório já está configurado no seu GitHub: `https://github.com/titovitorlopes-rgb/MovvaWeb.git`)*.

### Passo 2: Publicar no Vercel
1. Acesse [vercel.com](https://vercel.com) e entre com sua conta do GitHub.
2. Clique no botão **"Add New..."** ➔ **"Project"**.
3. Escolha o repositório **MovvaWeb** (ou o nome que estiver no seu GitHub).
4. Clique em **"Deploy"** (não precisa alterar nenhuma configuração, o `vercel.json` e a pasta `api/` já estão 100% configurados).
5. Pronto! O Vercel gera um link como:
   👉 `https://movvaweb.vercel.app` (ou o nome que você escolher)

Qualquer pessoa do mundo pode abrir esse link pelo celular ou computador, a qualquer hora do dia ou da noite. **Seu computador pode ficar 100% desligado.**

---

## 🌐 Opção 2: Render.com (Servidor Web Alternativo)

Se preferir o Render:
1. Acesse [render.com](https://render.com).
2. Clique em **"New Web Service"** e conecte seu repositório.
3. **Build Command**: `npm install`
4. **Start Command**: `node server.js`
5. Selecione o plano **Free** e clique em **Deploy**.

---

## 💻 Teste Local no seu Computador
Para testar no seu PC antes de enviar para a nuvem:
1. Dê dois cliques em `Iniciar_Robo_AcharCliente.bat`.
2. O navegador abrirá em `http://localhost:3000`.
