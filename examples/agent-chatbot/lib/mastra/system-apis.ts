import { orderBy } from 'lodash'
import { PropertyType } from '@mastra/core'
import { FirecrawlIntegration } from '@mastra/firecrawl'

export async function getTeams() {
  const TEAMS = `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams`
  const response = await fetch(TEAMS)
  const data = await response.json()
  return data.sports?.[0].leagues?.[0].teams.map(
    ({ team }: { team: { id: string; displayName: string } }) => {
      return {
        id: team.id,
        name: team.displayName
      }
    }
  )
}

export async function getSportsNews() {
  const URI = `https://site.api.espn.com/apis/site/v2/sports/football/nfl/news?limit=10000`
  const response = await fetch(URI)
  const data = await response.json()

  return data?.articles?.map((a: Record<string, string>) => {
    return {
      headline: a.headline,
      description: a.description
    }
  })
}

export async function getAthletesForTeam({
  teamId,
  position
}: {
  teamId: string
  position: string
}) {
  const URI = `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${teamId}/roster`
  const response = await fetch(URI)
  const data = await response.json()
  return (
    await Promise.all(
      data?.athletes?.flatMap(async (res: { items: Record<string, any>[] }) => {
        return res.items.map(a => {
          return {
            id: a.id,
            name: a.fullName,
            age: a.age,
            jersey: a.jersey,
            position: a.position.abbreviation,
            experience: a.experience?.years,
            college: a.college?.name
          }
        })
      })
    )
  )
    .flatMap(a => a)
    .filter(a => a.position === position)
}

async function getScore(day: string) {
  const response = await fetch(day)
  const data = await response.json()
  return data.events?.flatMap((e: Record<string, any>) => {
    return {
      id: e.id,
      name: e.name,
      shortName: e.shortName,
      season: e.season,
      week: e.week,
      competitions: e.competitions.map((c: Record<string, any>) => {
        return {
          id: c.id,
          teams: c.competitors.map((t: Record<string, any>) => {
            return {
              homeTeam: t.homeAway !== `away`,
              winner: t.winner,
              score: t.score,
              team: t.team?.displayName
            }
          }),

          headlines: c.headlines?.map(
            (h: { description: string; shortLinkText: string }) => {
              return {
                description: h.description,
                shortLinkText: h.shortLinkText
              }
            }
          )
        }
      })
    }
  })
}

export async function getScores({ week, day }: { week: string; day?: string }) {
  const MONDAY = `https://site.api.espn.com/apis/site/v2/mondaynightfootball`
  const THURSDAY = `https://site.api.espn.com/apis/site/v2/thursdaynightfootball`
  const SUNDAY = `https://site.api.espn.com/apis/site/v2/sundaynightfootball`

  const res: Record<string, any> = {
    monday: await getScore(MONDAY),
    thursday: await getScore(THURSDAY),
    sunday: await getScore(SUNDAY)
  }

  if (day) {
    return res[day].filter(
      (e: { week: number }) => e.week === parseInt(week, 10)
    )
  }

  return orderBy(
    [...res.monday, ...res.thursday, ...res.sunday],
    'week'
  ).filter((e: { week: number }) => e.week === parseInt(week, 10))
}

export async function reportAnswers({ data }: any) {
  const { mastra } = await import('./framework')

  await mastra.triggerEvent({
    key: 'REPORT_ANSWERS',
    data,
    user: {
      connectionId: '1234'
    }
  })
  return { message: 'Reported' }
}

export async function callAgent({ data }: any) {
  const { mastra } = await import('./framework')

  const executor = await mastra.getAgent({
    agentId: 'asst_mFswl3bmGEsWJJxPMaT5mthN',
    connectionId: '1234'
  })

  console.log('executor', executor)

  if (!executor) {
    throw new Error('Could not create agent executor')
  }

  if (typeof executor === 'function') {
    const result = await executor({ prompt: data?.message })

    return {
      message: result?.text
    }
  } else {
    const thread = await executor.initializeThread([
      { role: 'user', content: data?.message }
    ])

    const run = await executor.watchRun({ threadId: thread.id })

    return {
      message: run?.content?.[0]?.text?.value
    }
  }
}

export async function sendSlackMessage({ data, ctx }: any) {
  // @ts-ignore
  const { mastra } = await import('./framework')
  const integration = mastra.getIntegration('SLACK')

  const client = await integration.getApiClient(ctx)

  const response = await client.chatPostMessage({
    body: {
      channel: data.channelId,
      text: data.message
    }
  })

  return response
}

export function syncTeams() {
  return {
    id: 'sync-nfl-teams',
    event: 'SYNC_TEAMS',
    executor: async ({ event }: any) => {
      const { mastra } = await import('./framework')
      const connectionId = event.user.connectionId
      const teams = await getTeams()

      console.log(teams, connectionId)

      await mastra.dataLayer?.syncData({
        name: mastra.config.name,
        connectionId,
        data: teams.map((r: any) => {
          return {
            externalId: r.id,
            data: r,
            entityType: 'teams'
          }
        }),
        properties: [
          {
            name: 'id',
            displayName: 'Team ID',
            type: PropertyType.SINGLE_LINE_TEXT,
            visible: true,
            order: 1,
            modifiable: true
          },
          {
            name: 'name',
            displayName: 'Name',
            type: PropertyType.SINGLE_LINE_TEXT,
            visible: true,
            order: 1,
            modifiable: true
          }
        ],
        type: 'teams',
        lastSyncId: event?.id!
      })

      console.log('SYNCED')

      return event
    }
  }
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function splitMarkdownIntoChunks(markdown: string, maxTokens: number = 8190): string[] {
  const tokens = markdown.split(/\s+/); // Split by whitespace to tokenize
  const chunks: string[] = [];
  let currentChunk: string[] = [];

  for (const token of tokens) {
      if ((currentChunk.join(' ').length + token.length + 1) > maxTokens) {
          // If adding the next token exceeds the limit, push the current chunk and reset
          chunks.push(currentChunk.join(' '));
          currentChunk = [token]; // Start a new chunk with the current token
      } else {
          // Otherwise, add the token to the current chunk
          currentChunk.push(token);
      }
  }

  // Add any remaining tokens as the last chunk
  if (currentChunk.length > 0) {
      chunks.push(currentChunk.join(' '));
  }

  return chunks;
}

export async function siteCrawlSync({ data, ctx }: any) {

  console.log('INCOMING', data)

  const { mastra } = await import('./framework')
  const connectionId = ctx.connectionId

  const firecrawl = mastra.getIntegration('FIRECRAWL') as FirecrawlIntegration

  const client = await firecrawl.getApiClient({ connectionId })

  const res = await client.crawlUrls({
    body: {
      url: data.url,
      scrapeOptions: {
        formats: ['markdown'],
        includeTags: ['main'],
        excludeTags: ['img', 'footer', 'nav', 'header'],
        onlyMainContent: true,
      }
    }
  })

  if (res.error) {
    console.error(JSON.stringify(res.error, null, 2))
    return
  }

  console.log(res?.data)

  const crawlId = res.data?.id

  console.log(crawlId)

  let crawl = await client.getCrawlStatus({
    path: {
      id: crawlId!
    }
  })

  while (crawl.data?.status === 'scraping') {
    await delay(8000)

    crawl = await client.getCrawlStatus({
      path: {
        id: crawlId!
      }
    })

    console.log(crawl.data?.status)
  }

  console.log('items', crawl?.data?.data?.length)


  const recordsToPersist = crawl?.data?.data?.flatMap(({ markdown, metadata }) => {
    const chunks = splitMarkdownIntoChunks(markdown!)
    return chunks.map((c, i) => {
      return {
        externalId: `${metadata?.sourceURL}_chunk_${i}`,
        data: { markdown: c},
        entityType: data.entityType
      }
    })
  })

  await mastra.dataLayer?.syncData({
    name: mastra.config.name,
    connectionId,
    data: recordsToPersist,
    properties: [
      {
        name: 'markdown',
        displayName: 'Markdown',
        type: PropertyType.LONG_TEXT,
        visible: true,
        order: 1,
        modifiable: true
      }
    ],
    type:data.entityType,
  })

  const eventRs = await mastra.triggerEvent({
    key: 'VECTOR_SYNC',
    data: {
      vector_provider: 'PINECONE',
      entities: [{
        integration: mastra.config.name,
        data: [
          {
            name: data.entityType,
            fields: ['markdown'],
            syncEvent: 'BIOTECH_SYNC',
            index: data.entityType
          }
        ]
      }]
    },
    user: {
      connectionId: ctx.connectionId
    }
  })

  const result = await eventRs.event.subscribe()

  console.log('SYNCED')

  return result
}

