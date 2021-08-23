export default function ({$axios, app }) {
  app.i18n.onLanguageSwitched = (oldLocale, newLocale) => {
    $axios.setHeader('locale', newLocale)
  }
}