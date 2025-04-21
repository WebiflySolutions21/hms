import { Injectable } from '@angular/core';

export interface ChatMessage {
  id: string;
  fromRole: string;
  fromUser: string;
  toRoles: string[];
  content: string;
  timestamp: any;
  readBy: string[];
  toUsers: string[];  // <-- Add this
  fromUserId:any
  toUserIds:any
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  private STORAGE_KEY = 'chat_messages';
  
  constructor() {}

  getMessages(): ChatMessage[] {
    const data = localStorage.getItem('chatMessages');
    try {
      const parsed = JSON.parse(data || '[]');
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch (e) {
      console.error('Failed to parse chatMessages:', e);
      return [];
    }
  }
  

  sendMessage(message: ChatMessage): void {
    const existing = this.getMessages();
    const updated = [...existing, message];
    localStorage.setItem('chatMessages', JSON.stringify(updated));
  }
  updateMessages(messages: any[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(messages));
  }

  markAsRead(role: string): void {
    const messages = this.getMessages();
    messages.forEach(msg => {
      // If the message is for this role and hasn't been read by them yet
      if (msg.toRoles.includes(role) && !msg.readBy.includes(role)) {
        msg.readBy.push(role); // Mark the message as read by this role
      }
    });
    this.updateMessages(messages); // Save the updated messages list
  }
}