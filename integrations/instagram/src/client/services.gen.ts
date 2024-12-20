// This file is auto-generated by @hey-api/openapi-ts
import { createClient, createConfig, type Options } from '@hey-api/client-fetch';

import type {
  GetGeographiesByGeoIdMediaRecentData,
  GetGeographiesByGeoIdMediaRecentError,
  GetGeographiesByGeoIdMediaRecentResponse,
  GetLocationsSearchData,
  GetLocationsSearchError,
  GetLocationsSearchResponse,
  GetLocationsByLocationIdData,
  GetLocationsByLocationIdError,
  GetLocationsByLocationIdResponse,
  GetLocationsByLocationIdMediaRecentData,
  GetLocationsByLocationIdMediaRecentError,
  GetLocationsByLocationIdMediaRecentResponse,
  GetMediaPopularError,
  GetMediaPopularResponse,
  GetMediaSearchData,
  GetMediaSearchError,
  GetMediaSearchResponse,
  GetMediaShortcodeByShortcodeData,
  GetMediaShortcodeByShortcodeError,
  GetMediaShortcodeByShortcodeResponse,
  GetMediaByMediaIdData,
  GetMediaByMediaIdError,
  GetMediaByMediaIdResponse,
  GetMediaByMediaIdCommentsData,
  GetMediaByMediaIdCommentsError,
  GetMediaByMediaIdCommentsResponse,
  PostMediaByMediaIdCommentsData,
  PostMediaByMediaIdCommentsError,
  PostMediaByMediaIdCommentsResponse,
  DeleteMediaByMediaIdCommentsByCommentIdData,
  DeleteMediaByMediaIdCommentsByCommentIdError,
  DeleteMediaByMediaIdCommentsByCommentIdResponse,
  DeleteMediaByMediaIdLikesData,
  DeleteMediaByMediaIdLikesError,
  DeleteMediaByMediaIdLikesResponse,
  GetMediaByMediaIdLikesData,
  GetMediaByMediaIdLikesError,
  GetMediaByMediaIdLikesResponse,
  PostMediaByMediaIdLikesData,
  PostMediaByMediaIdLikesError,
  PostMediaByMediaIdLikesResponse,
  GetTagsSearchData,
  GetTagsSearchError,
  GetTagsSearchResponse,
  GetTagsByTagNameData,
  GetTagsByTagNameError,
  GetTagsByTagNameResponse,
  GetTagsByTagNameMediaRecentData,
  GetTagsByTagNameMediaRecentError,
  GetTagsByTagNameMediaRecentResponse,
  GetUsersSearchData,
  GetUsersSearchError,
  GetUsersSearchResponse,
  GetUsersSelfFeedData,
  GetUsersSelfFeedError,
  GetUsersSelfFeedResponse,
  GetUsersSelfMediaLikedData,
  GetUsersSelfMediaLikedError,
  GetUsersSelfMediaLikedResponse,
  GetUsersSelfRequestedByError,
  GetUsersSelfRequestedByResponse,
  GetUsersByUserIdData,
  GetUsersByUserIdError,
  GetUsersByUserIdResponse,
  GetUsersByUserIdFollowedByData,
  GetUsersByUserIdFollowedByError,
  GetUsersByUserIdFollowedByResponse,
  GetUsersByUserIdFollowsData,
  GetUsersByUserIdFollowsError,
  GetUsersByUserIdFollowsResponse,
  GetUsersByUserIdMediaRecentData,
  GetUsersByUserIdMediaRecentError,
  GetUsersByUserIdMediaRecentResponse,
  GetUsersByUserIdRelationshipData,
  GetUsersByUserIdRelationshipError,
  GetUsersByUserIdRelationshipResponse,
  PostUsersByUserIdRelationshipData,
  PostUsersByUserIdRelationshipError,
  PostUsersByUserIdRelationshipResponse,
} from './types.gen';

export const client = createClient(createConfig());

/**
 * @deprecated
 * Get recent media from a custom geo-id.
 * Get recent media from a geography subscription that you created.
 *
 * **Note:** You can only access Geographies that were explicitly created by your OAuth client. Check the
 * Geography Subscriptions section of the [real-time updates page](https://instagram.com/developer/realtime/).
 * When you create a subscription to some geography that you define, you will be returned a unique `geo-id` that
 * can be used in this query. To backfill photos from the location covered by this geography, use the
 * [media search endpoint](https://instagram.com/developer/endpoints/media/).
 *
 * **Warning:** [Deprecated](http://instagram.com/developer/changelog/) for Apps created **on or after** Nov 17, 2015
 *
 */
export const getGeographiesByGeoIdMediaRecent = <ThrowOnError extends boolean = false>(
  options: Options<GetGeographiesByGeoIdMediaRecentData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetGeographiesByGeoIdMediaRecentResponse,
    GetGeographiesByGeoIdMediaRecentError,
    ThrowOnError
  >({
    ...options,
    url: '/geographies/{geo-id}/media/recent',
  });
};

/**
 * Search for a location by geographic coordinate.
 * Search for a location by geographic coordinate.
 */
export const getLocationsSearch = <ThrowOnError extends boolean = false>(
  options?: Options<GetLocationsSearchData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<GetLocationsSearchResponse, GetLocationsSearchError, ThrowOnError>({
    ...options,
    url: '/locations/search',
  });
};

/**
 * Get information about a location.
 * Get information about a location.
 */
export const getLocationsByLocationId = <ThrowOnError extends boolean = false>(
  options: Options<GetLocationsByLocationIdData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<GetLocationsByLocationIdResponse, GetLocationsByLocationIdError, ThrowOnError>(
    {
      ...options,
      url: '/locations/{location-id}',
    },
  );
};

/**
 * Get a list of recent media objects from a given location.
 * Get a list of recent media objects from a given location.
 */
export const getLocationsByLocationIdMediaRecent = <ThrowOnError extends boolean = false>(
  options: Options<GetLocationsByLocationIdMediaRecentData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetLocationsByLocationIdMediaRecentResponse,
    GetLocationsByLocationIdMediaRecentError,
    ThrowOnError
  >({
    ...options,
    url: '/locations/{location-id}/media/recent',
  });
};

/**
 * @deprecated
 * Get a list of currently popular media.
 * Get a list of what media is most popular at the moment. Can return mix of `image` and `video` types.
 *
 * **Warning:** [Deprecated](http://instagram.com/developer/changelog/) for Apps created **on or after** Nov 17, 2015
 *
 */
export const getMediaPopular = <ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) => {
  return (options?.client ?? client).get<GetMediaPopularResponse, GetMediaPopularError, ThrowOnError>({
    ...options,
    url: '/media/popular',
  });
};

/**
 * Search for media in a given area.
 * Search for media in a given area. The default time span is set to 5 days. The time span must not exceed 7 days.
 * Defaults time stamps cover the last 5 days. Can return mix of `image` and `video` types.
 *
 */
export const getMediaSearch = <ThrowOnError extends boolean = false>(
  options: Options<GetMediaSearchData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<GetMediaSearchResponse, GetMediaSearchError, ThrowOnError>({
    ...options,
    url: '/media/search',
  });
};

/**
 * Get information about a media object.
 * This endpoint returns the same response as `GET /media/{media-id}`.
 *
 * A media object's shortcode can be found in its shortlink URL. An example shortlink is
 * `http://instagram.com/p/D/`, its corresponding shortcode is `D`.
 *
 */
export const getMediaShortcodeByShortcode = <ThrowOnError extends boolean = false>(
  options: Options<GetMediaShortcodeByShortcodeData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetMediaShortcodeByShortcodeResponse,
    GetMediaShortcodeByShortcodeError,
    ThrowOnError
  >({
    ...options,
    url: '/media/shortcode/{shortcode}',
  });
};

/**
 * Get information about a media object.
 * Get information about a media object. The returned type key will allow you to differentiate between image and
 * video media.
 *
 * **Note:** if you authenticate with an OAuth Token, you will receive the user_has_liked key which quickly tells
 * you whether the current user has liked this media item.
 *
 */
export const getMediaByMediaId = <ThrowOnError extends boolean = false>(
  options: Options<GetMediaByMediaIdData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<GetMediaByMediaIdResponse, GetMediaByMediaIdError, ThrowOnError>({
    ...options,
    url: '/media/{media-id}',
  });
};

/**
 * Get a list of recent comments on a media object.
 * Get a list of recent comments on a media object.
 */
export const getMediaByMediaIdComments = <ThrowOnError extends boolean = false>(
  options: Options<GetMediaByMediaIdCommentsData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetMediaByMediaIdCommentsResponse,
    GetMediaByMediaIdCommentsError,
    ThrowOnError
  >({
    ...options,
    url: '/media/{media-id}/comments',
  });
};

/**
 * Create a comment on a media object.
 * Create a comment on a media object with the following rules:
 *
 * * The total length of the comment cannot exceed 300 characters.
 * * The comment cannot contain more than 4 hashtags.
 * * The comment cannot contain more than 1 URL.
 * * The comment cannot consist of all capital letters.
 *
 */
export const postMediaByMediaIdComments = <ThrowOnError extends boolean = false>(
  options: Options<PostMediaByMediaIdCommentsData, ThrowOnError>,
) => {
  return (options?.client ?? client).post<
    PostMediaByMediaIdCommentsResponse,
    PostMediaByMediaIdCommentsError,
    ThrowOnError
  >({
    ...options,
    url: '/media/{media-id}/comments',
  });
};

/**
 * Remove a comment.
 * Remove a comment either on the authenticated user's media object or authored by the authenticated user.
 *
 */
export const deleteMediaByMediaIdCommentsByCommentId = <ThrowOnError extends boolean = false>(
  options: Options<DeleteMediaByMediaIdCommentsByCommentIdData, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<
    DeleteMediaByMediaIdCommentsByCommentIdResponse,
    DeleteMediaByMediaIdCommentsByCommentIdError,
    ThrowOnError
  >({
    ...options,
    url: '/media/{media-id}/comments/{comment-id}',
  });
};

/**
 * Remove a like on this media by the current user.
 * Remove a like on this media by the currently authenticated user.
 */
export const deleteMediaByMediaIdLikes = <ThrowOnError extends boolean = false>(
  options: Options<DeleteMediaByMediaIdLikesData, ThrowOnError>,
) => {
  return (options?.client ?? client).delete<
    DeleteMediaByMediaIdLikesResponse,
    DeleteMediaByMediaIdLikesError,
    ThrowOnError
  >({
    ...options,
    url: '/media/{media-id}/likes',
  });
};

/**
 * Get a list of users who have liked this media.
 * Get a list of users who have liked this media.
 */
export const getMediaByMediaIdLikes = <ThrowOnError extends boolean = false>(
  options: Options<GetMediaByMediaIdLikesData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<GetMediaByMediaIdLikesResponse, GetMediaByMediaIdLikesError, ThrowOnError>({
    ...options,
    url: '/media/{media-id}/likes',
  });
};

/**
 * Set a like on this media by the current user.
 * Set a like on this media by the currently authenticated user.
 */
export const postMediaByMediaIdLikes = <ThrowOnError extends boolean = false>(
  options: Options<PostMediaByMediaIdLikesData, ThrowOnError>,
) => {
  return (options?.client ?? client).post<PostMediaByMediaIdLikesResponse, PostMediaByMediaIdLikesError, ThrowOnError>({
    ...options,
    url: '/media/{media-id}/likes',
  });
};

/**
 * Search for tags by name.
 * Search for tags by name.
 */
export const getTagsSearch = <ThrowOnError extends boolean = false>(
  options: Options<GetTagsSearchData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<GetTagsSearchResponse, GetTagsSearchError, ThrowOnError>({
    ...options,
    url: '/tags/search',
  });
};

/**
 * Get information about a tag object.
 * Get information about a tag object.
 */
export const getTagsByTagName = <ThrowOnError extends boolean = false>(
  options: Options<GetTagsByTagNameData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<GetTagsByTagNameResponse, GetTagsByTagNameError, ThrowOnError>({
    ...options,
    url: '/tags/{tag-name}',
  });
};

/**
 * Get a list of recently tagged media.
 * Get a list of recently tagged media. Use the `max_tag_id` and `min_tag_id` parameters in the pagination
 * response to paginate through these objects.
 *
 */
export const getTagsByTagNameMediaRecent = <ThrowOnError extends boolean = false>(
  options: Options<GetTagsByTagNameMediaRecentData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetTagsByTagNameMediaRecentResponse,
    GetTagsByTagNameMediaRecentError,
    ThrowOnError
  >({
    ...options,
    url: '/tags/{tag-name}/media/recent',
  });
};

/**
 * Search for a user by name.
 * Search for a user by name.
 */
export const getUsersSearch = <ThrowOnError extends boolean = false>(
  options: Options<GetUsersSearchData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<GetUsersSearchResponse, GetUsersSearchError, ThrowOnError>({
    ...options,
    url: '/users/search',
  });
};

/**
 * @deprecated
 * See the authenticated user's feed.
 * See the authenticated user's feed.
 *
 * **Warning:** [Deprecated](http://instagram.com/developer/changelog/) for Apps created **on or after** Nov 17, 2015
 *
 */
export const getUsersSelfFeed = <ThrowOnError extends boolean = false>(
  options?: Options<GetUsersSelfFeedData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<GetUsersSelfFeedResponse, GetUsersSelfFeedError, ThrowOnError>({
    ...options,
    url: '/users/self/feed',
  });
};

/**
 * See the list of media liked by the authenticated user.
 * See the list of media liked by the authenticated user. Private media is returned as long as the authenticated
 * user has permission to view that media. Liked media lists are only available for the currently authenticated
 * user.
 *
 */
export const getUsersSelfMediaLiked = <ThrowOnError extends boolean = false>(
  options?: Options<GetUsersSelfMediaLikedData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<GetUsersSelfMediaLikedResponse, GetUsersSelfMediaLikedError, ThrowOnError>({
    ...options,
    url: '/users/self/media/liked',
  });
};

/**
 * List the users who have requested this user's permission to follow.
 * List the users who have requested this user's permission to follow.
 */
export const getUsersSelfRequestedBy = <ThrowOnError extends boolean = false>(
  options?: Options<unknown, ThrowOnError>,
) => {
  return (options?.client ?? client).get<GetUsersSelfRequestedByResponse, GetUsersSelfRequestedByError, ThrowOnError>({
    ...options,
    url: '/users/self/requested-by',
  });
};

/**
 * Get basic information about a user.
 * Get basic information about a user. To get information about the owner of the access token, you can use
 * **self** instead of the `user-id`.
 *
 * Security scope `public_content` is required to read information about other users.
 *
 */
export const getUsersByUserId = <ThrowOnError extends boolean = false>(
  options: Options<GetUsersByUserIdData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<GetUsersByUserIdResponse, GetUsersByUserIdError, ThrowOnError>({
    ...options,
    url: '/users/{user-id}',
  });
};

/**
 * Get the list of users this user is followed by.
 * Get the list of users this user is followed by. To get users followed by the owner of the access token, you
 * can use **self** instead of the `user-id`.
 *
 */
export const getUsersByUserIdFollowedBy = <ThrowOnError extends boolean = false>(
  options: Options<GetUsersByUserIdFollowedByData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetUsersByUserIdFollowedByResponse,
    GetUsersByUserIdFollowedByError,
    ThrowOnError
  >({
    ...options,
    url: '/users/{user-id}/followed-by',
  });
};

/**
 * Get the list of users this user follows.
 * Get the list of users this user follows. To get follows of the owner of the access token, you can use **self**
 * instead of the `user-id`.
 *
 */
export const getUsersByUserIdFollows = <ThrowOnError extends boolean = false>(
  options: Options<GetUsersByUserIdFollowsData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<GetUsersByUserIdFollowsResponse, GetUsersByUserIdFollowsError, ThrowOnError>({
    ...options,
    url: '/users/{user-id}/follows',
  });
};

/**
 * Get the most recent media published by a user.
 * Get the most recent media published by a user. To get the most recent media published by the owner of the
 * access token, you can use **self** instead of the `user-id`.
 *
 * Security scope `public_content` is required to read information about other users.
 *
 */
export const getUsersByUserIdMediaRecent = <ThrowOnError extends boolean = false>(
  options: Options<GetUsersByUserIdMediaRecentData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetUsersByUserIdMediaRecentResponse,
    GetUsersByUserIdMediaRecentError,
    ThrowOnError
  >({
    ...options,
    url: '/users/{user-id}/media/recent',
  });
};

/**
 * Get information about a relationship to another user.
 * Get information about a relationship to another user.
 */
export const getUsersByUserIdRelationship = <ThrowOnError extends boolean = false>(
  options: Options<GetUsersByUserIdRelationshipData, ThrowOnError>,
) => {
  return (options?.client ?? client).get<
    GetUsersByUserIdRelationshipResponse,
    GetUsersByUserIdRelationshipError,
    ThrowOnError
  >({
    ...options,
    url: '/users/{user-id}/relationship',
  });
};

/**
 * Modify the relationship between the current user and the target user.
 * Modify the relationship between the current user and the target user.
 */
export const postUsersByUserIdRelationship = <ThrowOnError extends boolean = false>(
  options: Options<PostUsersByUserIdRelationshipData, ThrowOnError>,
) => {
  return (options?.client ?? client).post<
    PostUsersByUserIdRelationshipResponse,
    PostUsersByUserIdRelationshipError,
    ThrowOnError
  >({
    ...options,
    url: '/users/{user-id}/relationship',
  });
};
