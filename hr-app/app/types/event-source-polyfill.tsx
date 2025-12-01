declare module 'event-source-polyfill' {
    export class EventSourcePolyfill {
        constructor(url: string, config?: unknown);
        onmessage: ((event: MessageEvent) => void) | null;
        onerror: ((event: Event) => void) | null;
        close(): void;
    }
}