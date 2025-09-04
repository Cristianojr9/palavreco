# 📱 Guia de Publicação - Palavreco

## 🚀 Checklist de Publicação

### ✅ Configurações Básicas
- [x] App.json configurado
- [x] Bundle ID definido (com.palavreco.app)
- [x] Versão definida (1.0.0)
- [x] Política de privacidade criada
- [x] Descrição e keywords definidas

### 🎨 Assets Necessários

#### Ícones
- **iOS**: 1024x1024px (App Store)
- **Android**: 512x512px (Play Store)
- **Adaptativo**: 1024x1024px com fundo transparente

#### Screenshots
- **iPhone 6.7"**: 1290x2796px
- **iPhone 6.5"**: 1242x2688px
- **iPhone 5.5"**: 1242x2208px
- **iPad 12.9"**: 2048x2732px
- **iPad 11"**: 1668x2388px

### 📋 Próximos Passos

#### 1. Criar Contas de Desenvolvedor
- **Apple Developer**: $99/ano
- **Google Play Console**: $25 (única vez)

#### 2. Gerar Assets
```bash
# Instalar EAS CLI
npm install -g @expo/eas-cli

# Login no Expo
eas login

# Configurar projeto
eas build:configure

# Build para Android
eas build --platform android --profile production

# Build para iOS
eas build --platform ios --profile production
```

#### 3. Submeter para Revisão

**Apple App Store:**
1. Upload do build via Xcode ou EAS
2. Preencher informações do app
3. Adicionar screenshots e descrição
4. Submeter para revisão (2-7 dias)

**Google Play Store:**
1. Upload do APK/AAB
2. Preencher informações do app
3. Adicionar screenshots e descrição
4. Submeter para revisão (1-3 dias)

### 📝 Informações do App

#### Título
**Palavreco**

#### Descrição Curta
**Descubra a palavra do dia! Um jogo de adivinhação de palavras em português.**

#### Descrição Completa
```
🎮 PALAVRECO - O jogo de palavras em português!

Descubra a palavra do dia em até 6 tentativas! Um jogo de adivinhação de palavras inspirado no Wordle, totalmente em português.

✨ CARACTERÍSTICAS:
• 6 tentativas para descobrir a palavra de 5 letras
• Feedback visual com cores intuitivas
• Sons e vibrações para experiência imersiva
• Música de fundo relaxante
• Design responsivo para todas as telas
• Tema escuro elegante
• Palavras em português do Brasil

🎯 COMO JOGAR:
1. Digite uma palavra de 5 letras
2. Pressione ENTER para submeter
3. Use as cores como dicas:
   🟩 Verde: Letra correta na posição correta
   🟨 Amarelo: Letra correta na posição errada
   ⬜ Cinza: Letra não está na palavra
4. Tente acertar em até 6 tentativas!

🔒 PRIVACIDADE:
Este app NÃO coleta dados pessoais. Funciona completamente offline e não rastreia usuários.

Perfeito para toda a família! Teste seu vocabulário e divirta-se!
```

#### Keywords
`palavra, wordle, jogo, português, adivinhação, vocabulário, entretenimento, família`

#### Categoria
**Games > Word**

#### Classificação
**4+ (Everyone)**

### 🎨 Design dos Assets

#### Cores do App
- **Primária**: #121213 (fundo escuro)
- **Secundária**: #538d4e (verde correto)
- **Acento**: #b59f3b (amarelo presente)
- **Texto**: #ffffff (branco)

#### Estilo do Ícone
- Fundo: #121213
- Letra "P" estilizada em branco
- Bordas arredondadas
- Estilo minimalista

### 📊 Métricas de Sucesso

#### Objetivos da Primeira Versão
- [ ] 100+ downloads na primeira semana
- [ ] 4.0+ estrelas de avaliação
- [ ] 0 crashes reportados
- [ ] Tempo de sessão > 2 minutos

#### Melhorias Futuras
- [ ] Estatísticas de jogo
- [ ] Modo offline
- [ ] Compartilhamento de resultados
- [ ] Temas adicionais
- [ ] Modo multiplayer

### 🔧 Comandos Úteis

```bash
# Desenvolvimento
npm start

# Build local
npx expo run:android
npx expo run:ios

# Build para produção
eas build --platform all

# Submeter para stores
eas submit --platform android
eas submit --platform ios
```

### 📞 Suporte

Para dúvidas sobre publicação:
- Documentação Expo: https://docs.expo.dev/
- Apple Developer: https://developer.apple.com/
- Google Play Console: https://play.google.com/console/

---

**Boa sorte com a publicação! 🚀**
