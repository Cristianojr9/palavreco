# 🎨 Instruções para Adicionar a Logo

## 📁 Onde Colocar os Arquivos

Coloque sua logo nos seguintes locais:

### 1. **Logo Principal** (para usar no app)
```
assets/images/logo/logo.png
```
- **Tamanho recomendado**: 512x512px
- **Formato**: PNG com fundo transparente
- **Uso**: Substituirá o "P" estilizado em todas as telas

### 2. **Ícone do App** (App Store/Play Store)
```
assets/images/icon.png
```
- **Tamanho**: 1024x1024px
- **Formato**: PNG
- **Uso**: Ícone principal do app nas lojas

### 3. **Ícone Adaptativo** (Android)
```
assets/images/adaptive-icon.png
```
- **Tamanho**: 1024x1024px
- **Formato**: PNG com fundo transparente
- **Uso**: Ícone adaptativo para Android

### 4. **Ícone de Splash** (Tela de carregamento)
```
assets/images/splash-icon.png
```
- **Tamanho**: 200x200px (ou maior, será redimensionado)
- **Formato**: PNG
- **Uso**: Ícone na tela de splash

## 🔧 Como Atualizar o Código

### 1. **Substituir a Logo no Componente Logo.tsx**

Quando você adicionar o arquivo `logo.png`, descomente e atualize esta linha:

```tsx
// Em components/Logo.tsx, linha 25:
// <Image source={require('../assets/images/logo/logo.png')} style={[styles.logo, dimensions]} />
```

### 2. **Atualizar o app.json** (se necessário)

Se quiser usar uma logo diferente para o splash screen:

```json
// Em app.json, linha 31:
"image": "./assets/images/logo/logo.png",
```

## 📱 Onde a Logo Aparecerá

- ✅ **Splash Screen**: Logo grande com animação
- ✅ **Tela Inicial**: Logo média no header
- ✅ **Tela do Jogo**: Logo pequena no header (se adicionada)
- ✅ **Ícone do App**: Nas lojas e na tela inicial do dispositivo

## 🎯 Tamanhos Automáticos

O componente `Logo` ajusta automaticamente o tamanho:

- **Small**: 40x40px (para headers pequenos)
- **Medium**: 80x80px (para tela inicial)
- **Large**: 120x120px (para splash screen)

## ✨ Dicas de Design

- **Cores**: Use cores que contrastem bem com o fundo escuro (#121213)
- **Simplicidade**: Logo deve ser legível em tamanhos pequenos
- **Consistência**: Mantenha o mesmo estilo visual em todos os tamanhos
- **Transparência**: Use fundo transparente para melhor integração

## 🚀 Próximos Passos

1. Adicione os arquivos de imagem nas pastas corretas
2. Descomente a linha da Image no Logo.tsx
3. Teste o app para ver como ficou
4. Ajuste os tamanhos se necessário

---

**Pronto!** Sua logo estará integrada em todo o app! 🎉
