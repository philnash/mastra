
                    import { EventHandler } from '@arkw/core';
                    import { StatusUpdateCompactFields } from '../constants';
                    import { AsanaIntegration } from '..';

                    export const StatusesForObject: EventHandler<AsanaIntegration> = ({
  eventKey,
  integrationInstance: { name, dataLayer, getApiClient },
  makeWebhookUrl,
}) => ({
                        id: `${name}-sync-StatusUpdateCompact-StatusesForObject`,
                        event: eventKey,
                        executor: async ({ event, step }: any) => {
                            const { parent,created_since,   } = event.data;
                            const { referenceId } = event.user;
                            const proxy = await getApiClient({ referenceId })


                            // @ts-ignore
                            const response = await proxy['/status_updates'].get({
                                query: {parent,created_since,},
                                 })

                            if (!response.ok) {
                            return
                            }

                            const d = await response.json()

                            // @ts-ignore
                            const records = d?.data?.map(({ _externalId, ...d2 }) => ({
                                externalId: _externalId,
                                data: d2,
                                entityType: `StatusUpdateCompact`,
                            }));

                            await dataLayer?.syncData({
                                name,
                                referenceId,
                                data: records,
                                type: `StatusUpdateCompact`,
                                properties: StatusUpdateCompactFields,
                            });
                        },
                })
                