import User from "./user";

export default class Chat {
  public id: number;

  public user_1_id: number;
  public user_2_id: number;

  public other_user: User;
  public other_last_read_at: Date;

  public unread_messages_count: number;
  public total_messages_count: number;
  public last_message_sent: Date;
  public last_read_at: Date;
}
