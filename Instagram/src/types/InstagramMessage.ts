/**
 * This interface represents the webhook message received from instagram
 */
export interface InstagramMessage {
  /** either instagram or page */
  object: string,
  entry: {
    time: number,
    /** this will be the id of the insta pro account or the fb page */
    id: string,
    messaging?: {
      sender: {
        id: string
      },
      recipient: {
        id: string
      },
      timestamp: number,
      message?: {
        /** unique message id */
        mid: string,
        attachments?: {
          type?: string,
          payload?: {
            url?: string
          }
        }[],
        text?: string,
        /** true if sending to the insta pro account or fb page */
        is_echo?: boolean
      },
      /** this object is sent in case of reaction webhook */
      reaction?: {
        mid: string,
        action: string,
        reaction: string,
        emoji: string
      },
      /** this object is sent when the message is read by insta pro account */
      read?: {
        mid: string
      }
    }[],
    changes?: any
  }[],
}