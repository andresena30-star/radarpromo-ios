# 📱 Guia de Publicação do RadarPromo.BR na App Store (iOS)

Este guia contém as instruções passo a passo para compilar, assinar e publicar o **RadarPromo.BR** na **Apple App Store** utilizando sua conta **developer.apple.com** e o ambiente **MacinCloud**.

---

## 1. Estrutura e Identificadores do App

- **App Name**: `RadarPromo BR`
- **Bundle Identifier (App ID)**: `br.com.radarpromo.app`
- **SKU**: `RADARPROMO-BR-01`
- **Categoria Principal**: `Shopping` (Compras)
- **Categoria Secundária**: `Utilities` (Utilitários / Finanças)
- **Classificação Etária**: `4+` (Livre para todas as idades)

---

## 2. Preparação no MacinCloud (macOS & Xcode)

No seu terminal do **MacinCloud**, clone ou copie esta pasta do projeto e execute:

```bash
# 1. Instalar dependências
npm install

# 2. Preparar os arquivos estáticos
npm run cap:build

# 3. Adicionar a plataforma iOS (se for a primeira vez)
npx cap add ios

# 4. Sincronizar o código com o projeto Xcode
npx cap sync ios

# 5. Abrir o projeto diretamente no Xcode
npx cap open ios
```

---

## 3. Configurações no Xcode (MacinCloud)

Quando o Xcode abrir com o projeto `App.xcworkspace`:

1. **Assinatura e Certificados (Signing & Capabilities)**:
   - Selecione o alvo **App** na barra lateral esquerda.
   - Vá na aba **Signing & Capabilities**.
   - Marque **Automatically manage signing**.
   - No campo **Team**, selecione a sua conta da **Apple Developer Program**.
   - Verifique se o **Bundle Identifier** está como `br.com.radarpromo.app`.

2. **Adicionar Recursos Nativos (Capabilities obrigatórias)**:
   - Clique em **+ Capability** no topo esquerdo.
   - Adicione **Push Notifications** (para os alertas de bugs de preço em tempo real).
   - Adicione **Background Modes** e marque `Remote notifications`.

3. **Ícones do App (App Icon & Launch Screen)**:
   - No arquivo `Assets.xcassets`, inclua os ícones nas resoluções oficiais do iPhone (1024x1024px PNG sem transparência).

---

## 4. Configurações no App Store Connect (developer.apple.com)

1. Acesse [appstoreconnect.apple.com](https://appstoreconnect.apple.com) e clique em **Meus Apps > + > Novo App**.
2. Preencha:
   - **Plataforma**: iOS
   - **Nome**: `RadarPromo: Ofertas e Atacado`
   - **Idioma Principal**: Português (Brasil)
   - **ID do Pacote (Bundle ID)**: Escolha `br.com.radarpromo.app`
   - **SKU**: `RADARPROMO-BR-01`
   - **Acesso ao Usuário**: Acesso Total

---

## 5. Monetização: Configurando as Assinaturas VIP (In-App Purchases)

No menu **Monetização > Assinaturas no App Store Connect**:
- Crie um Grupo de Assinaturas: `Radar VIP Clube`
- **Plano Mensal**: R$ 19,90/mês (`br.com.radarpromo.vip.monthly`)
- **Plano Anual**: R$ 149,90/ano (`br.com.radarpromo.vip.yearly`) - *Desconto de 37%*
- **Benefícios listados para a Apple**:
  - Alertas instantâneos de bugs de preço via Push em milissegundos.
  - Módulo B2B Atacarejo com cálculo de preço unitário por fardo.
  - Selo de Desconto Real Auditado (90 dias) sem restrições.

---

## 6. Geração do Build e Envio (Archive & TestFlight)

1. No Xcode (MacinCloud), mude o dispositivo de destino no topo de `Any iOS Simulator` para **`Any iOS Device (arm64)`**.
2. Vá no menu superior do Xcode: **Product > Archive**.
3. Quando o arquivo compilar, a janela do **Organizer** abrirá:
   - Clique em **Distribute App**.
   - Escolha **App Store Connect**.
   - Marque **Upload** e siga os passos automáticos de validação e assinatura.
4. Em 10 a 15 minutos, o build estará disponível na aba **TestFlight** do seu App Store Connect para testes internos e no seu iPhone.

---

## 7. Dicas de Aprovação de Primeira pela Apple (Review Guidelines)

- **Diretriz 5.1.1 (Privacidade)**: No formulário de privacidade, marque que você coleta apenas *Localização Aproximada* (para exibir as ofertas da UF do usuário).
- **Termos de Uso**: É obrigatório incluir um link de Termos de Uso (EULA padrão da Apple ou próprio) e Política de Privacidade na página do App Store Connect.
