// This file is auto-generated by @hey-api/openapi-ts

/**
 * An individual message request within a batch.
 */
export type BatchMessageRequest = {
    /**
     * Developer-provided ID created for each request in a Message Batch. Useful for
     * matching results to requests, as results may be given out of request order.
     *
     * Must be unique for each request within the Message Batch.
     *
     */
    custom_id: string;
    params: CreateMessageRequest;
};

/**
 * A block of content in a message.
 */
export type Block = TextBlock | ImageBlock | ToolUseBlock | ToolResultBlock;

/**
 * A delta in a streaming message.
 */
export type BlockDelta = TextBlockDelta | InputJsonBlockDelta;

/**
 * The cache control settings.
 */
export type CacheControlEphemeral = {
    type?: 'ephemeral';
};

export type type = 'ephemeral';

/**
 * A delta event in a streaming content block.
 */
export type ContentBlockDeltaEvent = {
    delta: BlockDelta;
    /**
     * The index of the content block.
     */
    index: number;
    type: 'content_block_delta';
};

/**
 * A start event in a streaming content block.
 */
export type ContentBlockStartEvent = {
    content_block: Block;
    /**
     * The index of the content block.
     */
    index: number;
    type: 'content_block_start';
};

/**
 * A stop event in a streaming content block.
 */
export type ContentBlockStopEvent = {
    /**
     * The index of the content block.
     */
    index: number;
    type: 'content_block_stop';
};

/**
 * The request parameters for creating a message batch.
 */
export type CreateMessageBatchRequest = {
    /**
     * List of requests for prompt completion. Each is an individual request to create a Message.
     */
    requests: Array<BatchMessageRequest>;
};

/**
 * The request parameters for creating a message.
 */
export type CreateMessageRequest = {
    /**
     * The model that will complete your prompt.
     *
     * See [models](https://docs.anthropic.com/en/docs/models-overview) for additional
     * details and options.
     *
     */
    model: (string | 'claude-3-5-sonnet-latest' | 'claude-3-5-sonnet-20241022' | 'claude-3-5-sonnet-20240620' | 'claude-3-opus-latest' | 'claude-3-opus-20240229' | 'claude-3-sonnet-20240229' | 'claude-3-haiku-20240307' | 'claude-2.1' | 'claude-2.0' | 'claude-instant-1.2');
    /**
     * Input messages.
     *
     * Our models are trained to operate on alternating `user` and `assistant`
     * conversational turns. When creating a new `Message`, you specify the prior
     * conversational turns with the `messages` parameter, and the model then generates
     * the next `Message` in the conversation.
     *
     * Each input message must be an object with a `role` and `content`. You can
     * specify a single `user`-role message, or you can include multiple `user` and
     * `assistant` messages. The first message must always use the `user` role.
     *
     * If the final message uses the `assistant` role, the response content will
     * continue immediately from the content in that message. This can be used to
     * constrain part of the model's response.
     *
     * See [message content](https://docs.anthropic.com/en/api/messages-content) for
     * details on how to construct valid message objects.
     *
     * Example with a single `user` message:
     *
     * ```json
     * [{ "role": "user", "content": "Hello, Claude" }]
     * ```
     *
     * Example with multiple conversational turns:
     *
     * ```json
     * [
     * { "role": "user", "content": "Hello there." },
     * { "role": "assistant", "content": "Hi, I'm Claude. How can I help you?" },
     * { "role": "user", "content": "Can you explain LLMs in plain English?" }
     * ]
     * ```
     *
     * Example with a partially-filled response from Claude:
     *
     * ```json
     * [
     * {
     * "role": "user",
     * "content": "What's the Greek name for Sun? (A) Sol (B) Helios (C) Sun"
     * },
     * { "role": "assistant", "content": "The best answer is (" }
     * ]
     * ```
     *
     * Each input message `content` may be either a single `string` or an array of
     * content blocks, where each block has a specific `type`. Using a `string` for
     * `content` is shorthand for an array of one content block of type `"text"`. The
     * following input messages are equivalent:
     *
     * ```json
     * { "role": "user", "content": "Hello, Claude" }
     * ```
     *
     * ```json
     * { "role": "user", "content": [{ "type": "text", "text": "Hello, Claude" }] }
     * ```
     *
     * Starting with Claude 3 models, you can also send image content blocks:
     *
     * ```json
     * {
     * "role": "user",
     * "content": [
     * {
     * "type": "image",
     * "source": {
     * "type": "base64",
     * "media_type": "image/jpeg",
     * "data": "/9j/4AAQSkZJRg..."
     * }
     * },
     * { "type": "text", "text": "What is in this image?" }
     * ]
     * }
     * ```
     *
     * We currently support the `base64` source type for images, and the `image/jpeg`,
     * `image/png`, `image/gif`, and `image/webp` media types.
     *
     * See [examples](https://docs.anthropic.com/en/api/messages-examples) for more
     * input examples.
     *
     * Note that if you want to include a
     * [system prompt](https://docs.anthropic.com/en/docs/system-prompts), you can use
     * the top-level `system` parameter — there is no `"system"` role for input
     * messages in the Messages API.
     *
     */
    messages: Array<Message>;
    /**
     * The maximum number of tokens to generate before stopping.
     *
     * Note that our models may stop _before_ reaching this maximum. This parameter
     * only specifies the absolute maximum number of tokens to generate.
     *
     * Different models have different maximum values for this parameter. See
     * [models](https://docs.anthropic.com/en/docs/models-overview) for details.
     *
     */
    max_tokens: number;
    metadata?: CreateMessageRequestMetadata;
    /**
     * Custom text sequences that will cause the model to stop generating.
     *
     * Our models will normally stop when they have naturally completed their turn,
     * which will result in a response `stop_reason` of `"end_turn"`.
     *
     * If you want the model to stop generating when it encounters custom strings of
     * text, you can use the `stop_sequences` parameter. If the model encounters one of
     * the custom sequences, the response `stop_reason` value will be `"stop_sequence"`
     * and the response `stop_sequence` value will contain the matched stop sequence.
     *
     */
    stop_sequences?: Array<(string)>;
    /**
     * System prompt.
     *
     * A system prompt is a way of providing context and instructions to Claude, such
     * as specifying a particular goal or role. See our
     * [guide to system prompts](https://docs.anthropic.com/en/docs/system-prompts).
     *
     */
    system?: (string | Array<Block>);
    /**
     * Amount of randomness injected into the response.
     *
     * Defaults to `1.0`. Ranges from `0.0` to `1.0`. Use `temperature` closer to `0.0`
     * for analytical / multiple choice, and closer to `1.0` for creative and
     * generative tasks.
     *
     * Note that even with `temperature` of `0.0`, the results will not be fully
     * deterministic.
     *
     */
    temperature?: number;
    tool_choice?: ToolChoice;
    /**
     * Definitions of tools that the model may use.
     *
     * If you include `tools` in your API request, the model may return `tool_use`
     * content blocks that represent the model's use of those tools. You can then run
     * those tools using the tool input generated by the model and then optionally
     * return results back to the model using `tool_result` content blocks.
     *
     * Each tool definition includes:
     *
     * - `name`: Name of the tool.
     * - `description`: Optional, but strongly-recommended description of the tool.
     * - `input_schema`: [JSON schema](https://json-schema.org/) for the tool `input`
     * shape that the model will produce in `tool_use` output content blocks.
     *
     * For example, if you defined `tools` as:
     *
     * ```json
     * [
     * {
     * "name": "get_stock_price",
     * "description": "Get the current stock price for a given ticker symbol.",
     * "input_schema": {
     * "type": "object",
     * "properties": {
     * "ticker": {
     * "type": "string",
     * "description": "The stock ticker symbol, e.g. AAPL for Apple Inc."
     * }
     * },
     * "required": ["ticker"]
     * }
     * }
     * ]
     * ```
     *
     * And then asked the model "What's the S&P 500 at today?", the model might produce
     * `tool_use` content blocks in the response like this:
     *
     * ```json
     * [
     * {
     * "type": "tool_use",
     * "id": "toolu_01D7FLrfh4GYq7yT1ULFeyMV",
     * "name": "get_stock_price",
     * "input": { "ticker": "^GSPC" }
     * }
     * ]
     * ```
     *
     * You might then run your `get_stock_price` tool with `{"ticker": "^GSPC"}` as an
     * input, and return the following back to the model in a subsequent `user`
     * message:
     *
     * ```json
     * [
     * {
     * "type": "tool_result",
     * "tool_use_id": "toolu_01D7FLrfh4GYq7yT1ULFeyMV",
     * "content": "259.75 USD"
     * }
     * ]
     * ```
     *
     * Tools can be used for workflows that include running client-side tools and
     * functions, or more generally whenever you want the model to produce a particular
     * JSON structure of output.
     *
     * See our [guide](https://docs.anthropic.com/en/docs/tool-use) for more details.
     *
     */
    tools?: Array<Tool>;
    /**
     * Only sample from the top K options for each subsequent token.
     *
     * Used to remove "long tail" low probability responses.
     * [Learn more technical details here](https://towardsdatascience.com/how-to-sample-from-language-models-682bceb97277).
     *
     * Recommended for advanced use cases only. You usually only need to use
     * `temperature`.
     *
     */
    top_k?: number;
    /**
     * Use nucleus sampling.
     *
     * In nucleus sampling, we compute the cumulative distribution over all the options
     * for each subsequent token in decreasing probability order and cut it off once it
     * reaches a particular probability specified by `top_p`. You should either alter
     * `temperature` or `top_p`, but not both.
     *
     * Recommended for advanced use cases only. You usually only need to use
     * `temperature`.
     *
     */
    top_p?: number;
    /**
     * Whether to incrementally stream the response using server-sent events.
     *
     * See [streaming](https://docs.anthropic.com/en/api/messages-streaming) for
     * details.
     *
     */
    stream?: boolean;
};

/**
 * An object describing metadata about the request.
 */
export type CreateMessageRequestMetadata = {
    /**
     * An external identifier for the user who is associated with the request.
     *
     * This should be a uuid, hash value, or other opaque identifier. Anthropic may use
     * this id to help detect abuse. Do not include any identifying information such as
     * name, email address, or phone number.
     *
     */
    user_id?: string;
};

/**
 * An error object.
 */
export type Error = {
    /**
     * The type of error.
     */
    type: string;
    /**
     * A human-readable error message.
     */
    message: string;
};

/**
 * An error event in a streaming conversation.
 */
export type ErrorEvent = {
    type: 'error';
    error: Error;
};

/**
 * A block of image content.
 */
export type ImageBlock = {
    source: ImageBlockSource;
    /**
     * The type of content block.
     */
    type?: 'image';
    cache_control?: CacheControlEphemeral;
};

/**
 * The source of an image block.
 */
export type ImageBlockSource = {
    /**
     * The base64-encoded image data.
     */
    data: string;
    /**
     * The media type of the image.
     */
    media_type: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp';
    /**
     * The type of image source.
     */
    type: 'base64';
};

/**
 * The media type of the image.
 */
export type media_type = 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp';

/**
 * The type of image source.
 */
export type type2 = 'base64';

/**
 * A delta in a streaming input JSON.
 */
export type InputJsonBlockDelta = {
    /**
     * The partial JSON delta.
     */
    partial_json?: string;
    /**
     * The type of content block.
     */
    type: 'input_json_delta';
};

/**
 * A message in a chat conversation.
 */
export type Message = {
    /**
     * Unique object identifier.
     *
     * The format and length of IDs may change over time.
     *
     */
    id?: string;
    /**
     * The content of the message.
     */
    content: (string | Array<Block>);
    role: MessageRole;
    /**
     * The model that handled the request.
     */
    model?: string;
    stop_reason?: StopReason;
    /**
     * Which custom stop sequence was generated, if any.
     *
     * This value will be a non-null string if one of your custom stop sequences was
     * generated.
     *
     */
    stop_sequence?: string;
    /**
     * Object type.
     *
     * For Messages, this is always `"message"`.
     *
     */
    type?: string;
    usage?: Usage;
};

/**
 * A batch of message requests.
 */
export type MessageBatch = {
    /**
     * Unique object identifier for the message batch.
     */
    id: string;
    /**
     * RFC 3339 datetime string representing the time at which the Message Batch was created.
     */
    created_at: string;
    /**
     * RFC 3339 datetime string representing the time at which the Message Batch will expire and end processing, which is 24 hours after creation.
     */
    expires_at: string;
    /**
     * Processing status of the Message Batch.
     */
    processing_status: 'in_progress' | 'canceling' | 'ended';
    request_counts: MessageBatchRequestCounts;
    /**
     * URL to a `.jsonl` file containing the results of the Message Batch requests. Specified only once processing ends.
     */
    results_url?: (string) | null;
    /**
     * Object type. For Message Batches, this is always `"message_batch"`.
     */
    type: 'message_batch';
};

/**
 * Processing status of the Message Batch.
 */
export type processing_status = 'in_progress' | 'canceling' | 'ended';

/**
 * Object type. For Message Batches, this is always `"message_batch"`.
 */
export type type3 = 'message_batch';

/**
 * Tallies requests within the Message Batch, categorized by their status.
 */
export type MessageBatchRequestCounts = {
    /**
     * Number of requests in the Message Batch that are processing.
     */
    processing: number;
    /**
     * Number of requests in the Message Batch that have completed successfully.
     */
    succeeded: number;
    /**
     * Number of requests in the Message Batch that encountered an error.
     */
    errored: number;
    /**
     * Number of requests in the Message Batch that have been canceled.
     */
    canceled: number;
    /**
     * Number of requests in the Message Batch that have expired.
     */
    expired: number;
};

/**
 * A delta in a streaming message.
 */
export type MessageDelta = {
    stop_reason?: StopReason;
    /**
     * Which custom stop sequence was generated, if any.
     *
     * This value will be a non-null string if one of your custom stop sequences was
     * generated.
     *
     */
    stop_sequence?: string;
};

/**
 * A delta event in a streaming conversation.
 */
export type MessageDeltaEvent = {
    delta: MessageDelta;
    type: 'message_delta';
    usage: MessageDeltaUsage;
};

/**
 * Billing and rate-limit usage.
 *
 * Anthropic's API bills and rate-limits by token counts, as tokens represent the
 * underlying cost to our systems.
 *
 * Under the hood, the API transforms requests into a format suitable for the
 * model. The model's output then goes through a parsing stage before becoming an
 * API response. As a result, the token counts in `usage` will not match one-to-one
 * with the exact visible content of an API request or response.
 *
 * For example, `output_tokens` will be non-zero, even for an empty string response
 * from Claude.
 *
 */
export type MessageDeltaUsage = {
    /**
     * The cumulative number of output tokens which were used.
     */
    output_tokens: number;
};

/**
 * The role of the messages author.
 */
export type MessageRole = 'user' | 'assistant';

/**
 * A start event in a streaming conversation.
 */
export type MessageStartEvent = {
    message: Message;
    type: 'message_start';
};

/**
 * A stop event in a streaming conversation.
 */
export type MessageStopEvent = {
    type: 'message_stop';
};

/**
 * A event in a streaming conversation.
 */
export type MessageStreamEvent = MessageStartEvent | MessageDeltaEvent | MessageStopEvent | ContentBlockStartEvent | ContentBlockDeltaEvent | ContentBlockStopEvent | PingEvent | ErrorEvent;

/**
 * The type of a streaming event.
 */
export type MessageStreamEventType = 'message_start' | 'message_delta' | 'message_stop' | 'content_block_start' | 'content_block_delta' | 'content_block_stop' | 'ping' | 'error';

/**
 * A ping event in a streaming conversation.
 */
export type PingEvent = {
    type: 'ping';
};

/**
 * The reason that we stopped.
 *
 * This may be one the following values:
 *
 * - `"end_turn"`: the model reached a natural stopping point
 * - `"max_tokens"`: we exceeded the requested `max_tokens` or the model's maximum
 * - `"stop_sequence"`: one of your provided custom `stop_sequences` was generated
 * - `"tool_use"`: the model invoked one or more tools
 *
 * In non-streaming mode this value is always non-null. In streaming mode, it is
 * null in the `message_start` event and non-null otherwise.
 *
 */
export type StopReason = 'end_turn' | 'max_tokens' | 'stop_sequence' | 'tool_use';

/**
 * A block of text content.
 */
export type TextBlock = {
    /**
     * The text content.
     */
    text: string;
    /**
     * The type of content block.
     */
    type?: 'text';
    cache_control?: CacheControlEphemeral;
};

/**
 * A delta in a streaming text block.
 */
export type TextBlockDelta = {
    /**
     * The text delta.
     */
    text: string;
    /**
     * The type of content block.
     */
    type: 'text_delta';
};

/**
 * A tool the model may use.
 */
export type Tool = ToolCustom | ToolComputerUse | ToolTextEditor | ToolBash;

/**
 * A tool for running commands in a bash shell.
 */
export type ToolBash = {
    /**
     * The type of tool.
     */
    type?: 'ToolBash';
    /**
     * The name of the tool.
     */
    name?: string;
    cache_control?: CacheControlEphemeral;
};

/**
 * How the model should use the provided tools. The model can use a specific tool,
 * any available tool, or decide by itself.
 *
 * - `auto`: allows Claude to decide whether to call any provided tools or not. This is the default value.
 * - `any`: tells Claude that it must use one of the provided tools, but doesn’t force a particular tool.
 * - `tool`: allows us to force Claude to always use a particular tool specified in the `name` field.
 *
 */
export type ToolChoice = {
    type: ToolChoiceType;
    /**
     * The name of the tool to use.
     */
    name?: string;
    /**
     * Whether to disable parallel tool use.
     */
    disable_parallel_tool_use?: boolean;
};

/**
 * How the model should use the provided tools. The model can use a specific tool,
 * any available tool, or decide by itself.
 *
 * - `auto`: allows Claude to decide whether to call any provided tools or not. This is the default value.
 * - `any`: tells Claude that it must use one of the provided tools, but doesn't force a particular tool.
 * - `tool`: allows us to force Claude to always use a particular tool specified in the `name` field.
 *
 */
export type ToolChoiceType = 'auto' | 'any' | 'tool';

/**
 * A tool that uses a mouse and keyboard to interact with a computer, and take screenshots.
 */
export type ToolComputerUse = {
    /**
     * The type of tool.
     */
    type?: 'ToolComputerUse';
    /**
     * The name of the tool.
     */
    name?: string;
    cache_control?: CacheControlEphemeral;
    /**
     * The width of the display in pixels.
     */
    display_width_px: number;
    /**
     * The height of the display in pixels.
     */
    display_height_px: number;
    /**
     * The number of the display to use.
     */
    display_number?: (number) | null;
};

/**
 * A custom tool the model may use.
 */
export type ToolCustom = {
    /**
     * The type of tool.
     */
    type?: 'ToolCustom';
    /**
     * The name of the tool. Must match the regex `^[a-zA-Z0-9_-]{1,64}$`.
     */
    name: string;
    /**
     * Description of what this tool does.
     *
     * Tool descriptions should be as detailed as possible. The more information that
     * the model has about what the tool is and how to use it, the better it will
     * perform. You can use natural language descriptions to reinforce important
     * aspects of the tool input JSON schema.
     *
     */
    description?: string;
    /**
     * [JSON schema](https://json-schema.org/) for this tool's input.
     *
     * This defines the shape of the `input` that your tool accepts and that the model
     * will produce.
     *
     */
    input_schema: {
        [key: string]: unknown;
    };
};

/**
 * The result of using a tool.
 */
export type ToolResultBlock = {
    /**
     * The `id` of the tool use request this is a result for.
     */
    tool_use_id: string;
    /**
     * The result of the tool, as a string (e.g. `"content": "15 degrees"`)
     * or list of nested content blocks (e.g. `"content": [{"type": "text", "text": "15 degrees"}]`).
     * These content blocks can use the text or image types.
     *
     */
    content: (string | Array<Block>);
    /**
     * Set to `true` if the tool execution resulted in an error.
     */
    is_error?: boolean;
    /**
     * The type of content block.
     */
    type?: 'tool_result';
    cache_control?: CacheControlEphemeral;
};

/**
 * A tool for viewing, creating and editing files.
 */
export type ToolTextEditor = {
    /**
     * The type of tool.
     */
    type?: 'ToolTextEditor';
    /**
     * The name of the tool.
     */
    name?: string;
    cache_control?: CacheControlEphemeral;
};

/**
 * The tool the model wants to use.
 */
export type ToolUseBlock = {
    /**
     * A unique identifier for this particular tool use block.
     * This will be used to match up the tool results later.
     *
     */
    id: string;
    /**
     * The name of the tool being used.
     */
    name: string;
    /**
     * An object containing the input being passed to the tool, conforming to the tool's `input_schema`.
     */
    input: {
        [key: string]: unknown;
    };
    /**
     * The type of content block.
     */
    type?: 'tool_use';
    cache_control?: CacheControlEphemeral;
};

/**
 * Billing and rate-limit usage.
 *
 * Anthropic's API bills and rate-limits by token counts, as tokens represent the
 * underlying cost to our systems.
 *
 * Under the hood, the API transforms requests into a format suitable for the
 * model. The model's output then goes through a parsing stage before becoming an
 * API response. As a result, the token counts in `usage` will not match one-to-one
 * with the exact visible content of an API request or response.
 *
 * For example, `output_tokens` will be non-zero, even for an empty string response
 * from Claude.
 *
 */
export type Usage = {
    /**
     * The number of input tokens which were used.
     */
    input_tokens: number;
    /**
     * The number of output tokens which were used.
     */
    output_tokens: number;
    /**
     * The number of input tokens read from the cache.
     */
    cache_creation_input_tokens?: number;
    /**
     * The number of input tokens used to create the cache entry.
     */
    cache_read_input_tokens?: number;
};

export type CreateMessageData = {
    body: CreateMessageRequest;
};

export type CreateMessageResponse = (Message);

export type CreateMessageError = unknown;

export type CreateMessageBatchData = {
    body: CreateMessageBatchRequest;
};

export type CreateMessageBatchResponse = (MessageBatch);

export type CreateMessageBatchError = unknown;

export type RetrieveMessageBatchData = {
    path: {
        /**
         * The ID of the message batch to retrieve.
         */
        id: string;
    };
};

export type RetrieveMessageBatchResponse = (MessageBatch);

export type RetrieveMessageBatchError = unknown;