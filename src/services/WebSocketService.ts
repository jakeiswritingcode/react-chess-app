class WebSocketService {
    private webSocket: WebSocket | null = null;
    private retryConnectionTimeoutId: NodeJS.Timeout | null = null;

    constructor(private url: string, private onMessageCallback: (data: any) => void) {}

    public connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.webSocket) {
                if (this.webSocket.readyState === WebSocket.OPEN) {
                    console.warn("A webSocket connection is already established.");
                    resolve();
                } else { // this.webSocket.readyState !== WebSocket.OPEN
                    console.warn("A webSocket connection is already being established or closed with error.");
                    reject(new Error("A webSocket connection is already being established or closed with error."));
                }
                return;
            }

            this.webSocket = new WebSocket(this.url);
            this.webSocket.onopen = () => { this.handleOpen; resolve(); }
            this.webSocket.onclose = this.handleClose;
            this.webSocket.onerror = () => { this.handleError; reject(new Error("WebSocket encountered an error.")); }
            this.webSocket.onmessage = event => this.onMessageCallback(JSON.parse(event.data));
        });
    };

    private handleOpen = () => {
        console.log('WebSocket Connected');
        if (this.retryConnectionTimeoutId) {
            clearTimeout(this.retryConnectionTimeoutId);
            this.retryConnectionTimeoutId = null;
        }
    };

    private handleClose = (event: CloseEvent) => {
        console.log('WebSocket Disconnected', event.reason);
        if (!event.wasClean) {
            this.retryConnectionTimeoutId = setTimeout(() => this.connect(), 4000);
        }
    };

    private handleError = (error: Event) => {
        console.error('WebSocket Error:', error);
        this.webSocket?.close();
    };

    public send(message: any): void {
        if (this.webSocket && this.webSocket.readyState === WebSocket.OPEN) {
            this.webSocket.send(JSON.stringify(message));
        } else {
            console.error(`WebSocket is not connected. Cannot send message:${message} to url:${this.url}`);
        }
    }

    public disconnect(): void {
        this.webSocket?.close();
        if (this.retryConnectionTimeoutId) {
            clearTimeout(this.retryConnectionTimeoutId);
            this.retryConnectionTimeoutId = null;
        }
    }
}
