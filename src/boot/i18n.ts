import { defineBoot } from '#q-app/wrappers'
import { createI18n } from 'vue-i18n'
import { useLocalStorage } from '@vueuse/core'
import _ from 'lodash'
import messages from 'src/i18n'

export type MessageLanguages = keyof typeof messages
// Type-define 'en-US' as the master schema for the resource
export type MessageSchema = (typeof messages)['en']

// See https://vue-i18n.intlify.dev/guide/advanced/typescript.html#global-resource-schema-type-definition
/* eslint-disable @typescript-eslint/no-empty-object-type */
declare module 'vue-i18n' {
  // define the locale messages schema
  export interface DefineLocaleMessage extends MessageSchema {}

  // define the datetime format schema
  export interface DefineDateTimeFormat {}

  // define the number format schema
  export interface DefineNumberFormat {}
}
/* eslint-enable @typescript-eslint/no-empty-object-type */

export default defineBoot(({ app }) => {
  const localeStorage = useLocalStorage<string>('locale', null)
  const useableLocales = Object.keys(messages)

  // if localStorage already keep saved 'locale' -> use
  let setupLocale: string | undefined = localeStorage.value

  // use preffered locale on startup
  if ((!setupLocale || !useableLocales.includes(setupLocale)) && navigator?.languages?.length > 0) {
    setupLocale = _.first(_.intersection(navigator.languages, useableLocales))
  }

  // 'navigator.language' is more browser compatible
  setupLocale = setupLocale || navigator?.language?.split('-')[0]

  const i18n = createI18n<{ message: MessageSchema }, MessageLanguages>({
    locale: setupLocale || 'en',
    fallbackLocale: 'en',
    legacy: false,
    messages,
  })

  localeStorage.value = (<{ value: string }>(<unknown>i18n.global.locale)).value

  // Set i18n instance on app
  app.use(i18n)
})
