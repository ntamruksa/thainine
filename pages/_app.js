import '../styles/styles.scss'
import 'react-day-picker/lib/style.css'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import Page from '../components/Page'
const queryClient = new QueryClient()

Sentry.init({
  dsn:
    'https://d867a71f2cdb4eccb3ef4644f23b5c4e@o563417.ingest.sentry.io/5703367',
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
})

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Page>
        <Component {...pageProps} />
      </Page>
    </QueryClientProvider>
  )
}

export default MyApp
