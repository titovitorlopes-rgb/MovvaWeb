# Como Deixar o MovveFind Rodando 24h na Nuvem (100% Grátis)
### Sem precisar do seu computador ligado e funcionando para qualquer pessoa!

O projeto agora foi totalmente otimizado:
- **Não usa mais Playwright nem Chromium pesado** (antes pesava no seu PC e caía toda hora).
- **Agora usa o motor direto de busca do Google Maps**: responde em 2 segundos e acha de 20 a 80+ clientes reais com telefone/WhatsApp por pesquisa.
- **Preparado para Serverless no Vercel e Render**: basta colocar na nuvem e você recebe um link fixo (ex: `https://seu-acharcliente.vercel.app`) que fica no ar para sempre.

---

## 🚀 Opção 1: Vercel (Recomendado - 2 minutos, 100% Grátis)

O Vercel é a melhor plataforma para hospedar este sistema: ele roda o frontend e a API serverless (`/api/search`) 24 horas por dia de graça.

### Passo a Passo:
1. Crie uma conta gratuita em [vercel.com](https://vercel.com) (se ainda não tiver).
2. Suba a pasta deste projeto para um repositório no seu [GitHub](https://github.com) (pode ser privado ou público).
3. No painel da Vercel, clique em **"Add New..."** ➔ **"Project"**.
4. Conecte sua conta do GitHub e selecione o repositório **AcharCliente**.
5. Clique em **"Deploy"** (não precisa alterar nenhuma configuração, o arquivo `vercel.json` e a pasta `api/` já foram configurados para você!).
6. Pronto! Em 30 segundos a Vercel vai gerar o seu link oficial:
   👉 `https://seu-projeto.vercel.app`

Você pode acessar desse link do seu celular, de outro computador, ou enviar para outras pessoas. **Seu computador pode ficar 100% desligado.**

---

## 🌐 Opção 2: Render.com (Servidor Web Gratuito)

Se você preferir um servidor Node.js convencional:
1. Crie uma conta em [render.com](https://render.com).
2. Clique em **"New Web Service"** e conecte seu repositório do GitHub.
3. Em **Build Command**, coloque: `npm install`
4. Em **Start Command**, coloque: `node server.js`
5. Selecione o plano **Free** e clique em **Deploy**.
6. O Render gerará uma URL como `https://acharcliente.onrender.com`.

---

## 💻 Como Rodar no Seu Computador (Quando Quiser Testar Local)
Se quiser rodar localmente no seu computador para testar alterações rápidas:
1. Dê dois cliques em `Iniciar_Robo_AcharCliente.bat`.
2. Ele abrirá automaticamente o navegador em `http://localhost:3000`.
3. O robô responderá de forma instantânea.
